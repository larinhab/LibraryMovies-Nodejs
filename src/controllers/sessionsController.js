const AppError = require("../utilis/AppError");
const knex = require("../database/Knex/knex");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");
const { compare } = require("bcryptjs");

class SessionsController {
    async create(request, response){
        const { email, password } = request.body

        const user = await knex("users")
        .where({ email })
        .first()

        if(!user) {
            throw new AppError("Email e/ou senha incorreta", 401)
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new AppError("A senha ou email não está correta!", 401)
        }

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })


        return response.json({ user, token })
    }
}


module.exports = SessionsController
