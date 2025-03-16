import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: string;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const bearerToken = req.header("Authorization");
    const token=bearerToken?.split(" ")[1];
    if (!token) {
        res.status(403).json({ message: "Access denied. No token provided." });// not a token 
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.userId = (decoded as { userId: string }).userId;  //   (req as any).user = verified;
        next(); 
    } catch (error) {
        res.status(403).json({ message: "Invalid token. " });//wrong token 
    }
};
export default authMiddleware;
