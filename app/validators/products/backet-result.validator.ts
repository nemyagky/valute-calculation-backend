import { body } from 'express-validator';
import { sendErrorIfExist } from "../sendErrorIfExist";

export const basketResultValidator = [
	body().isArray().withMessage('Invalid Request Params'),
	body('*.currency').exists().isLength({ min: 1, max: 1e14 }).isString().withMessage('Currency should be string'),
	body('*.price').exists().isLength({ min: 1, max: 1e14 }).isInt({min: 0}).withMessage('Price should be numberic'),
	body('*.quantity').exists().isLength({ min: 1, max: 1e14 }).isInt({min: 0}).withMessage('Quantity should be numberic'),
	sendErrorIfExist
];
