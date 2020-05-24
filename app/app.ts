import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import config from "./config";
import { CurrencyConverter } from './currency-converter/currency-converter';
import productsRoutes from "./routes/products.routes";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(productsRoutes);

CurrencyConverter.fetchCurrencies();

app.listen(config.server.port, (err) => {
  console.log(config.server.port);
  if (err) {
    console.log(err);
  }
});
