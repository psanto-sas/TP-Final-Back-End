TP final Back End (Express.js, Node.js, MongoDB)

Pedro Santoro

Proyecto que permite ejecutar funciones CRUD, hecho con express.js y node.js y los datos guardados en una DB en Mongo Compass. Las funciones CRUD se pueden aplicar a tres datos: usuarios, categorias y productos(lo basico de un ecommerce). Ademas, implementé la autenticación con JWT. Además de las tecnologias dichas, instalé mediante la terminal cors, nodemon, mongoose, mongodb, express, body-parser, dotenv, npm-check-updates y bcrypt.


Estructura de la colección:

User

 _id: Identificador único del usuario dado por mongoDB
 email: Correo electrónico del usuario
 password: Contraseña encriptada con bcrypt
 age: Edad del usuario
 createdAt:  Fecha de creación automática dada por mongoDB
 updatedAt: Fecha de última actualización dada por mongoDB

Category

 _id: Identificador único de la categoría dado por mongoDB
 name: Nombre de la categoría 
 description: Descripción breve de la categoría
 createdAt: Fecha de creación automática dada por mongoDB
 updatedAt: Fecha de última actualización dada por mongoDB

Product:

 _id: Identificador único del producto
 name: Nombre del producto
 price: Precio del producto
 description: Descripción del producto
 stock: Cantidad disponible
 category: categoria a la que pertenece el producto, vinculado con las categorias creadas

NSTRUCCIONES: 
 
Descargar el repositorio. 
Escribir en la terminal "npm init -y"
Instalar las siguientes dependencias: express mongo mongoose bcrypt nodemon npm-check-updates express-session body-parser cors dotenv
Verificar que en el package.json este lo siguiente: "type: module", "main":"index.js" y 
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
Crear una base de datos en mongo compass, y ponerle un nombre a la base de datos que se usará para archivar los datos, este nombre es el cual irá en el .env.
Completar el .env.

MOCK DATA:

http://localhost:3000/api   <===== RUTA BASE

Usuario:

http://localhost:3000/api/user <==== ruta base de user queries

POST  http://localhost:3000/api/user/create 
   mock.data: {
    "email":"pedro1@gmail.com",
    "password":"1.Abcdef",
    "age":43
  }
  {
    "email": "jlopez@gmail.com",
    "age": 32,
    "password": "Qwerty1."
  }
  
POST   http://localhost:3000/api/user/login 
  mock.data: {
   "email":"pedro2@gmail.com",
    "password":"1.ABCDEf"
  }	
GET   http://localhost:3000/api/user/getUsers 
DELETE   http://localhost:3000/api/user/deleteUser/:id 
PUT   http://localhost:3000/api/user/updateUser/:id  
  mock.data: {
  "email":"pedro2@gmail.com",
    "password":"1.ABCDEf",
    "age":43
  }
PATCH   http://localhost:3000/api/user/updateUser/:id 
  mock.data: {
  "age": 27
  }

Categoria:

http://localhost:3000/api/category

POST   http://localhost:3000/api/category/create 
   mock.data: {
  "name":"procesadores",
  "description":"el cerebro de cualquier computadora"
  }
  {
  "name":"memorias RAM",
  "description":"necesarias para manejar muchas tareas simultaneamente"
  }
  {
  "name": "periféricos",
  "description": "dispositivos externos como mouses, mous, auriculares, etc."
  }

GET   http://localhost:3000/api/category/getCategories 
DELETE   http://localhost:3000/api/category/delete/:id 
PUT   http://localhost:3000/api/category/update/:id  
PATCH   http://localhost:3000/api/category/update/:id 


Producto:

http://localhost:3000/api/product

GET   http://localhost:3000/api/product/ 
POST   http://localhost:3000/api/product/create 
  mock.data: 
  {
  "name":"Ryzen 5 5600G",
  "price": 100.000,
  "description": "Procesador con gráficos integrados para quienes buscan una computadora de oficina o de gaming economico",
  "stock":4,
  "category": id de categoría microprocesadores,
  "status": "Disponible"
  }
  {
  "name":"Memoria RAM Fury 16gb 3600mhz",
  "price": 50000,
  "profitRate": 1.2,
  "description": "Placa de Video gama alta, ideal para resolucion 2K y rinde decentemente incluso en 4K",
  "stock":10,
  "category": id de categoría memorias RAM,
  "status": "Disponible"
  }
  {
  "name":"Mouse Logitech G203 Lightsync",
  "price": 28000,
  "profitRate": 1.2,
  "description": "Mouse ideal para aquellos que buscan un mouse decente a precio economico",
  "stock":0,
  "category": id de categoría perifericos,
  "status": "No disponible"
  }
POST   http://localhost:3000/api/product/name 
  mock.data: {
  "name":"RAM Fury 16gb 3600mhz"
  }

GET   http://localhost:3000/api/product/found-by-id/:id 
PUT   http://localhost:3000/api/product/update/:id  
PATCH   http://localhost:3000/api/product/update/:id 
DELETE   http://localhost:3000/api/product/delete/:id 
GET   http://localhost:3000/api/product/status  
 
