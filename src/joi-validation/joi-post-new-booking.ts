import {
    validate
} from 'express-validation';
import * as Joi from 'joi';

//Middleware validation check for post request
export function createBookingsValidation() {
    return {
        body: Joi.object({
            parkingSpot: Joi.string().min(1).required(),
            startTime: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required(),
            endTime: Joi.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required(),
            forUser: Joi.string().min(3).optional()
        })
    };
}

export function createBookingsValidationMiddleware() {
    return validate(createBookingsValidation());
}