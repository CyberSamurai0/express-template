import {Method, ExpressEndpoint} from "./classes/express-endpoint";
import {warn, info, ok, err, power} from "./log";
import * as Express from "express";

// Add function arguments as needed
export default (ExpressApp: Express.Express, ...objects: any[]) => {
    let Endpoints: ExpressEndpoint[] = [
        new ExpressEndpoint(Method.GET, "/users", true, false, 0)
            .setHandler(require("../endpoints/get/users")(objects)),

        new ExpressEndpoint(Method.GET, "/users/:userID", true, false, 0)
            .setHandler(require("./endpoints/get/users/user-id")(objects)),
    ]

    for (let endpoint of Endpoints) {
        if (!endpoint.active) continue; // Skip this one!

        if (endpoint.authenticated) {
            // TODO not yet implemented
        }

        if (endpoint.rateLimit) {
            // TODO not yet implemented
        }

        // Enable the endpoint
        switch (endpoint.method) {
            case Method.GET:
                ExpressApp.get(endpoint.path, endpoint.handler);
                info(`Registered GET ${endpoint.path}`);
                break;
            case Method.HEAD:
                ExpressApp.head(endpoint.path, endpoint.handler);
                info(`Registered HEAD ${endpoint.path}`);
                break;
            case Method.POST:
                ExpressApp.post(endpoint.path, endpoint.handler);
                info(`Registered POST ${endpoint.path}`);
                break;
            case Method.PUT:
                ExpressApp.put(endpoint.path, endpoint.handler);
                info(`Registered PUT ${endpoint.path}`);
                break;
            case Method.DELETE:
                ExpressApp.delete(endpoint.path, endpoint.handler);
                info(`Registered DELETE ${endpoint.path}`);
                break;
            case Method.CONNECT:
                ExpressApp.connect(endpoint.path, endpoint.handler);
                info(`Registered CONNECT ${endpoint.path}`);
                break;
            case Method.OPTIONS:
                ExpressApp.options(endpoint.path, endpoint.handler);
                info(`Registered OPTIONS ${endpoint.path}`);
                break;
            case Method.TRACE:
                ExpressApp.trace(endpoint.path, endpoint.handler);
                info(`Registered TRACE ${endpoint.path}`);
                break;
            case Method.PATCH:
                ExpressApp.patch(endpoint.path, endpoint.handler);
                info(`Registered PATCH ${endpoint.path}`);
                break;
        }
    }
}

