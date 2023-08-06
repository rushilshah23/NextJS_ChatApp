"use client";
import MessageContainer, { MessageProps } from "@/components/Message/Message";
import { ENV_VAR } from "@/configs/env.config";
import { SOCKET_EVENTS } from "@/configs/socket.config";
import { ChatContext, ChatProvider, Message } from "@/context/ChatContext";
import {
  SocketContext,
  SocketProvider,
  useSocket,
} from "@/context/SocketContext";
import { FC, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import styles from "./chats.module.css";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import { random, uniqueId } from "lodash";

interface ClientMessage {
  messageText: string;

  userId: string;
  emailId: string;
  time: number;
}

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
  // const {user} = useContext(UserContext);
  // const router = useRouter()
  // useEffect(() => {
  //   if(user === null){
  //     router.replace("/signin")
  //   }

  // }, [user,router])

  const { user } = useContext(UserContext);
  const { messages } = useContext(ChatContext);
  const [messageObj, setMessageObj] = useState<ClientMessage | null>(null);

  const mssgRef = useRef<HTMLInputElement>(null);

  const { socket } = useContext(SocketContext);
  const sendMessage = async (
    e: MouseEvent<HTMLButtonElement>,
    msg: ClientMessage
  ) => {
    if (msg && msg.messageText.length > 0) {
      console.log("Client " + msg);
      socket?.emit(SOCKET_EVENTS.CLIENT.SEND_MESSAGE, JSON.stringify(msg));
      console.log("Message Send");
      if (mssgRef.current) {
        mssgRef.current.value = "";
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.chatBody}>
          {messages &&
            messages.map((message: Message) => {
              return (
                <MessageContainer
                  time={message.time}
                  messageId={message.messageId}
                  messageText={message.messageText}
                  emailId={message.emailId}
                  userId={message.userId}
                  key={message.messageId}
                />
              );
            })}
        </div>
        <div className={styles.bottomContainer}>
          <input
            className={styles.msgInput}
            type="text"
            ref={mssgRef}
            placeholder="Enter a message"
          />
          <button
            className={styles.sendBtn}
            disabled={mssgRef.current?.value === null}
            onClick={(e) =>
              sendMessage(e, {
                messageText: mssgRef.current?.value!,
                emailId: user?.emailId!,
                userId: user?.userId!,
                time: Date.now(),
              })
            }
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default withAuth(Chat);
