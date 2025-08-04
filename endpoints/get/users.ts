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
        let users : string[] = [];

        res.status(200).send(users);
    }
}