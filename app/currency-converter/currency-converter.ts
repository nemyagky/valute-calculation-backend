import fetch from "node-fetch";
import { Currency } from '../models/currency.interface';

export const CurrencyConverter = new class CurrencyConverterSingleton {
	private currenciesCache: { [propName: string]: Currency; } = {};

	public async fetchCurrencies() {
		const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');

		this.currenciesCache = JSON.parse(await response.text()).Valute;

		// API don't contains rubles, so, adding it
		this.currenciesCache.RUB = {
			Value: 1
		}
	}

	public convertToNewCurrency(oldCurrency: string, newCurrency: string, value: number) {
		const oldCurrencyRateToRubles = 1 / this.currenciesCache[oldCurrency].Value;
		const newCurrencyRateToRubles = 1 / this.currenciesCache[newCurrency].Value;

		return (value * oldCurrencyRateToRubles) / (newCurrencyRateToRubles);
	}
};