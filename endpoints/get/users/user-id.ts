import {ExpressEndpoint} from "../../../classes/express-endpoint";
import {NextFunction, Request, Response} from "express";

/**
 * Export a wrapper function that returns a compiled endpoint handler.
 *
 * This allows us to add objects to the handler's scope at runtime
 * without inserting them as arguments within the handler itself.
 *
 * Note that we're using `export =` rather than `export default`.
 * This is to provide compatibility with CommonJS require() for
 * inline ExpressEndpoint definitions.
 */
export = (args: Object[]) => {
    let database : Object = args[0]; // Example - pass in a reference to the database object for querying

    return (req: Request, res: Response, next: NextFunction) => {
        const _userID: string = encodeURI(req.params["userID"]);

        if (_userID === "1") res.sendStatus(200); // If GET /users/1 then respond with 200 OK
    }
}