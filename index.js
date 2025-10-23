import express from 'express'
import bodyParser from 'body-parser'
import { connectDB } from './src/config/db.js'
import { PORT, SECRET } from './src/config/config.js'
import { userRoute } from './src/routes/userRoutes.js'
import session from 'express-session'
import { categoryRoute } from './src/routes/categoryRoutes.js'
import { productRoute } from './src/routes/productRoutes.js'
import cors from 'cors'

const application = express();

application.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}));

connectDB();

application.use(bodyParser.json());


application.use(bodyParser.urlencoded({extended: true}));

application.use(
    session({
        secret: SECRET,
        resave: false, 
        saveUninitialized: false, 
    })
);

application.use("/api/user", userRoute);
application.use("/api/category", categoryRoute);
application.use("/api/product", productRoute);

application.listen(PORT, () => {
    console.log(`Servidor funcionando en ${PORT}`)
});
