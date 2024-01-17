//require("express-async-errors")

const express = require("express") // IMPORTEI EXPRESS - 1
const app = express() // INICIALIZEI EXPRESS - 2

const req = require("express/lib/request")
app.use(express.json()) // DEFININDO O PADRÃO DAS REQUISIÇOES

const routes = require("./src/routes")
app.use(routes)

// CONECTANDO SQL LITE

const sqliteConnection = require("./src/database/SQLite/connect")
sqliteConnection()

//
const port = 3335 // 3
app.listen(port, () => console.log(`Server is running on port: ${port}`)) // 4

//
const AppError = require("./src/utilis/AppError")

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

