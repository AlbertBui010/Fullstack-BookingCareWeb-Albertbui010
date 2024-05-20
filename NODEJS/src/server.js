import express from 'express';
import bodyParser from 'body-parser'; // /user?id=7
import connectDB from './config/connectDB';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import cors from 'cors';

require('dotenv').config();
let app = express();
app.use(cors({ origin: true, credentials: true }));
// Config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
	console.log('Backend Nodejs is running on the port: ' + port);
});
