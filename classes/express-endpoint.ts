export namespace ExpressEndpoint {
    enum Method {
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

    class Endpoint {
        // Method for which the endpoint will listen
        method: Method;

        // URL path at which the endpoint will listen
        path: string;

        // Function that will handle endpoint requests
        handler: Function;

        // Require authorized JSON Web Token
        authenticated: boolean;

        // Allowed requests per minute (integer)
        rateLimit: number;

        constructor(method: Method, path: string, handler: Function, authenticated: boolean = false, rateLimit: number = 0) {
            this.method = method;
            this.path = path;
            this.handler = handler;
            this.authenticated = authenticated;
            this.rateLimit = rateLimit;
        }

    }
}