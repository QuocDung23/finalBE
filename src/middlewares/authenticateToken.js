import jwt from 'jsonwebtoken';

const authenticateToken = async(req, res, next) => {
    const token =  req.header.authenticateToken?.split('')[1]
    if(!token) {
        return res.status(401).json({
            message: 'Không có token'
        })
    }
    try{
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        console.log('check token',decode);
        req.user = {
            id: decode.id,
            name: decode.name,
            role: decode.role
        }
        next()
    }catch(error){
        return res.status(401),json({
            message: 'Bạn không có quyền này'
        })
    }
}

export default authenticateToken