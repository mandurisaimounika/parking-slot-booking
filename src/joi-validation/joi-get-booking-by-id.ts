import {
	validate,
	Joi
} from 'express-validation';

//Middleware validation check for get and delete request
export function bookingsByIdValidation() {
	return {
		params: Joi.object({
			id: Joi.string().min(5).max(50).trim().required()
		})
	};
}

export function bookingsByIdValidationMiddleware() {
	return validate(bookingsByIdValidation());
}