const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utilis/AppError");
const knex = require("../database/Knex/knex");

class userAvatarController {
    async uptade(request, response) {
        const user_id = request.user.user_id
        const avatarFilename = request.file.filename

        const diskStorage = new DiskStorage()

        const user = await knex("users")
        .where({ id: user_id }).first()


        if(!user){ 
            throw new AppError("Somente usuários autenticados podem mudar o avatar", 401)
        }
    
        if(user.avatar){ // VERIFICA SE EXISTE UMA FOTO, SE ESXISTE UMA FOTO, PEGO A FOTO E DELETO ELA
            await diskStorage.deleteFile(user.avatar) // USAMOS A FUNÇÃO QUE CRIAMOS
        }

        const filename = await diskStorage.saveFile(avatarFilename) // SALVANDO O AVATAR CORETO
        user.avatar = filename;

        await knex("users")
        .update(user)
        .where({id: user_id})

        return response.json(user);
    }
}


module.exports = userAvatarController