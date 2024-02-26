const fs = require("fs") // MANIPULAÇÃO DE ARQUIVOS
const path = require("path") // PARA NAVEGAR DENTRO DOS ARQUIVOS
const uploadConfig = require("../configs/upload")


class DiskStorage{
    async saveFile(file){ // SALVAR
        await fs.promises.rename( // FUNÇÃO RENAME É PARA MUDAR OS AQUIVOS DE LUGAR, SE PASSA PARAMETROS ONDE O ARQUIVO ESTÁ E ONDE VAI FICAR
            path.resolve(uploadConfig.TMP_FOLDER, file), // TIRANDO A IMAGEM DA PASTA TEMPORARIA
            path.resolve(uploadConfig.UPLOADS_FOLDER, file) // ADICIONANDO O ARQUIVO NA PASTA CORRETA
        )

        return file;
    }

    async deleteFile(file){ // DELETAR
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file) // BUSCANDO PELO ARQUIVO NA PASTA
    
        try{
            await fs.promises.stat(filePath) // FUNÇÃO PARA RETORNA O STATUS DO ARQUIVO
        } catch {
            return
        }

        await fs.promises.unlink(filePath) // AQUI É A FUNÇÃO PARA DELETAR O ARQUIVO
    } 
}

module.exports = DiskStorage
