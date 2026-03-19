import { prisma, Prisma } from "@repo/product-db";
import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "../../../../packages/product-db/generated/prisma/internal/prismaNamespace";

export const createProduct = async (req: Request, res: Response) => {
  const data: Prisma.ProductCreateInput = req.body;

  const { colors, images } = data;
  if (!colors || !Array.isArray(colors) || colors.length === 0)
    return res.status(400).json({ message: "Colors array is required" });
  if (!images || typeof images !== "object")
    return res.status(400).json({ message: "Images is required!" });

  const missingColors = colors.filter((color) => !(color in images));
  if (missingColors.length > 0) {
    return res.status(400).json({ message: "missing colors!", missingColors });
  }
  const product = await prisma.product.create({ data });

  res.status(201).json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const data: Prisma.ProductUpdateInput = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { product_id: Number(id) },
      data,
    });
    res.status(201).json({
      message: "updated",
      data: updatedProduct,
    });
  } catch (error: unknown) {
	if(error instanceof Prisma.PrismaClientKnownRequestError)
	{
		return res.status(404).json({
			message: "Record not found"
		})
	}
	else
		return res.status(500).send();
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { product_id: Number(id) },
    });
    return res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025")
        return res.status(404).json({ message: "Record not found!" });
    } else res.status(500).json({ message: "Internal server error" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  const { sort, category, search, limit } = req.query;

  const orderBy = (() => {
    switch (sort) {
      case "asc":
        return { price: Prisma.SortOrder.asc };
        break;
      case "desc":
        return { price: Prisma.SortOrder.desc };
        break;
      case "oldest":
        return { createdAt: Prisma.SortOrder.asc };
        break;
      default:
        return { createdAt: Prisma.SortOrder.desc };
        break;
    }
  })();

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category as string,
      },
      name: {
        contains: search as string,
        mode: "insensitive",
      },
    },
    orderBy,
    take: limit ? Number(limit) : undefined,
  });

  return res.json({ message: "success", data: products });
};
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { product_id: Number(id) },
  });
  if (!product)
    return res.status(404).json({
      message: "record not found!",
    });
  return res.json({
    message: "success",
    data: product,
  });
};
