import { Router } from "express";
import { ProductsController } from "../controllers/products.controller";
import { basketResultValidator } from "../validators/products/backet-result.validator";

const router = Router();

router.post("/basket-result", basketResultValidator, ProductsController.calculateResult);


export default router;
