import { Router } from "express";
import { CATEGORIESPOST, CATEGORIESPUT, CATEGORIESDELETE, GET, CATEGORIESGET} from "../controllers/categories.controllers.js";
import chektoken from "../middlewares/chektoken.js";

const router = Router()

// categories Router
router.get("/categories", CATEGORIESGET)
router.get("/categories/:id", GET)
router.post("/categories/post", chektoken, CATEGORIESPOST)
router.put("/categories/put/:id", chektoken, CATEGORIESPUT)
router.delete("/categories/delete/:id", chektoken, CATEGORIESDELETE)

export default router