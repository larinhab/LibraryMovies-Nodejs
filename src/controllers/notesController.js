const AppError = require("../utilis/AppError");
const knex = require("../database/Knex/knex");

class NotesController {
  async create(request, response) {
    const { movie_title, movie_description, tags, rating } = request.body;
    const user_id  = request.user.id
    
    if (rating < 0  || rating > 5 ) {
      throw new AppError("A nota deve ser entre 0 e 5")
    }

    const [ note_id ] = await knex("notes").insert({
      movie_title,
      movie_description,
      rating,
      user_id
    });

    const tagsInsert = tags.map(tag_name => {
      return {
        tag_name,
        note_id,
        user_id,
      };
    });

  await knex("tags").insert(tagsInsert);

    return response.json();
  }

  async delete(request, response){
    const { id } = request.params

    await knex("notes").where({ id }).delete()

    return response.json({
      message: "Filme excluído com sucesso"
    })
  }

  async show(request, response) {
    const { id } = request.params

    const notes = await knex("notes")
    .where({ id }).first()

    const tags = await knex("tags")
    .where({ note_id: id })
    .orderBy("tag_name")

    return response.json({
      ...notes,
      tags,
    })
  }

  async index(request, response) { // CRIADA PARA LISTAR AS NOTAS
    const { movie_title, tags } = request.query //PEGANDO O USUARIO DE UMA QUERY DENTRO DO INSOMINIA
    const user_id = request.user.id

    let notes;

    if(tags) {
        const filterTags = tags.split(",").map((tag) => tag.trim());

        console.log(filterTags)
        
        notes = await knex("tags")
        .whereLike("tag_name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .groupBy("notes.id")
        .orderBy("notes.movie_title")
      } else {
        notes = await knex("notes")
        //.where({ user_id })
        .whereLike("movie_title", `%${movie_title}%`)
        .orderBy("movie_title");
      }
      
      const userTags = await knex("tags")
      const notesWithTags = notes.map(note => {
        const noteTags = userTags.filter(tag => tag.note_id === note.id);
        
        
        return {
          ...note,
          tags: noteTags
        }
    });

    return response.json(notesWithTags);
    
}
}

  module.exports = NotesController