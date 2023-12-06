import { Router } from "express";
const router = Router()


import {generateProduct} from "../utils.js"

import CustomError from "../services/errors/CustomError.js"
import EErrors from "../services/errors/enums.js"
import { generateProductErrorInfo } from "../services/errors/info.js"

let products = []

router.get("/mockingproducts", async(req,res) => {

    for (let i=0; i<100;i++){
        products.push(generateProduct())
    }
    res.send({status:"success", payload:products})

})



router.post("/", async(req,res) => {
    const {title, price, category, id} = req.body

    if(!title || !price || !category){
        CustomError.createError({
            name: "Product creation error",
            cause: generateProductErrorInfo({title,price,category}),
            message: "Error trying to create Product",
            code: EErrors.INVALID_TYPES_ERROR
        })
    }

    const product = {title,price,category,id}
    products.push(product)

    res.send({status:"success", payload:product})
})

router.get("/:pid", async(req,res) => {
    const pid = req.params.pid

    if ( !typeof(pid) === Number || typeof(pid) === undefined  || pid<1){
        CustomError.createError({
            name: "Get product error",
            cause: generateProductErrorInfo({pid}),
            message: "Error trying to get Product",
            code: EErrors.INVALID_PARAM
        })
    }

    let product = await productModel.findOne({_id: pid})
    res.send({status:"success", payload:product})

})

export default router