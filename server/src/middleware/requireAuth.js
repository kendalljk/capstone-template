import jwt from "jsonwebtoken";
import key from "../config/app.config";
import { User } from "../models";

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  
    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing." });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({ error: "Token missing from Authorization header." });
    }

  jwt.verify(token, key.jwt.secret, async (err, payload) => {
    console.log(token);
    console.log(payload)
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Token expired." });
            } else if (err.name === "JsonWebTokenError") {
                return res.status(401).json({ error: "Invalid token." });
            } else {
                return res
                    .status(401)
                    .json({ error: "Token verification failed." });
            }
        }

        const { userId } = payload;
        if (!userId) {
            return res.status(401).json({ error: "Invalid token payload." });
        }

        try {
            const userdata = await User.findById(userId);

            if (!userdata) {
                return res
                    .status(401)
                    .json({
                        error: "User associated with the token not found.",
                    });
            }

            req.user = userdata;
            next();
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({
                    error: "Internal server error while retrieving user.",
                });
        }
    });
}

export default requireAuth;
