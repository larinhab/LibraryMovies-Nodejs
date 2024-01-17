const { hash, compare} = require("bcryptjs")
const AppError = require("../utilis/AppError")
const sqliteConnection = require("../database/SQLite/connect") // substituido pelo knex
const knex = require("knex")

class UserController {
    async create(request, response) {
        const { name, email, password, avatar } = request.body
        const hashedPassword = await hash(password, 8)   
        
        await knex("users").insert({
            name,
            email,
            admin,
            password: hashedPassword
        });

        const checkIfUserExists = await knex("users")
        .where({email})
        .first()

        if(checkIfUserExists){
            throw new AppError("E-mail already registered")
        };

        if(!name) {
            throw new AppError("Name is mandatory")
        };


        return response.json({
            message: "Sucessfully Registered!"
        })
    }
};

module.exports = UserController;