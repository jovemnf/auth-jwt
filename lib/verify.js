const parse = require("./parser_header");
const jwt = require("jwt-simple");

const AUTH_HEADER = ["authorization", "Authorization"];

var verify = (req, secret) => {

    return new Promise((ok, fail) => {

        var token = null;

        try{

            AUTH_HEADER.forEach((t) => {
                if( req.headers[t]) {

                    var auth_params = parse.parse(req.headers[t]);
                    if (auth_params) {
                        token = auth_params.value;
                    }

                    if (
                        ( (auth_params.scheme != 'JWT' && auth_params.scheme != 'Bearer') || ! token)
                    ){
                        return fail(new Error("Invalid authorization header"));
                    }

                    return ok(jwt.decode(token, secret));

                }
            });

            fail(new Error("Undefined authorization header"));

        } catch (e) {
            fail(e);
        }

    });

};

module.exports = verify;