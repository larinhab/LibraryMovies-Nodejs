const path = require("path"); // PARA NAVEGAR DENTRO DOS ARQUIVOS
const multer = require("multer") // BIBLOTECA PARA FAZER UPLOADS
const crypto = require("crypto")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads") //ONDE A IMAGEM VAI FICAR

const MULTER = { // TEMOS QUE INFORMAR PARA ELA ONDE QUEREMOS SALVAR
    storage: multer.diskStorage({
        destination: TMP_FOLDER, //DESTINO PASTA TEMPORARIA
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString("hex") // GERAR UM NUM ALEATORIO PARA NÃO TER IMAGENS DUPLICADAS
            const fileName = `${fileHash}-${file.originalname}`
        
        return callback(null, fileName)
        }
    })
}


module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER, 
    MULTER,
}