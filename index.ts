import * as Express from "express";
import EndpointLoader from "./endpoint-loader";
import {warn, info, ok, err, power} from "./log";

let app : Express.Express = Express();
EndpointLoader(app);