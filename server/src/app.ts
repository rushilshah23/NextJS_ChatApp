import { connectDb } from "@/lib/db.lib";
import "./servers/httpServer";
import "./servers/wsServer";
import "@/lib/db.lib"
import { create_http_server } from "./servers/httpServer";
import { create_socket_server } from "./servers/wsServer";

connectDb().then(()=>{
    create_http_server();
    create_socket_server();
})
