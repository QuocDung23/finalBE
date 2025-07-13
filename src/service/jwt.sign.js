import jwt from "jsonwebtoken";

function signJwt(user) {
    const token = jwt.sign(
        {
        id: user.id,
        name: user.name,
        role: user.role
        },
        process.env.SECRET_KEY      
)
    return token
}

export {signJwt}