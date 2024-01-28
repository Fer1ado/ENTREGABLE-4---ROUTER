import { Router } from "express";
import CartManager from "../../Clases/cartManager.js"

const cartRoute = Router();
const carro = new CartManager()

cartRoute.get("/", async(req, res)=>{
    res.send(await carro.getCarrito())
})

cartRoute.get("/product/:pid", async(req, res)=>{
    const pid = req.params.pid;
    res.send(await carro.getCarritoById(pid))
})

cartRoute.post("/:cid",async (req, res) => {
const pid = req.params.cid;
console.log(pid);

const producto = res.send(await carro.addCarrito(parseInt(pid)));

if(producto === "producto inexistente"){
    res.status(404).send(producto);
} if (producto === "numero incrementado en Carrito"){
    res.status(202).send(producto)
} if (producto === "producto agregado a carrito") {
    res.status(200).send(producto)
}

})



export default cartRoute