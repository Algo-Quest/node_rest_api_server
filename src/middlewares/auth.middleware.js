import jwt from 'jsonwebtoken';
import userCheckService from "../services/user.check.service";
import responseMsg from "../utils/http.message";

async function VerifyJwtToken(req, res, next) {
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!(req.headers['authorization'])) {
        return res.status(400).json(responseMsg("Token is missing -> unauthorized access", 3));
    }
    const [tokenType, bearerToken] = req.headers['authorization'].split(" ");

    if (tokenType !== "Bearer") {
        return res.status(400).json(responseMsg("Only Bearer tokens are supported", 1));
    }
    try {
        const result = jwt.verify(bearerToken, secretKey);
        let user = await userCheckService(result);
        if (!user) {
            return res.status(400).json(responseMsg("unauthorized access!", 2));
        }
        req.userData = user;
        return next();
    }
    catch (e) {
        return res.status(400).json(responseMsg("unauthorized access!", 3));
    }
}


export default VerifyJwtToken;