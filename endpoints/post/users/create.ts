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
    if (!args[0]) throw new Error("/users/create expects argument: database : string[]");
    let database : string[] = args[0];

    return (req: Request, res: Response, next: NextFunction) => {
        // Check if request contains {id: string}
        if (req.body.hasOwnProperty("id")) {
            let _id: string = req.body.id;
            if (!database.includes(_id)) {
                database.push(_id); // Add ID to database
                res.sendStatus(200);
            } else res.sendStatus(409); // User already exists
        } else res.sendStatus(400); // Bad request
    }
}