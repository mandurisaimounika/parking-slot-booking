import {
    validate,
    Joi
} from 'express-validation';

//Middleware validation check for put request
export function bookingsByIdAndSpotValidation() {
    return {
        params: Joi.object({
            id: [Joi.string().uuid(), Joi.string().min(5).max(
                50).trim().required()]
        }),
        body: Joi.object({
            parkingSpot: Joi.string().min(1).required()
        })
    };
}

export function bookingsByIdAndSpoitValidationMiddleware() {
    return validate(bookingsByIdAndSpotValidation());
}