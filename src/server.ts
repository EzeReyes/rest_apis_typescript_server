import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, {swaggerOptions} from './config/swagger'
import cors, {CorsOptions} from 'cors';
import dotenv from "dotenv"
import morgan from 'morgan'
dotenv.config()

// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate();
        await db.sync({ alter: true }); // <- Acá sincroniza los modelos con la base de datos
        console.log(colors.blue('Conexión exitosa a la base de datos'));
    } catch (error) {
        console.log(error);
        console.log(colors.red.bold('Hubo un error al conectar con la DB'));
    }
}


connectDB()

// Instancia de express
const server = express();

server.use(cors());

const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'), false)
        }
    }
}

server.use(cors(corsOptions))

// Leer datos de formulario
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions) )


export default server;