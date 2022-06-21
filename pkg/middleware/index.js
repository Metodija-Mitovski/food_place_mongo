const security = require("../security");

const auth = (req, res, next) => {
    try {
        if (!req.cookies) {
            return res.status(401).send("Unauthorized");
        }
        const u = security.verifyToken(req.cookies.jwt);
        req.user = u;
        next();
    } catch (error) {
        if (
            error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError"
        ) {
            return res.status(401).send("Unauthorized");
        }

        res.status(500).send(error);
        console.log(error);
    }
};

module.exports = {
    auth,
};
