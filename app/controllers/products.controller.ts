import { Request, Response } from 'express';
import { CurrencyConverter } from '../currency-converter/currency-converter';
import { BasketResult } from '../models/basket-result.interface';
import { Product } from '../models/product.interface';

export class ProductsController {

	public static async calculateResult(req: Request, res: Response) {

		try {
			let result: BasketResult = {
				RUB: 0,
				EUR: 0,
				USD: 0,
			};

			req.body.forEach((product: Product) => {
				for (let currency in result) {
					// @ts-ignore
					result[currency] += CurrencyConverter.convertToNewCurrency(currency, product.currency, product.price * product.quantity);
				}
			});

			result = {
				RUB: +result.RUB.toFixed(2),
				EUR: +result.EUR.toFixed(2),
				USD: +result.USD.toFixed(2)
			}

			res.json(result);

		} catch (e) {
			res.json(e);
		}
	}

}
