import express from "express"
import productsRouter from "./routes/products.router.js"
import errorHandler from "./middlewares/errors/index.js"

// modulo de manejador de errores (solo errores mas comunes)
// revisar documento de testing

const app = express()
const server = app.listen(8080, () => console.log("Listen on 8080"))

app.use(express.json())
// en productsRouter hago el mocking de los 100 productos
app.use("/", productsRouter)

// en errorHander hago el customizador de errores
app.use(errorHandler)


