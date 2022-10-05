const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')
require('colors')
const { connectDB } = require('./config/config');

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


app.use("/api/pizzas", require('./routes/pizzaRoute'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on ${process.env.NODE_ENV} made on port number ${port}`);
})
connectDB