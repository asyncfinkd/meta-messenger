import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1583971",
  key: "a49f97f873dd9b6fd5e8",
  secret: "03d68c64ef30e2958623",
  cluster: "ap2",
  useTLS: true,
});

export const clientPusher = new ClientPusher("a49f97f873dd9b6fd5e8", {
  cluster: "ap2",
});
