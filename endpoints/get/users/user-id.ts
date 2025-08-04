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
 *
 * @param args Optional arguments supplied via endpoint-loader.ts
 */
export = (args: any[]) => {
    // Example use case - pass in a reference to a database object for querying
    // In this case our "database" is just a string array containing user IDs
    if (!args[0]) throw new Error("/users/{userID} expects argument: database : string[]");
    let database : string[] = args[0] || []; // All args are optional, so provide fallback!

    return (req: Request, res: Response, next: NextFunction) => {
        const _userID: string = encodeURI(req.params["userID"]);

        if (database.includes(_userID)) {
            // Send JSON table with user attributes
            res.status(200).send({
                id: _userID,
                exists: true
            });
        } else {
            res.sendStatus(404); // Not Found
        }
    }
}