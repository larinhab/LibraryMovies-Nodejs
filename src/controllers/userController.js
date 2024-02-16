const AppError = require("../utilis/AppError");
const knex = require("../database/Knex/knex");
const { hash, compare} = require("bcryptjs");
const { checkPrime } = require("crypto");

class UserController {
    async create(request, response) {
        const { name, email, password, avatar } = request.body
        const hashedPassword = await hash(password, 8)   
        
        const checkIfUserExists = await knex("users")
        .where({ email })
        .first()

         console.log(checkIfUserExists)
         console.log(email)

        if(checkIfUserExists){
            throw new AppError("E-mail already registered", 401)
        };

        if(!name) {
            throw new AppError("Name is mandatory", 400)
        };

        await knex("users").insert({
            name,
            email,
            password: hashedPassword
        });

        return response.json({
            message: "Sucessfully Registered!"
        })
    }

    async uptade(request, response) {
        const { old_password, password, email, name } = request.body
        const user_id = request.user.id

        const user = await knex("users").where({id: user_id}).first()

        if(!user){
            throw new AppError("Usuário não encontrado :(", 400)
        }

        const userWithNewEmail = await knex("users").where({email}).first()

        if(userWithNewEmail && userWithNewEmail.id !== user.id) {
            throw new AppError("Email já está em uso", 400)
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if(password && !old_password){
            throw new AppError("Informe sua senha antiga!", 400)
        }

        const checkPassoword = await compare(old_password, user.password)
        
        if(!checkPassoword){
            throw new AppError("A senha antiga não confere!")
        }

        if(password === old_password) {
            throw new AppError("A senha nova deve ser diferente da antiga!")
        }

        user.password = await hash(password, 8)

        await knex("users").where({id: user_id}).update({
            name: user.name,
            email: user.email,
            password: user.password,
            updated_at: knex.fn.now(),
        })


        return response.status(200).json({
            message: "Usuário alterado com sucesso!"
        })
    }

    async delete(request, response) {
        const { name, email, password, avatar } = request.body
        const  user_id  = request.user.id

        await knex("users").where({ id }).delete()

        return response.status(200).json({
            message: "Usuário deletado com sucesso!"
        })
    }
};

module.exports = UserController;