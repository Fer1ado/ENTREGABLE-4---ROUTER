import { promises as fs } from "fs";
import { _dirname } from "../path.js"
import Cart from "./cart.js"


const cartRoute = `${_dirname}/Json/cart.json`;
const productsRoute = `${_dirname}/Json/products.json`

export default class CartManager {

  constructor() {
    this.carrito = [];
  }

  async getCarrito(cid){
    const producto = JSON.parse(await fs.readFile(cartRoute, "utf-8"));
    const entrega = producto.find((e) => e.cartId === parseInt(cid))
    console.log(entrega)
    return entrega;
  }

  async createCart() {
    try{
        const cart = new Cart()
        const parseCart = JSON.parse(await fs.readFile(cartRoute, "utf-8"))
        const remplazo = parseCart.concat(cart)
        await fs.writeFile(cartRoute, JSON.stringify(remplazo))
        return{status: "success", message: "NUEVO CARRITO DE COMPRAS CREADO", carrito: cart}}
    catch(err){
        return{status: "failed", message: err.message}
    }
    }

  async addCarrito(cid, pid) {
    //busco si el id ya tiene un carrito creado
     const added = await this.isAdded(cid,pid)
    //dejo a disposición el contenido del cart.json
    const parseCart = JSON.parse(await fs.readFile(cartRoute, "utf-8"));
    const parseProduct = JSON.parse(await fs.readFile(productsRoute, "utf-8"))

  try{
    if ( added === null) {
        console.log("producto inexistente")
      return {status: "failed", message: "NECESITA CREAR UN CARRITO EN TIENDA PARA PODER COMPRAR"}}

    if(added === "agregar al carro"){
    const prod = parseProduct.some(e => e.id === pid);
      if(prod){
        const cart =  parseCart.find((e) => e.cartId === cid);
        const existencia = cart.products
        const item =  {productid: pid, quantity: 1 }
        const nuevoarray = [...existencia, item]
        const nuevoitem = {cartId: cid, products: [...nuevoarray]}
        const nuevoJson = parseCart.filter((e) => e.cartId != cid);
        const remplazo = nuevoJson.concat(nuevoitem);
        await fs.writeFile(cartRoute, JSON.stringify(remplazo));
        console.log(`Hay ${item.quantity} unidad del producto ${pid} agregada en Carrito `)
        return {status: "success", message: "SE AGREGARON PRODUCTOS AL CARRITO EXITOSAMENTE", producto: nuevoitem}
      }
      else{
        return{status: "failed", message: "PRODUCTO INEXISTENTE EN BASE DE DATOS"}
      }
    }

    if (added === "aumentar cantidad") {
      const productToUpdate = parseCart.find(e => e.products.find(prod => prod.productid === pid));
      const edicion = productToUpdate.products.find(prod => prod.productid === pid)
      const cantidad = productToUpdate.products.find(prod => prod.productid === pid).quantity
      const final = {...edicion, quantity: cantidad +1}
      const existencia = productToUpdate.products
      const filtrado = existencia.filter(prod => prod.productid != pid)
      const nuevoarray = [...filtrado, final]
      const objRemplazo = {...productToUpdate, products: nuevoarray }
      const nuevoJson = parseCart.filter((e) => e.cartId != cid);
      const remplazo = nuevoJson.concat(objRemplazo);
      await fs.writeFile(cartRoute, JSON.stringify(remplazo));
      console.log(`Hay ${final.quantity} unidades del producto ${pid} en Carrito `)
      return {status: "success", message: "se agregaron productos al carrito", producto: objRemplazo}}
      
    else{
        return {status: "failed", message: "Algo salió mal y no sabemos bien que"}}
    } 
    catch(err){
      return {status: "failed", message: err.message}
    }

  }
    
  async isAdded(cid, pid){
      const produ = JSON.parse(await fs.readFile(cartRoute, "utf-8"));
      const cart =  produ.some((e) => e.cartId === cid);
      const contenido = produ.find((e) => e.products.find(e => e.productid === pid))

      if (!cart) {
        console.log("No hay carritos creados con ese id")
        return null;
      } if(contenido === undefined) {
        return ("agregar al carro")
      } else {
        return ("aumentar cantidad")
      }
    }

}



const carro = new CartManager()