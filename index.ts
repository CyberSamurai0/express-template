import * as Express from "express";
import EndpointLoader from "./endpoint-loader";
import {warn, info, ok, err, power} from "./log";

let app : Express.Express = Express();

const port : string = process.env.SERVER_PORT || "3000";


// Invoke the endpoint loader (./endpoint-loader.ts)
EndpointLoader(app);


// Bind server to listening port
app.listen(port, () => {
    power(`App listening at http://${process.env.SERVER_IP}:${port}`);
});