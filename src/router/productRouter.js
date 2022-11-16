import { Router } from "express";
import { PRODUCTDELETE, PRODUCTGET, PRODUCTGETID, PRODUCTPOST, PRODUCTPUT } from "../controllers/product.controllers.js";
import chektoken from "../middlewares/chektoken.js";


const router = Router()

// product Router
router.get("/products", PRODUCTGET)
router.get("/products/:id", PRODUCTGETID)
router.post("/product/post", chektoken, PRODUCTPOST)
router.put("/product/put/:id", chektoken, PRODUCTPUT)
router.delete("/product/delete/:id", chektoken, PRODUCTDELETE)


export default router