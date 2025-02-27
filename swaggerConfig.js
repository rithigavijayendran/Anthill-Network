import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bus Booking API",
      version: "1.0.0",
      description: "API documentation for the Bus Booking System",
    },
    servers: [
      {
        url: "http://localhost:5000", // Change this to your deployed URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Reads API documentation from route files
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
