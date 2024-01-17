import React from "react";
import { useState } from "react";

const Product =()=>{

        const [productName,setproductName]=useState('');
        const [productPrice,setproductPrice]=useState('')
        const [productCategory,setproductCategory]=useState('');
        const [company,setCompany]=useState('');
        const [error, setError]=useState(false)

        const AddProduct = async()=>{

            // console.log(!productName);
            if(!productName || !productPrice || !productCategory || !company){
                
                setError(true);
                return false
            }

            // console.log(productName,productPrice,productCategory,company);
            let userId = JSON.parse(localStorage.getItem('user'))._id;

            let result = await fetch('http://localhost:5000/addProduct',{
                method : "Post",
                body : JSON.stringify({productName,productPrice,productCategory,userId,company}),
                headers :{
                    "Content-Type" : "application/json"
                }
            })

            result = await result.json();
            console.log(result);

            // clear data after submitting
            setproductName('');
            setproductPrice('');
            setproductCategory('');
            setCompany('');
        }
        return(
        <div className="addProduct">
            <h1>Add Product</h1>
            <input type="text" className="InputBox" placeholder="Enter Product Name"
            onChange={(e)=>setproductName(e.target.value)} value={productName}></input>
            {error && !productName && <span className="invalid-input">Enter Valid Product Name</span>}

            <input type="text" className="InputBox" placeholder="Enter Add Price"
            onChange={(e)=>setproductPrice(e.target.value)} value={productPrice}></input>
            {error && !productPrice && <span className="invalid-input">Enter Valid Product Price</span>}

            <input type="text" className="InputBox" placeholder="Enter Product Category"
            onChange={(e)=>setproductCategory(e.target.value)} value={productCategory}></input>
            {error && !productCategory && <span className="invalid-input">Enter Valid Product Category</span>}

            <input type="text" className="InputBox" placeholder="Enter Company"
            onChange={(e)=>setCompany(e.target.value)} value={company}></input>
            {error && !company && <span className="invalid-input">Enter Valid Product Company</span>}

            <button className="addProductButton" type="button" onClick={AddProduct}>Add Product</button>
        </div>
    )
}

export default Product;