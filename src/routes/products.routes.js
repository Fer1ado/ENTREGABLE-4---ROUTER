import ProductManager from "../../Clases/productManager.js";
import { Router } from "express";

const prodRoute = Router();
const ejecutar = new ProductManager();


//pedido de productos por ID
prodRoute.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const producto = await ejecutar.getProductById(parseInt(pid));
  res.send(producto)

});

//Pedido de listado completo
prodRoute.get("/:limit?", async (req,res)=>{
  const limit = parseInt(req.query.limit)
  res.send(await ejecutar.getProducts(limit))
  
})

//Subida de productos
prodRoute.post("/", async (req, res) => {
  const producto = await ejecutar.addProduct(req.body);

  if (producto.status === "failed") {
    return res.status(400).send(producto)}
    else {
    return res.status(200).send(producto);
    }
});

//editado de producto
prodRoute.put("/:id", async (req, res) => {
  const { id } = req.params;

  const producto = await ejecutar.updateProduct(id, req.body);

  if (producto.status === "failed") {
    return res.status(400).send(producto)}
    else {
    return res.status(200).send(producto);
    }
});

//borrado de producto
prodRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const producto = await ejecutar.deleteProduct(id);

  if (producto.status === "failed") {
    return res.status(400).send(producto)}
    else {
    return res.status(200).send(producto);
    }
});

export default prodRoute;
