const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors=require("cors")
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors())
app.use(express.static('public'))
app.use("/blog",require("./routes/user.rout"))
app.use("/blog",require("./routes/post.routes"))
app.use("/blog",require("./routes/reaction.routes"))

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
