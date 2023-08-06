"use client"
import { ENV_VAR } from "@/configs/env.config"
import { SOCKET_EVENTS } from "@/configs/socket.config";
import { FC, createContext, useContext, useEffect, useState } from "react"
import  io ,{Socket} from "socket.io-client"
import { ChatContext, Message } from "./ChatContext";
interface SocketContextInterface{
    socket:Socket | null;
}

const webSocket = io(ENV_VAR.SOCKET_URL,{
    withCredentials:true
});
export const SocketContext  = createContext<SocketContextInterface>({
    socket:webSocket
})

interface SocketProviderProps{
    children:React.ReactNode;

}

export const SocketProvider :FC<SocketProviderProps> = ({children})=>{
    const [socket,setSocket] = useState<Socket|null>(webSocket);
    const {addMessage,messages,setAllMessages} = useContext(ChatContext);
    
    useEffect(() => {

        const handleReceiveMessage = (data: any) => {
            console.log("Message received!");
            const mssgObj: Message = { messageId: data.messageId, messageText: data.messageText,emailId:data.emailId, time:data.time, userId:data.userId };
            console.log(mssgObj);
            addMessage(mssgObj);
            console.log(messages);
          };

    
    socket?.on(SOCKET_EVENTS.SERVER.SEND_MESSAGE,handleReceiveMessage)
    return () => {
        socket?.off(SOCKET_EVENTS.SERVER.SEND_MESSAGE, handleReceiveMessage);
      };
    }, [socket,addMessage,messages])

    return <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>


}



export const useSocket = ()=>{
    return useContext(SocketContext);
}