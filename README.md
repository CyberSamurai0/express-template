# express-template

## Getting Started
This is a template repository, meaning you can quickly create new repositories that are derived from it!

Once you've created your repository, there's a few key steps:
1. Create endpoints
2. Register these endpoints to the Express app
3. Reconfigure the template's behavior to your needs

### Creating Endpoints
As used within this project, an Endpoint consists of the following attributes:
- **Path**: The URL path (i.e. `/users`) with respect to the webroot (i.e. `http://example.com/`). This is where your endpoint will listen for requests.
- **Method**: The [HTTP Method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods) that this endpoint will respond to. A single path can have multiple methods, but each should be treated as a unique endpoint.
- **Active**: A Boolean (true/false) indicating whether or not this endpoint should *actually* listen. Just in case you want to turn one off.
- **Authenticated**: A Boolean indicating whether or not a user must pass a valid authentication token. This ***does not*** check the user's authorization; you must do that yourself. Requests without tokens will receive a 401 Unauthorized response.
- **Rate Limit**: A special object controlling the frequency at which users can submit requests to the same endpoint.
- **Handler Function**: The code that controls what an endpoint does.

Endpoints *can* be defined anywhere in any particular structure, but the whole point of this project is simplicity. Therefore, we recommend declaring all endpoints in the [endpoint-loader.ts](./endpoint-loader.ts) file, and defining the handler function separately. The project includes a basic file structure you might find useful, but you can easily adjust it, and the corresponding `require()` paths, to your liking.

### Registering Endpoints to Express

### Altering Behavior
