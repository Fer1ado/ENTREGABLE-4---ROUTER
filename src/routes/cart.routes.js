import { Router } from "express";
import CartManager from "../../Clases/cartManager.js"

const cartRoute = Router();
const carro = new CartManager()

cartRoute.get("/:cid", async(req, res)=>{
    const cid = req.params.cid
    res.send(await carro.getCarrito(cid))
})

cartRoute.post("/",async (req, res) => {
    const cart = res.send(await carro.createCart());
    
    return cart
    
    })


cartRoute.post("/:cid/product/:pid",async (req, res) => {
const pid = req.params.pid;
const cid = req.params.cid

const producto = res.send(await carro.addCarrito(parseInt(cid),parseInt(pid)));

if(producto === "producto inexistente"){
    res.status(404).send(producto);
} if (producto === "numero incrementado en Carrito"){
    res.status(202).send(producto)
} if (producto === "producto agregado a carrito") {
    res.status(200).send(producto)
}

})



export default cartRoute