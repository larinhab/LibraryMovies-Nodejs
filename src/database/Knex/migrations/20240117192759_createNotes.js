const knex = require("knex")


exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments("id")
    table.text("movie_title")
    table.text("movie_description")
    table.text("movie_note")
    table.text("avatar")
    table.text("admin") // atualizar para boolean futuramente

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("notes");