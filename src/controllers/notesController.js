const knex = require("../database/Knex/knex");

class NotesController {
  async create(request, response) {
    const { movie_title, movie_description, tags, movie_note } = request.body;
    
    const [ note_id ] = await knex("notes").insert({
      movie_title,
      movie_description,
      movie_note,
      user_id,
    });

    return response.json();
  }
  }

  module.exports = NotesController