import jwt from "jsonwebtoken"

const userAuth = async (req, res, next) => {

    const {token} = req.headers;

    if (!token) {
        return res.json({success: false, authError: true, message: "Not Authorized. Login Required."})
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (!tokenDecode.id) {
            return res.json({success: false, authError: true, message: "Not Authorized. Login Required."})
        }

        // Attach to req rather than req.body: GET requests have no body to rely on
        req.userId = tokenDecode.id;
        next();

    } catch (error) {
        return res.json({success: false, authError: true, message: "Session expired. Please login again."})
    }
}

export default userAuth
