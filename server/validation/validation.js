const Joi = require("@hapi/joi");
const registerValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(2).required().email(),
        password: Joi.string().min(2).required()
    });
    return true;
} 


const loginValidation = data => {
    const schema = {
        username: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data,schema);
} 

module.exports.registerValidation  = registerValidation;
module.exports.loginValidation  = loginValidation;