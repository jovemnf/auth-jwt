const auth = require("../index");
const expect = require("chai").expect;

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.yPmf5QFV26W-3ldVCrsvRdnecy7QjA0fnCWCDLDZ-M4";
const secretKey = "xxx";

const expectError = async (promise, expectedMessage) => {
    try {
        await promise;
        throw new Error("Expected promise to be rejected");
    } catch (error) {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(expectedMessage);
    }
};

describe("Verify", () => {
    it("rejects missing authorization headers", async () => {
        const req = {
            headers: {}
        };

        await expectError(auth.verify(req, null), "Undefined authorization header");
    });

    it("verifies a valid JWT token", async () => {
        const req = {
            headers: {
                authorization: "JWT " + token
            }
        };

        const payload = await auth.verify(req, secretKey);

        expect(payload).to.deep.equal({ foo: "bar" });
        expect(req.token).to.equal(token);
    });

    it("accepts the Authorization header with capital A", async () => {
        const req = {
            headers: {
                Authorization: "Bearer " + token
            }
        };

        const payload = await auth.verify(req, secretKey);

        expect(payload).to.deep.equal({ foo: "bar" });
    });

    it("rejects unsupported authorization schemes", async () => {
        const req = {
            headers: {
                authorization: "jwt " + token
            }
        };

        await expectError(auth.verify(req, secretKey), "Invalid authorization header");
    });

    it("rejects malformed authorization headers", async () => {
        const req = {
            headers: {
                authorization: "Bearer"
            }
        };

        await expectError(auth.getToken(req), "Invalid authorization header");
    });

    it("returns the token from getToken", async () => {
        const req = {
            headers: {
                authorization: "JWT " + token
            }
        };

        const returnedToken = await auth.getToken(req);

        expect(returnedToken).to.equal(token);
    });

    it("rejects invalid request objects", async () => {
        await expectError(auth.getToken(null), "Request headers are required");
    });

    it("decodes tokens directly with checkToken", async () => {
        const payload = await auth.checkToken(token, secretKey);

        expect(payload).to.deep.equal({ foo: "bar" });
    });
});