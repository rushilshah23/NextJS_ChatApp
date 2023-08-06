import express from "express"
import { ENV_VAR } from "../configs/env.config";
import  {Server, Socket} from "socket.io"
import http from "http"
import { SOCKET_EVENTS } from "../configs/socket.config";
import cors from "cors"
import { CORS_OPTIONS } from "../configs/cors.config";
import { uniqueId } from "lodash";
import helmet from "helmet"
import bodyParser from "body-parser";


export const create_socket_server = async()=>{

    
    const  app = express();
app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);
const io = new Server(server,{
    cors:CORS_OPTIONS
});
// app.use(cors(CORS_OPTIONS));



io.on(SOCKET_EVENTS.CONNECTION,(socket:Socket)=>{
    console.log("User connect "+socket.id);
    
    // Listen for custom events
    socket.on(SOCKET_EVENTS.CLIENT.SEND_MESSAGE, async(data) => {
        console.log('Received message:');
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        const messageObj = {
            messageId:uniqueId(),
            messageText: parsedData.messageText,
            userId:parsedData.userID,
            emailId:parsedData.emailId,
            time:parsedData.time
        }
        // Broadcast the message to all connected clients
        io.emit(SOCKET_EVENTS.SERVER.SEND_MESSAGE, messageObj);
    });
    
  // Disconnect event
  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    console.log('A user disconnected');
});

})
server.listen(ENV_VAR.SOCKET_PORT,()=>{
    io
    console.log("Socket Server started at "+ENV_VAR.SOCKET_PORT);
})
}


