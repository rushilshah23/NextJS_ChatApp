import { FC, useContext } from 'react'
import styles from "./Message.module.css"
import { UserContext } from '@/context/UserContext';

export interface MessageProps {
  messageText:string;
  messageId:string;
  userId:string,
  emailId:string,
  time:number
}

const MessageContainer: FC<MessageProps> = ({messageText, messageId, emailId, time}) => {
  const {user} = useContext(UserContext);
  const dateObject = new Date(time);

// Extract the date and time components
const year = dateObject.getFullYear();
const month = dateObject.getMonth() + 1; // Adding 1 to month to display the correct month number.
const day = dateObject.getDate();
const hours = dateObject.getHours();
const minutes = dateObject.getMinutes();
const seconds = dateObject.getSeconds();

// Format the date and time in a readable form
const readableDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
const readableTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <>
        <div style={emailId === user?.emailId? {
          justifyContent:'flex-end',
          justifySelf:"end",
          right:0
        }:{
          justifyContent:'flex-start',
          justifySelf:'start',
          left:0
        }} className={styles.container} key={messageId}>
        <div className={styles.senderEmailId}>
            {emailId}
          </div>
          <div className={styles.messageText}>
            {messageText}
          </div>
          <div className={styles.msesageTime}>
            {readableDate} - {readableTime}
          </div>

        </div>
    </>
  )
}

export default MessageContainer