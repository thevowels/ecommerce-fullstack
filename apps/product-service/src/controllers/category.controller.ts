import { prisma, Prisma } from "@repo/product-db";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
  const data: Prisma.CategoryCreateInput = req.body;
  try{
	const category = await prisma.category.create({ data });
	res.status(201).json({
	  data: category,
	});
  
  }catch(error:any)
  {
	if(error instanceof Prisma.PrismaClientKnownRequestError)
	{
		if(error.code === "P2002")
			res.status(409).json({
				message:"Failed",
				error: "Record with unique constraint already exists"
			})
	}
	console.log(error);
	res.status(500).send();
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const data: Prisma.CategoryUpdateInput = req.body;

  try {
    const updatedCategory = await prisma.category.update({
      where: {
        category_id: Number(id),
      },
      data,
    });
    res.status(201).json({
      message: "updated",
      data: updatedCategory,
    });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === "P2025")
        return res.status(404).json({ message: "Record not found!" });
    return res.status(500).send();
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.category.delete({
      where: {
        category_id: Number(id),
      },
    });
    return res.status(204).send();
  } catch (error: any) {
	console.log(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) 
      if (error.code === "P2025")
        res.status(404).json({ message: "record not found" });
    if(error.cause?.code === '23001')
		res.status(409).json({ message: "Record has foreign relations."});
    res.status(500).send();
  }
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();

  res.json({ message: "success", categories });
};
export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await prisma.category.findUnique({
    where: {
      category_id: Number(id),
    },
  });
  if (!product) return res.status(404).send();
  return res.status(200).json({
    message: "success",
    data: product,
  });
};
