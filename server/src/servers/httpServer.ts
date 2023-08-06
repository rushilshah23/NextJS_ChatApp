import express from "express"
import { CORS_OPTIONS } from "../configs/cors.config";
import { ENV_VAR } from "../configs/env.config";
import cors from "cors"
import { AuthRoutes } from "../routers/auth.router";
import helmet from "helmet"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"


export const create_http_server = () => {


    const app = express();
    app.use(cors(CORS_OPTIONS));
    app.use(helmet())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser(ENV_VAR.COOKIE_PARSER_SECRET))

    app.listen(ENV_VAR.SERVER_PORT, () => {
        console.log("HTTP Server started at " + ENV_VAR.SERVER_PORT);
    })


    app.use('/auth', AuthRoutes);


}