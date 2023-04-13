"use client";

import { clientPusher } from "@/pusher";
import { Message } from "@/typings";
import fetcher from "@/utils/fetchMessages";
import { useEffect } from "react";
import useSWR from "swr";
import MessageComponent from "./MessageComponent";

type Props = {
  initialMessages: Message[];
};
export default function MessageList({ initialMessages }: Props) {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data: Message) => {
      if (messages?.find((message) => message.id === data.id)) return;

      if (!messages) return mutate(fetcher);

      mutate(fetcher, {
        optimisticData: [data, ...messages!],
        rollbackOnError: true,
      });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-5 px-5 py-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {(messages || initialMessages).map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}
