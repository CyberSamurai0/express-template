import * as Express from "express";
import EndpointLoader from "./endpoint-loader";
import {warn, info, ok, err, power} from "./log";

let app : Express.Express = Express();

const port : string = process.env.SERVER_PORT || "3000";


// TODO add other middleware for handling tokens and etc.


// Log all requests
function logAccess(req : Express.Request, res : Express.Response, next: Express.NextFunction) {
    console.log();
    // TODO this is unsanitized input
    info(`"${req.method} ${req.path} ${req.protocol.toUpperCase()}/${req.httpVersion}" "${req.get("User-Agent")}"`)
    return next();
}
app.use(logAccess);


// Invoke the endpoint loader (./endpoint-loader.ts)
EndpointLoader(app);


// Fallback to 404 if no other handlers match.
// THIS MUST BE THE FINAL MIDDLEWARE
function fallback404(req : Express.Request, res : Express.Response, next: Express.NextFunction) {
    // TODO this is unsanitized input
    info(`${req.method} ${req.path} not found, returning 404`);
    res.sendStatus(404);
}
app.use(fallback404);


// Bind server to listening port
app.listen(port, () => {
    power(`App listening at http://${process.env.SERVER_IP}:${port}`);
});