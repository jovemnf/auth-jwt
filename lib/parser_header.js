const AUTH_HEADER_REGEX = /^(\S+)\s+(\S+)$/;

const parse = (header) => {
    if (typeof header !== "string") {
        return null;
    }

    const matches = header.trim().match(AUTH_HEADER_REGEX);

    if (!matches) {
        return null;
    }

    return {
        scheme: matches[1],
        value: matches[2]
    };
};

module.exports = {
    parse
};
