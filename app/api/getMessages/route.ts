import redis from "@/redis";
import { Message } from "@/typings";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const messageRes = await redis.hgetall("messages");
  const messages: Message[] = Object.values(messageRes)
    .map((message) => JSON.parse(message))
    .sort((a, b) => b.created_at - a.created_at);

  return NextResponse.json({ messages });
}
