import express from "express";

//Creation of an Express application and calling it 'app'
const app = express();

//All incoming requests will be parsed as a JSON
app.use(express.json());

//Importing the routes from the personal routes file
import PersonalRoutes from './routes/PersonalRoutes';

//Port where the server will listen
const PUERTO = 3001;

//Activate the personal routes
app.use("/api/personal", PersonalRoutes);

//Starting the server
app.listen(PUERTO, () => {
  console.log(`Server is running on port ${PUERTO}`);
});
