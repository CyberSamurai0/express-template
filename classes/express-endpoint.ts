import {NextFunction, Request, Response} from "express";

export enum Method {
    GET = "GET",
    POST = "POST",
    HEAD = "HEAD",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    CONNECT = "CONNECT",
    OPTIONS = "OPTIONS",
    TRACE = "TRACE",
}

export class ExpressEndpoint {
    // Method for which the endpoint will listen
    method: Method;

    // URL path at which the endpoint will listen
    path: string;

    // Whether the endpoint should actually respond to requests
    active: boolean;

    // Function that will handle endpoint requests
    handler: (req: Request, res: Response, next: NextFunction) => void;

    // Require authorized JSON Web Token
    authenticated: boolean;

    // Allowed requests per minute (integer)
    rateLimit: number;

    constructor(method: Method, path: string = null, active: boolean, authenticated: boolean = false, rateLimit: number = 0) {
        this.method = method;
        this.path = path;
        this.active = active;
        this.authenticated = authenticated;
        this.rateLimit = rateLimit;
    }

    setHandler(handler: (req: Request, res: Response, next: Function) => void) : ExpressEndpoint {
        this.handler = handler;
        return this;
    }

}