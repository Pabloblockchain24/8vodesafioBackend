import { Router } from "express";
const router = Router()
import {generateProduct} from "../utils.js"

router.get("/mockingproducts", async(req,res) => {
    let products = []

    for (let i=0; i<100;i++){
        products.push(generateProduct())
    }
    res.send({status:"success", payload:products})

})

export default router