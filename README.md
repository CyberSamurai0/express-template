# express-template

# Getting Started
This is a template repository, meaning you can quickly create new repositories that are derived from it!

Once you've created your repository, there's a few key steps:
1. Create endpoints
2. Register these endpoints to the Express app
3. Reconfigure the template's behavior to your needs

## Creating Endpoints
As used within this project, an Endpoint consists of the following attributes:
- **Path**: The URL path (i.e. `/users`) with respect to the webroot (i.e. `http://example.com/`). This is where your endpoint will listen for requests.
- **Method**: The [HTTP Method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods) that this endpoint will respond to. A single path can have multiple methods, but each should be treated as a unique endpoint.
- **Active**: A Boolean (true/false) indicating whether or not this endpoint should *actually* listen. Just in case you want to turn one off.
- **Authenticated**: A Boolean indicating whether or not a user must pass a valid authentication token. This ***does not*** check the user's authorization; you must do that yourself. Requests without tokens will receive a 401 Unauthorized response.
- **Rate Limit**: A special object controlling the frequency at which users can submit requests to the same endpoint.
- **Handler Function**: The code that controls what an endpoint does.

Endpoints *can* be defined anywhere in any particular structure, but the whole point of this project is simplicity. Therefore, we recommend declaring all endpoints in the [endpoint-loader.ts](./endpoint-loader.ts) file, and defining the handler function separately. The project includes a basic file structure you might find useful, but you can easily adjust it, and the corresponding `require()` paths, to your liking.

### Example Endpoint Declaration
Endpoint declaration follows the general structure:
```ts
new ExpressEndpoint(method, path, active, authenticated, rateLimit)
    .setHandler(require("path/to/handler-file")(varargs));
```

Within [endpoint-loader.ts](./endpoint-loader.ts), you can define endpoints like so:
```ts
let Endpoints: ExpressEndpoint[] = [
    new ExpressEndpoint(Method.GET, "/users", true, false, 0)
        .setHandler(require("./endpoints/get/users")(objects)),

    new ExpressEndpoint(Method.GET, "/users/:userID", true, false, 0)
        .setHandler(require("./endpoints/get/users/user-id")(objects)),

    new ExpressEndpoint(Method.POST, "/users/create", true, false, 0)
        .setHandler(require("./endpoints/post/users/create")(objects)),
]
```

Express provides more details on acceptable paths via their [Routing guide](https://expressjs.com/en/guide/routing.html).

### Creating Handler Functions

The [`.setHandler()`](./classes/express-endpoint.ts#L45-L48) method might seem a little unintuitive, so let's break down how exactly it works.

As shown below, [`.setHandler()`](./classes/express-endpoint.ts#L45-L48) expects an Express route function as an argument, and returns the ExpressEndpoint object for method chaining.
```ts
setHandler(handler: (req: Request, res: Response, next: NextFunction) => void) : ExpressEndpoint {...}
```
Therefore, you could simply write an anonymous function like so:
```ts
new ExpressEndpoint(Method.GET, "/", true, false, 0)
    .setHandler( (req: Request, res: Response, next: NextFunction) => {
        res.sendStatus(200);
    } ),
```
Now what if you have 200 endpoints that have on average 350 lines of code? Sounds like you should split these into separate files ([/endpoints](./endpoints)). In our design, each of these files follows a general structure:
```ts
import {NextFunction, Request, Response} from "express";
export = (args: any[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Create the handler function
    }
}
```
Why export a function that returns a function? The enclosing function allows us to introduce external objects to the scope, such as a table or a MySQL database we want to compare against. The final function needs to exactly match the Express route function `(req, res, next) => {}` format, so the wrapper function lets us add extra arguments without altering the returned function type.

## Altering Behavior
