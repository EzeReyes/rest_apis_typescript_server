import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / Typescript',
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerOptions : SwaggerOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('https://i.ibb.co/NdxznRqx/inicio.webp');
            height: 120px;
            width: auto;
        }
    `
}
export default swaggerSpec

export {
    swaggerOptions
}