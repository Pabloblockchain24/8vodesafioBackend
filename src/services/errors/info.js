export const generateProductErrorInfo = (product) => {
    return `One or more properties were incompleted or not valid.
    List of required properties:
    * title: needs to be a String, received ${product.title}
    * price: needs to be a Number, received ${product.price}
    * category: needs to be a String, received ${product.category}`
}

export const generateParamErrorInfo = (param) => {
    return `Params received were incompleted or not valid.
    * Params: needs to be a positive Number, received ${param}`
}
