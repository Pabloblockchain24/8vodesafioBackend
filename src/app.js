import express from "express"
import productsRouter from "./routes/products.router.js"

// modulo de manejador de errores (solo errores mas comunes)
// revisar documento de testing

const app = express()
const server = app.listen(8080, () => console.log("Listen on 8080"))

app.use("/", productsRouter)


