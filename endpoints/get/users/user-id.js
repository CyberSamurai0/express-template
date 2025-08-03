const {ExpressEndpoint} = require("../../../classes/express-endpoint");


/**
 * Export a wrapper function that returns a compiled endpoint handler.
 *
 * This allows us to add objects to the handler's scope at runtime
 * without inserting them as arguments within the handler itself.
 */
module.exports = (args) => {
    let database = args[0]; // Example - pass in a reference to the database object for querying

    return (req, res, next) => {
        
    }
}