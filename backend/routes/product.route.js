import express from 'express'; 
import Product from '../models/Product.js';
import mongoose from 'mongoose'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/prodcut.controller.js';

const router = express.Router(); 


router.get("/", getProducts); 

router.post("/" ,createProduct);


router.put("/:id" , updateProduct); 
router.delete("/:id", deleteProduct);

export default router;  

