import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { About } from './About'
import { Contact } from './Contact'
import { Terms } from './Terms'
import { Menu } from './Navbar'
import { SubNavbar } from "./SubNavbar";
import { Cart } from './Cart'
import { Register } from "./Register";
import { Login } from "./Login";
import { Logout } from './Logout'
import { Orders } from "./Orders";
import { UserList } from "./admin/UserList";
import { PizzasList } from "./admin/PizzasList";
import { AddNewPizza } from "./admin/AddNewPizza";
import { OrderList } from "./admin/OrderList";
import { useSelector } from "react-redux";
import { EditPizza } from "./admin/EditPizza";
import { DeletePizza } from "./admin/DeletePizza";

function App() {
  // const [isAdminLoggedIn, setisAdminLoggedIn] = useState(false)
  const isAdminLoggedIn = useSelector((state) => state.loginReducer.user.isAdmin)

  return (
    <BrowserRouter>
      <Menu />
      <SubNavbar />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/admin' element={isAdminLoggedIn ? <PizzasList /> : <Home />} />
          {/* FOR ADMIN PANEL*/}
          <Route path='/admin/userlist' element={isAdminLoggedIn ? <UserList /> : <Home />} />
          <Route path='/admin/pizzaslist' element={isAdminLoggedIn ? <PizzasList /> : <Home />} />
          <Route path='/admin/addnewpizza' element={isAdminLoggedIn ? <AddNewPizza /> : <Home />} />
          <Route path='/admin/orderlist' element={isAdminLoggedIn ? <OrderList /> : <Home />} />
          <Route path='/admin/editpizza' element={isAdminLoggedIn ? <EditPizza /> : <Home />} />
          <Route path='/admin/deletepizza' element={isAdminLoggedIn ? <DeletePizza /> : <Home />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
