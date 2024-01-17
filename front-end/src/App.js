import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import SignUp from './components/sign_up';
import PrivateComponent from './components/privateComponent';
import Login from './components/LoginComponent';
import Product from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav /> 
          <Routes>
           
            <Route element = {<PrivateComponent/>}>
            <Route path='/' element={<ProductList/>}></Route>
            <Route path='/add' element={<Product/>}></Route>
            <Route path='/update/:id' element={<UpdateProduct/>}></Route>
            <Route path='/profile' element={<h1>Profile Component</h1>}></Route>
            <Route path='/logout' element={<h1>Logout Component</h1>}></Route>
            </Route>
           
            <Route path='/signUp' element={<SignUp/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
          </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
