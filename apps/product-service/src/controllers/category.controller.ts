import { prisma, Prisma } from "@repo/product-db";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
		const data: Prisma.CategoryCreateInput = req.body;
		const category = await prisma.category.create({data});
		res.status(201).json({
			data: category
		});
	
};

export const updateCategory = async (req: Request, res: Response) => {

};

export const deleteCategory = async (req: Request, res: Response) => {
	
};

export const getCategories = async (req: Request, res: Response) => {
	const categories = await prisma.category.findMany();

	res.json({message:"success", categories});
};
export const getCategory = async (req: Request, res: Response) => {
	const {id} = req.params;

	const product = await prisma.category.findUnique({
		where:{
			category_id: Number(id)
		}
	})
	if(!product)
			return res.status(404).send();
	return res.status(200).json({
		message:"success",
		data: product
	})
};
