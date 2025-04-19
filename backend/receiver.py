import json
import pika
import firebase_admin
from firebase_admin import credentials, messaging
from helper import load_tokens
from pathlib import Path
import os
from firebase_config import firebase_creds

cred = credentials.Certificate(firebase_creds)

firebase_admin.initialize_app(cred)

# Callback to handle messages from the queue
def callback(ch, method, properties, body):
    print("Received from queue:", body)
    try:
        data = json.loads(body)
        send_push_notification(data)
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        print("Error handling message:", e)

# Function to send FCM notification
def send_push_notification(data):
    tokens = load_tokens()
    if not tokens:
        print("No tokens available to send notifications.")
        return
    for token in tokens:
        message = messaging.Message(
            data = {
                "title": data.get("title", "Notification"),
                "body": data.get("body", ""),
                "image_url": data.get("image_url", ""),
                "action_url": data.get("action_url", "/"),
                **{k: str(v) for k, v in data.get("data", {}).items()}
            },
            token=token 
        )

        try:
            response = messaging.send(message)
            print(f"✅ Notification sent to {token}: {response}")
        except Exception as e:
            print(f"❌ Failed to send to {token}: {e}")


# Connect to RabbitMQ and start consuming
def start_consuming():
    RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "localhost")
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()

    channel.queue_declare(queue='notification_queue', durable=True)
    channel.basic_consume(queue='notification_queue', on_message_callback=callback)

    print("Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()

if __name__ == "__main__":
    start_consuming()
