import JWT from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }
        JWT.verify(token, "htywetrt", (error, decodedUser) => {
            if (error) {
                return res.status(400).json({ message: `Invalid token or expired ${error}` })
            }
            req.user = decodedUser;
            console.log(req.user);
            next();
        })
    } catch (err) {
        return res.status(500).json({
            message: `${err.message}`
        })
    }
}