import { Router } from "express";
import productModel from "../dao/models/product.model.js"
const router = Router()
import {generateProduct} from "../utils.js"
import CustomError from "../services/errors/CustomError.js"
import EErrors from "../services/errors/enums.js"
import { generateProductErrorInfo, generateParamErrorInfo } from "../services/errors/info.js"
import mongoose from "mongoose";

router.get("/mockingproducts", async(req,res) => {
    for (let i=0; i<100;i++){
        await productModel.create(generateProduct())
    }
    const productos = await productModel.find({})
    res.send({result:"success", payload: productos })
})

router.post("/", async(req,res) => {
    const {title, price, category} = req.body
    if(!title || !price || !category || isNaN(price)){
        CustomError.createError({
            name: "Product creation error",
            cause: generateProductErrorInfo({title,price,category}),
            message: "Error trying to create Product",
            code: EErrors.INVALID_TYPES_ERROR
        })
    }
    const product = {title,price,category}
    let result = await productModel.create(product)
    res.send({status:"success", payload:result})
})

router.get("/:pid", async(req,res) => {
    const pid = req.params.pid
    if ( !mongoose.Types.ObjectId.isValid(pid)){
        CustomError.createError({
            name: "Get product error",
            cause: generateParamErrorInfo(pid),
            message: "Error trying to get Product",
            code: EErrors.INVALID_PARAM
        })
    }
    let product = await productModel.findOne({_id: pid})
    res.send({status:"success", payload:product})
})

export default router