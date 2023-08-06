"use client"
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { FC, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import styles from "./page.module.css"
interface pageProps {}

const SignIn: FC<pageProps> = ({}) => {
const {user,fetchUser} = useContext(UserContext);
const router = useRouter();
useEffect(() => {
    fetchUser();
    if(user){
        router.replace('http://localhost:3000/chat')
    }
  

}, [user,router,fetchUser])

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const localLogin = async (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const res = await fetch("http://localhost:5000/auth/login", {
    credentials:"include",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        localLoginForm: {
          emailId: emailRef.current?.value,
          password: passwordRef.current?.value,
        },
      }),
    });
    const data = await res.json();
    console.log(data)
    if(res.status < 300){
        // const user_res = await fetch("http://localhost:5000/auth/authenticate", {
        //     credentials:"include",
        //     method: "POST",
        //   });

          if(res.status < 300){
                await fetchUser()
                router.replace("/chat")
          }
        
    }
  };
  return (
    <>
      <div className={styles.container}>

      <form>
        <input type="email" ref={emailRef} placeholder="Enter your Email ID" />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Enter your Password"
          />
        <button onClick={(e)=>{localLogin(e)}}>Login</button>
      </form>
      </div>
    </>
  );
};

export default SignIn;
