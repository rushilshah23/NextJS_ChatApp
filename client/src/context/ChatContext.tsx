"use client";

import { FC, createContext, useEffect, useState } from "react";


export interface Message{
    messageText: string;
    messageId:string;
    userId:string;
    emailId:string;
    time: number;
}

interface ChatContextInterface{
    messages: Message[];
    setAllMessages: (messages:Message[]) => void;
    addMessage: (msg:Message)=>void;
}

export const ChatContext  = createContext<ChatContextInterface>({
    addMessage:()=>false,
    messages:[],
    setAllMessages:()=>false,
});

interface ChatProviderProps{
    children:React.ReactNode
}

export const ChatProvider: FC<ChatProviderProps> = ({children}) =>{
    const [messages,setMessages] = useState<Message[]>([]);

    const addMessage = (message:Message)=>{
    
        setMessages((prevChats)=>[...prevChats,message]);
 
    }
    const setAllMessages = (messages:Message[])=>{
        setMessages(messages);
    }
    useEffect(() => {
        console.log(messages); // This will show the updated state
      }, [messages]);
    return (
        <ChatContext.Provider value={{addMessage, messages, setAllMessages}}>{children}</ChatContext.Provider>
    )
}

