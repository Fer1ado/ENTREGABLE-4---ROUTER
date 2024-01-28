import ProductManager from "../Clases/productManager.js";
import CartManager from "../Clases/cartManager.js";
import { promises as fs } from "fs";

import cartRoute from "./routes/cart.routes.js";
import prodRoute from "./routes/products.routes.js";


///IMPORTACIONES Y SERVIDORES
import express from "express";

const PORT = 8080;



const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, ()=>{
  console.log(`Server listening on port ${PORT}`)
})


//Saludo
app.get("/", (req,res)=>{
  res.send(`<h1>¡Hola, Bienvenidos!</h1>`)
})

//ROUTES
app.use("/api/products", prodRoute);
app.use("/api/cart", cartRoute)


//////////////////////////////////////////////////////////////////////////////////////

/////////////////// npm start para correr el programa/////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////




