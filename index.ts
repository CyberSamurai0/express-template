import * as Express from "express";
import EndpointLoader from "./endpoint-loader";
import {warn, info, ok, err, power} from "./log";

let app : Express.Express = Express();
const port : string = process.env.SERVER_PORT || "3000";


// TODO add other middleware for handling tokens and etc.


// Validate req.method as a standard HTTP method
function validateMethod(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    // Whitelist standard methods for input validation
    const methods : string[] = ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE", "CONNECT", "OPTIONS", "TRACE"];

    // Overwrite field with reliably sanitized value
    req.method = methods.includes(req.method) ? req.method : "UNKNOWN";

    // Call next middleware
    return next();
}
app.use(validateMethod);


// Log all incoming requests to the console.
function logAccess(req : Express.Request, res : Express.Response, next: Express.NextFunction) {
    // URL-encode other user generated fields
    let _path : string = encodeURI(req.path);
    let _protocol : string = encodeURI(req.protocol).toUpperCase();
    let _httpVersion : string = encodeURI(req.httpVersion);
    let _userAgent : string = encodeURI(req.get("User-Agent") || "");

    // console.log(); // Newline - not really needed?
    info(`"${req.method} ${_path} ${_protocol}/${_httpVersion}" "${_userAgent}"`);

    // Call next middleware
    return next();
}
app.use(logAccess);


// Invoke the endpoint loader (./endpoint-loader.ts)
EndpointLoader(app);


// Fallback to 404 if no other handlers match.
// THIS MUST BE THE FINAL MIDDLEWARE
function fallback404(req : Express.Request, res : Express.Response, next: Express.NextFunction) {
    let _path : string = encodeURI(req.path);
    info(`${req.method} ${_path} not found, returning 404`);
    res.sendStatus(404);
}
app.use(fallback404);


// Bind server to listening port
app.listen(port, () => {
    power(`App listening at http://${process.env.SERVER_IP}:${port}`);
});