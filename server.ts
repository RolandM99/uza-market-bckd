import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
const userRouters = require('./app/routes/routes');
const cartRouters = require('./app/routes/cartRoutes');
const db = require('./app/Models/index');

dotenv.config({ path: __dirname + '/.env'});

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// synchronize the database
db.sequelize.sync({ force: true }).then(() => {
  console.log('DB has been synchronized');
});

app.use('/api/users', userRouters);
app.use('/api', cartRouters);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server start at PORT: ${PORT}`);
});