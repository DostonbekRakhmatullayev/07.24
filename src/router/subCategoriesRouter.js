import { Router } from "express";
import { SUBCATEGORIESDELETE, SUBCATEGORIESGET, SUBCATEGORIESGETID, SUBCATEGORIESPOST, SUBCATEGORIESPUT } from "../controllers/subCategories.controllers.js";
import chektoken from "../middlewares/chektoken.js";

const router = Router()

// subCategories Router
router.get("/subcategories", SUBCATEGORIESGET)
router.get("/subCategories/:id", SUBCATEGORIESGETID)
router.post("/subCategories/post", chektoken, SUBCATEGORIESPOST)
router.put("/subCategories/put/:id",chektoken, SUBCATEGORIESPUT)
router.delete("/subCategories/delete/:id", chektoken, SUBCATEGORIESDELETE)

export default router