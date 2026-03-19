import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "@/controllers/product.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/test", (req, res) => {
  res.json({ message: "Products endpoint works!" });
});


router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
