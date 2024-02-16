const AppError = require("../utilis/AppError");
const knex = require("../database/Knex/knex");

class TagsController {
    async index(request, response){
        const user_id = request.params

        const tags = await knex("tags")
        .where({user_id})
        .groupBy("tag_name")

        return response.json(tags)
    }
}

module.exports = TagsController