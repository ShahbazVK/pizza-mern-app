const express = require('express');
const router = express.Router()
const PizzaModel = require('../models/pizzaModel');
// const UserModel = require('../models/UserModel');
const UserModel = require('../models/UserModel')
const Order = require('../models/orderModel')
const { v4: uuidv4 } = require('uuid');
const pizzas = require('../pizza-data');
const stripe = require('stripe')("sk_test_51Lo6PUHWs13Ra00Lrz09bfvOJjaQOAmkCkPIdyzHfK8PjFUxkCx9YKJrNGHRU9yFVmsWWUcurHDy1bHaEuKm3GtU00fn861oGe")

router.get('/getallpizzas', async (req, res) => {
    try {
        // const pizzas = await PizzaModel.find({})
        res.send(pizzas)
    }
    catch (err) {
        res.json({ message: err })
    }
})

router.post('/user/register', (req, res) => {
    const { username, email, password, isAdmin } = req.body.values
    UserModel.create({ username, email, password, isAdmin }, (err, post) => {
        if (err) {
            res.json({ err })
        }
        else {
            res.json(post)
        }
    })
})

router.post('/user/login', (req, res) => {
    const { email, password } = req.body.values
    UserModel.findOne({ email }, (err, post) => {
        if (err) {
            res.json({ err })
        }
        else if (post) {
            if (post.password === password) {
                res.json(post)
            }
            else res.json({ err: "password is incorrect" })
        }
        else if (!post) {
            res.json({ err: "incorrect email" })
        }
    })
})

router.post('/order/placeorder', (req, res) => {
    const { token, subtotal, cartItem, currentuser } = req.body

    stripe.customers.create({
        email: token.email,
        source: token.id
    }).then((resp) => {
        stripe.charges.create({
            amount: subtotal * 100,
            currency: "inr",
            customer: resp.id,
            receipt_email: token.email
        }, { idempotencyKey: uuidv4() }, (err, post) => {
            if (err) console.log(err)
            else {
                Order.create({
                    name: currentuser.name,
                    email: currentuser.email,
                    userid: currentuser._id,
                    orderItems: cartItem,
                    orderAmount: subtotal,
                    shippingAddress: {
                        street: token.card.address_line1,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        pincode: token.card.address_zip,
                    },
                    transactionId: post.source.id
                })
                res.json("posted")
            }
        })
    })
})


router.get('/order/getorders/:email', async (req, res) => {
    const { email } = req.params
    Order.find({ email }, (err, post) => {
        if (err) console.log(err)
        else res.json(post);
    })
})

router.post('/order/addnewpizza', async (req, res) => {
    const { name, prices, category, image, description, varients } = req.body.values
    PizzaModel.create({ name, prices, category, image, description, varients }, (err, post) => {
        if (err) console.log(err)
        else res.json(post);
    })
})

router.post('/order/editpizza', async (req, res) => {
    const { name, prices, category, image, description, varients, _id } = req.body.values
    PizzaModel.findByIdAndUpdate(_id, { name, prices, category, image, description, varients }, (err, post) => {
        if (err) console.log(err)
        else res.json(post);
    })
})

router.delete('/order/deletepizza/:id', async (req, res) => {
    const { id } = req.params
    PizzaModel.findByIdAndDelete(id, (err, post) => {
        if (err) console.log(err)
        else res.json(post);
    })
})

router.get('/order/getallorders', async (req, res) => {
    try {
        const pizzas = await Order.find({})
        res.send(pizzas)
    }
    catch (err) {
        res.json({ message: err })
    }
})

router.post('/order/nowdelivered', async (req, res) => {
    const { id } = req.body
    Order.findByIdAndUpdate(id, { isDelivered: true }, (err, post) => {
        if (err) console.log(err)
        else res.json(post);
    })
})

router.get('/order/getallusers', async (req, res) => {
    try {
        const users = await UserModel.find({})
        res.send(users)
    }
    catch (err) {
        res.json({ message: err })
    }
})

router.post('/order/admintoggle', async (req, res) => {
    const { id, operation } = req.body
    UserModel.findByIdAndUpdate(id, { isAdmin: operation === 'make' ? true : false }, (err, post) => {
        if (err) console.log(err)
        else res.json(post);
    })
})

module.exports = router