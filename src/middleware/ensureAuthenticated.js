const AppError = require('../utilis/AppError')
const authConfig = require('../configs/auth')
const { verify } = require("jsonwebtoken")
const e = require('express')

function ensureAuthenticated(request, response, next){
    const authHeader = request.headers.authorization

    if(!authHeader) {
        throw AppError("JWT Token Inválido", 401)
    }

    const [, token] = authHeader.split(" ") 

    try{
        const {sub: user_id} = verify(token, authConfig.jwt.secret)

        request.user = {
            id: Number(user_id)
        }

        return next()
    }catch{
        throw new AppError("JWT Token não informado", 401)
    }
}

module.exports = ensureAuthenticated 