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

////////////////////////////TESTINNG////////////////////////////////////////

// PRODUCTS

//GET http://localhost:8080/api/products/  --> listado de todos los productos
//GET http://localhost:8080/api/products?limit=# --> Listado de productos con limite de registros
//GET http://localhost:8080/api/products/:pid --> Devuelve aquel producto que coincida con el ID
//POST http://localhost:8080/api/products/ --> volcando un producto en el body lo agrega a la BD, el método solo valida que no haya campos nullish

//Dummy JSON
/* {
  "title": "Batatas Fritas",
  "description": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
  "price": 33824,
  "thumbnail": "/et/ultrices/posuere/cubilia/curae/donec.json",
  "code": "MA8755",
  "stock": 286,
  "status": true
} */

// CART

// POST http://localhost:8080/api/cart/ --> Crea un carrito nuevo
// GET  http://localhost:8080/api/cart/:cartId --> Devuelve contenido de carrito según ID
// POST http://localhost:8080/api/cart/:cartId/product/:productId --> Agrega productos al carrito de acuerdo al Id de carrito y producto a agregar.


