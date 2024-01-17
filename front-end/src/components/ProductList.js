import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProduct();
  }, []); // <-- Corrected dependency array

  let getProduct = async () => {
    let response = await fetch("http://localhost:5000/products",{
      headers : {
        authorization : JSON.parse(localStorage.getItem('token'))
      }
    });
    let result = await response.json();
    setProducts(result);
  };

  let deleteProduct = async (id) => {
    let response = await fetch(`http://localhost:5000/delete/${id}`, {
      method: "delete",
    });
    let result = await response.json();
    if (result) {
      getProduct();
    }
  };

  let searchHandle = async(e)=>{
    // console.log(e.target.value);
    let key = e.target.value;
    if(key){ 
    let response = await fetch(`http://localhost:5000/search/${key}`);
    let result = await response.json();
    if(result){
      setProducts(result);
    }
  }else{
    getProduct();
  }
  }

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input type="text" placeholder="Search Here" className="search-product-box" onChange={searchHandle}></input>
      <ul>
        <li>S.No</li>
        <li>Product Name</li>
        <li>Product Price</li>
        <li>Product Category</li>
        <li>Company</li>
        <li>Action</li>
      </ul>

      {products.length > 0 ? products.map((item, index) => (
        <ul key={index}>
          <li>{index + 1}</li>
          <li>{item.productName}</li>
          <li>${item.productPrice}</li>
          <li>{item.productCategory}</li>
          <li>{item.company}</li>
          <li>
            <button type="button" onClick={() => deleteProduct(item._id)}>
              Delete
            </button>
            <Link to={`/update/${item._id}`}>Update</Link>
          </li>
        </ul>
        ))
        : <h1>No Result Found</h1>
      }
    </div>
  );
};

export default ProductList;
