from fastapi import FastAPI
from pydantic import BaseModel
from sender import send_to_queue
from helper import register_token
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

class Notification(BaseModel):
    title: str
    body: str
    data: dict = {}
    image_url: str | None = None
    action_url: str | None = None

class TokenModel(BaseModel):
    fcm_token: str

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/devices/register")
def register_device(payload: TokenModel):
    register_token(payload.fcm_token)
    return {"message": "Device registered successfully"}

@app.post("/notifications/publish")
def publish_notification(notification: Notification):
    send_to_queue("notification_queue", notification.model_dump())
    return {"message": "Notification sent to queue"}

if __name__ == "__main__":
    import uvicorn
    import os

    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
