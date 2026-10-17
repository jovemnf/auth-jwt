const parse = require("./parser_header");
const jwt = require("jwt-simple");

const AUTH_HEADER = ["authorization", "Authorization"];
const VALID_AUTH_SCHEMES = new Set(["JWT", "Bearer"]);

const getAuthorizationHeader = (req) => {
    if (!req || typeof req !== "object" || !req.headers || typeof req.headers !== "object") {
        throw new Error("Request headers are required");
    }

    return AUTH_HEADER.find((headerName) => typeof req.headers[headerName] === "string");
};

const checkToken = async (token, secret) => {
    return jwt.decode(token, secret);
};

/**
 *
 * @param req
 * @returns {Promise}
 */
const getToken = async (req) => {
    const headerName = getAuthorizationHeader(req);

    if (!headerName) {
        throw new Error("Undefined authorization header");
    }

    const authParams = parse.parse(req.headers[headerName]);

    if (!authParams || !VALID_AUTH_SCHEMES.has(authParams.scheme) || !authParams.value) {
        throw new Error("Invalid authorization header");
    }

    return authParams.value;
};

/**
 *
 * @param req
 * @param secret
 * @returns {Promise}
 */
const verify = async (req, secret) => {
    const token = await getToken(req);

    req.token = token;

    return checkToken(token, secret);
};

module.exports = {
    verify, getToken, checkToken
};
