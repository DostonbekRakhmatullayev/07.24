// import Joi from "joi";
import Joi from "joi"

// Adim post
export const adminPost = Joi.object().keys({
    username: Joi.string().required().max(30).min(3),
    password: Joi.string().required().max(20)
})

// Catigories Post 
export const catigoriesPost = Joi.object().keys({
    category_name: Joi.string().required().max(30).min(2),
})

// Catigories Id 
export const catigoriesPut = Joi.object().keys({
    id: Joi.number().required().min(1)
})

// Products Post 
export const productsPost = Joi.object().keys({
    sub_category_id: Joi.number().required(),
    model: Joi.string().required(),
    product_name: Joi.string().required(),
    color: Joi.string().required(),
    price: Joi.string().required(),
})

// Product Id 
export const productsPut = Joi.object().keys({
    id: Joi.number().required().min(1)
})

// SubCategories Post
export const subCategoriesPost = Joi.object().keys({
    category_id: Joi.number().required(),
    sub_category_name: Joi.string().required()
}) 

// SubCategories Id
export const subCategoriesId = Joi.object().keys({
    id: Joi.number().required().min(1)
})





















