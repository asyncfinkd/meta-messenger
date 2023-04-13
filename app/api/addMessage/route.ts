import { serverPusher } from "@/pusher";
import redis from "@/redis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message } = await request.json();

  const newMessage = {
    ...message,
    created_at: Date.now(),
  };

  await redis.hset("messages", message.id, JSON.stringify(newMessage));
  serverPusher.trigger("messages", "new-message", newMessage);

  return NextResponse.json({ message: newMessage });
}
