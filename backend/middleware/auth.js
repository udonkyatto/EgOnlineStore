import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next) => {
    const {token} = req.headers
    if(!token) {
        return res.json({success: false,message: "Not Authorized Login Again"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)// 解码后的 Payload
        req.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success: false,message: "authMiddleware Error"})
    }
}

export default authMiddleware