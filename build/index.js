"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//Creation of an Express application and calling it 'app'
const app = (0, express_1.default)();
//All incoming requests will be parsed as a JSON
app.use(express_1.default.json());
//Port where the server will listen
const PUERTO = 3001;
//Starting the server
app.listen(PUERTO, () => {
    console.log(`Server is running on port ${PUERTO}`);
});
