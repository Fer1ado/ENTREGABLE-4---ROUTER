import { promises as fs } from "fs";
import { _dirname } from "../path.js"
import Cart from "./cart.js"

const cartRoute = `${_dirname}/Json/cart.json`;
const productsRoute = `${_dirname}/Json/products.json`

export default class CartManager {

  constructor() {
    this.carrito = [];
  }

  async getCarrito(){
    const producto = JSON.parse(await fs.readFile(cartRoute, "utf-8"));
    return producto;
  }

  async getCarritoById(id) {
    const producto = JSON.parse(await fs.readFile(cartRoute, "utf-8"))
    const entrega = producto.find((e) => e.id === parseInt(id));
    if(entrega){  
        return(`Encontramos ${entrega.cantidad} items en carrito del producto consultado`)}
        else{
        return("Ese producto no se encuentra en el carrito")}
    }

  async addCarrito(id) {
    //busco si existe el id en la base de datos de productos
    const item = await this.founded(id);
    //busco si el id ya tiene un carrito creado
    const added = await this.isAdded(item.id)
  
   
   
    if (item === null) {
        console.log("producto inexistente")
      return "producto inexistente en tienda";
    }
    if(added) {
      const vieneCarro = JSON.parse(await fs.readFile(cartRoute, "utf-8"));
      const indx = vieneCarro.findIndex((e) => e.id === parseInt(item.id));
      const nuevoValor = vieneCarro[indx].cantidad + 1;
      const creado = { productId: item.id, quantity: nuevoValor };
      let nuevoJson = vieneCarro.filter((prod) => prod.id != item.id);
      let remplazo = nuevoJson.concat(creado);
      await fs.writeFile(cartRoute, JSON.stringify(remplazo));
      return (`Hay ${creado.cantidad} unidades del producto ${creado.id} en Carrito `);
    } else {
      const newCart = new Cart(id, 1)
      const vieneCarro = JSON.parse(await fs.readFile(cartRoute, "utf-8"));
      const remplazo =  this.carrito.concat(...vieneCarro, newCart);
      await fs.writeFile(cartRoute, JSON.stringify(remplazo));
      console.log(`Producto ${newCart.itemId} agregado a carrito`)
      return {status: "success", message: "NUEVA ORDEN DE COMPRA INGRESADA A LA BASE DE DATOS", product: remplazo};
    }
    }

    async isAdded(id){
      const produ = JSON.parse(await fs.readFile(cartRoute, "utf-8"));
      return produ.some((e) => e.id === id);
    }
  
    async founded(id) {
      const produ = JSON.parse(await fs.readFile(productsRoute, "utf-8"));
      const item = produ.find((e) => e.id === id);
      console.log(produ)
      if (item) {
        return item;
      } else {
        return null;
      }
    }
  
    async cartId() {
      return(Math.trunc(Math.random()*(5000 - 1)+1))
    }

  }


const carro = new CartManager()