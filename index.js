require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require("cors");
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const logger = require("./src/middleware/logger");

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());  // to enable cors

require('./src/middleware/routes')(app);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
