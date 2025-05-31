const express = require("express");
const router = express.Router();
const product = require("./models/product_model");

// Get a Product
router.get("/", async (req, res) => {
  const { searchValue } = req.query;
  try {
    let Products;
    if (searchValue) {
      Products = await product.find({
        status: 1,
        name: { $regex: searchValue, $options: 'i' },
        description: { $regex: searchValue, $options: 'i' },
        price: { $regex: searchValue, $options: 'i' },
        stock: { $regex: searchValue, $options: 'i' }
      });
    } else {
      Products = await product.find({ status: 1 });
    }
    res.status(200).send({Products});
  } catch (err) {
    res.status(400).send({message:err.message});
  }
});

// Create a new product
router.post("/",async (req,res) => {
 const {name,stock,description,price} = req.body;
 try{
  const newProduct = {name,stock,description,price,status:1};
  await product.create(newProduct);
  res.status(200).send({message:"Product created successfully"});
 }catch (err) {
    res.status(400).send({message:err.message});
  }
});

// Edit the product 
router.put("/", async (req, res) => {
  const { id,name, stock, description, price } = req.body;
  try {
    const updatedProduct = await product.findOneAndUpdate(
      {id},
      {
      $set : {
        name:name,
        stock:stock,
        description:description,
        price:price,
        status:1
      }
    },
      { new: true, }
    );
    if (!updatedProduct) {
      res.status(404).send({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// soft delete API
router.delete("/",async (req,res)=>{
  const {id} = req.query;
  try{
   const deletedItem = await product.updateOne(
     {_id:id},
    { $set: { status: 0 } }
  );
      res.status(200).send({ message: "Deleted Successfully",deletedItem });
  }catch(err){
   res.status(400).send({message:err.message});
  }
});

// Hard Delete API
router.delete("/",async (req,res)=>{
  const {id} = req.query;
  try{
  const deletedItem = await product.findByIdAndDelete({_id:id});
      res.status(200).send({ message: "Deleted Successfully",deletedItem });
  }catch(err){
   res.status(400).send({message:err.message});
  }
})

module.exports = router;