const parse = require("./parser_header");
const jwt = require("jwt-simple");

const AUTH_HEADER = ["authorization", "Authorization"];

/**
 *
 * @param req
 * @returns {Promise}
 */
let getToken = (req) => {
    
    return new Promise((ok, fail) => {
        
        let token = null;
        
        try{
            
            AUTH_HEADER.forEach((t) => {
                if( req.headers[t]) {
                    
                    let auth_params = parse.parse(req.headers[t]);
                    if (auth_params) {
                        token = auth_params.value;
                    }
                    
                    if (
                        ( (auth_params.scheme !== 'JWT' && auth_params.scheme !== 'Bearer') || ! token)
                    ){
                        return fail(new Error("Invalid authorization header"));
                    }
                    
                    ok(token);
                    
                }
            });
            
            fail(new Error("Undefined authorization header"));
            
        } catch (e) {
            fail(e);
        }
        
    });
    
};

let verify = (req, secret) => {

    return new Promise((ok, fail) => {

        getToken(req)
            .then((token) => {
                req.token = token;
                return ok(jwt.decode(token, secret));
            })
            .catch((err) => fail(err));

    });

};

module.exports = {
    verify, getToken
};