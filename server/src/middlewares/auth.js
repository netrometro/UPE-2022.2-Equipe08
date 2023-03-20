import { verify } from "jsonwebtoken";


export function AuthMiddleware(req, res, next){
    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(400).json({error:"Token not provided"})
    }

    const [, token] = authorization.split(" ");

    try {
        const decoded = verify(token, "secret");
        const {id} = decoded

        req.userId = id;
        next();
    } catch (error) {
        return res.status(401).json({error: "invalid token"})
    }
}

