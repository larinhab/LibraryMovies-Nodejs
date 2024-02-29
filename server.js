require("express-async-errors")

const express = require("express") // IMPORTEI EXPRESS - 1
const app = express() // INICIALIZEI EXPRESS - 2
const cors = require("cors") // POSSIBILIDA QUE O BACK ATENDA AS REQUISIÇÕES DO FRONT

const req = require("express/lib/request")
app.use(express.json()) // DEFININDO O PADRÃO DAS REQUISIÇOES

const routes = require("./src/routes")
app.use(routes)
app.use(cors()) // USANDO O CORS

// CONECTANDO SQL LITE

const sqliteConnection = require("./src/database/SQLite/connect")
sqliteConnection()

//
const port = 3000 // 3
app.listen(port, () => console.log(`Server is running on port: ${port}`)) // 4

//
const AppError = require("./src/utilis/AppError")

const uploadConfig = require("./src/configs/upload")
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER)) //

app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status:"error",
            message: error.message
        });
    };

    console.error(error)
    
    return response.status(500).json({
        status: "error",
        message: "Server Internal Error"
    })
});

