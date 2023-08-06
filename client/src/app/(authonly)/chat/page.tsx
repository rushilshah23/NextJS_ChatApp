'use client'
import Chats from '@/components/Chats/Chats'
import { ENV_VAR } from '@/configs/env.config'
import { UserContext } from '@/context/UserContext'
import { FC, useContext } from 'react'

interface ChatRoomProps {
  
}

const ChatRoom: FC<ChatRoomProps> = ({}) => {
  const {fetchUser} = useContext(UserContext)
  const logout = async()=>{
    await fetch(`${ENV_VAR.SERVER_URL}/auth/logout`,{
      method:"POST",
      credentials:"include"
    })
    await fetchUser()
  }
  return (
    <>
    <button onClick={logout}>Logout</button>
    <Chats/>
    </>
  )
}

export default ChatRoom