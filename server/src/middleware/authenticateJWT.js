import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.userId = user.userId;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

export default authenticateJWT;
