import React, { useState, useEffect } from 'react'
// import pizzas from './pizza-data'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPizzas } from './actions/pizzaAction'
import { cartAction, sendCartAction } from './actions/cartAction'

export const Home = () => {
    const dispatch = useDispatch()
    const pizzastate = useSelector(state => state.getAllPizzaReducer)
    const { loading, pizzas } = pizzastate
    const [cartItem, setcartItem] = useState([])
    useEffect(() => {
        if (!localStorage.getItem("cartItem")) localStorage.setItem('cartItem', JSON.stringify([]))
        else {
            setcartItem(JSON.parse(localStorage.getItem('cartItem')))
        }
        dispatch(sendCartAction(JSON.parse(localStorage.getItem('cartItem'))))

    }, [dispatch])

    useEffect(() => {
        dispatch(getAllPizzas())//problem here
    }, [dispatch])

    useEffect(() => {
        // setcartItem(JSON.parse(localStorage.getItem('cartItem')))
    }, [])


    const addToCartHandler = (keyToBeSearched, elementTobeSearched) => {
        let index = -1
        index = currentSelection.findIndex(rank => rank.key === keyToBeSearched);
        currentSelection.map((element, key) => {
            if (key === index) {
                let newArr = [...cartItem]
                newArr.push({ name: elementTobeSearched.name, _id: elementTobeSearched._id, image: elementTobeSearched.image, prices: elementTobeSearched.prices, price: element.newprice, variant: element.newvariant, quantity: parseInt(element.newquantity) })
                setcartItem(newArr)// work number 1
                let newArr2 = JSON.stringify(newArr)
                localStorage.setItem("cartItem", newArr2)// work number 2
                dispatch(cartAction(newArr))// work number 3
            }
            return null
        })
    }
    const quantityArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [currentSelection, setcurrentSelection] = useState([])
    // const [variant, setvariant] = useState('small')
    // const [quantity, setquantity] = useState(1)

    const handleChangeVariant = (event, key, prices) => {
        let newvariant = event.target.value
        let newprice = prices[0][newvariant]
        let index = -1
        index = currentSelection.findIndex(rank => rank.key === key);

        if (index === -1) {
            let newArr = [...currentSelection]
            newArr.push({ key, newvariant, newprice, newquantity: 1 })
            setcurrentSelection(newArr)
        }
        else {
            let newArr = [...currentSelection]
            newArr[index].newvariant = newvariant
            newArr[index].newprice = newprice
            setcurrentSelection(newArr)
        }

    }

    const handleChangeQuantity = (event, key, prices) => {
        let newquantity = event.target.value
        let newprice = prices[0]['small']
        let index = -1
        index = currentSelection.findIndex(rank => rank.key === key);

        if (index === -1) {
            let newArr = [...currentSelection]
            newArr.push({ key, newquantity, newprice, newvariant: 'small' })
            setcurrentSelection(newArr)
        }
        else {

            let newArr = [...currentSelection]
            newArr[index].newquantity = newquantity
            setcurrentSelection(newArr)
        }

    }
    const faaltu = () => {
        return (
            <h1>LOADING...</h1>
        )
    }
    return (
        <div style={{ display: "flex", flexWrap: "wrap", paddingTop: "2rem", justifyContent: "center", alignItems: "center" }}>
            {
                !loading ?
                    pizzas.map((element, key) => {
                        return (
                            <Card key={key} style={{ width: '18rem', marginLeft: "18px", marginRight: "18px", marginTop: "10px", marginBottom: "10px", height: "28rem" }}>
                                <Card.Img className='homepagepizzaimage' variant="top" src={element.image} />
                                <Card.Body>
                                    <Card.Title>{element.name}</Card.Title>
                                    <Card.Text>{element.description}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <Row style={{ textAlign: "center" }}>
                                        <Col md={6}>

                                            <Card.Text>
                                                Variants
                                            </Card.Text>
                                            <select onChange={(event) => handleChangeVariant(event, key, element.prices)} className="form-select" aria-label="Default select example">
                                                <option value={element.varients[0]}>{element.varients[0]}</option>
                                                <option value={element.varients[1]}>{element.varients[1]}</option>
                                                <option value={element.varients[2]}>{element.varients[2]}</option>
                                            </select>
                                        </Col>
                                        <Col>

                                            <Card.Text>
                                                Quantity
                                            </Card.Text>
                                            <select onChange={(event) => handleChangeQuantity(event, key, element.prices)} className="form-select" aria-label="Default select example">
                                                {quantityArr.map((element1, key1) => {
                                                    return (
                                                        <option key={key1} value={element1}>{element1}</option>
                                                    )
                                                })}
                                            </select>
                                        </Col>
                                    </Row>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                                        <p style={{ marginTop: "8px" }}>{
                                            currentSelection.map((element2, key2) => {
                                                if (element2.key === key) {
                                                    return <p key={key2}>RS/= {element2.newprice * element2.newquantity}</p>
                                                }
                                                return null

                                            })
                                        }</p>
                                        <Button onClick={() => addToCartHandler(key, element)} style={{ backgroundColor: "lavender", color: "black" }}>Add to cart</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    }) : faaltu()
            }

        </div>
    )
}