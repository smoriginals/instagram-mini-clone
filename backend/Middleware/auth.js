import jwt from 'jsonwebtoken';

export default async function Auth(req, res, next) {

    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) return res.status(401).json({ message: 'No Token Found!' })
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //req.userId = decoded.userId;
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch {
        return res.status(500).json({
            message: 'Unauthorized'
        })
    }

}