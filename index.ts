import * as Express from "express";
import EndpointLoader from "./endpoint-loader";

let app : Express.Express = Express();
EndpointLoader(app);