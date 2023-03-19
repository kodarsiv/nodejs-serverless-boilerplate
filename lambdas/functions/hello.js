const Response = require('../utils/response');
const Joi = require('joi');



// valition messages
const validationMessages = {
    'string.base': '{#label} is must be string',
    'string.email': 'Please enter a valid email address',
    'string.min': 'Password must be at least 6 characters long',
    'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
    'any.required': '{#label} can not be empty',
    'any.only': 'invalid provider'
};


// validation object
const validationSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
});

exports.handler = function (event, context, callback) {
    try {

        const requestBody = JSON.parse(event.body);


        // generate validator
        const validation = validationSchema.validate(requestBody, {
            abortEarly: true,
            messages: validationMessages
        });


        // check there is an error
        if ( validation.error ) {
            console.error("Validation ERROR :", validation.error)
            return Response._400({
                error: validation.error.details[0].message
            }, 'Validation Error')
        }


        // context.succeed('Success!')
        return Response._200({
            message: "response is success!"
        }, "Success!");
        
    } catch (error) {
        // context.fail('Failed!')
        return Response._500({
            error: 'Response is failed!'
        }, 'Internal server error');
    }  
}
