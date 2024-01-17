import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct =()=>{

        const [productName,setproductName]=useState('');
        const [productPrice,setproductPrice]=useState('')
        const [productCategory,setproductCategory]=useState('');
        const [company,setCompany]=useState('');
        const params = useParams();
        const navigate = useNavigate();

        useEffect(()=>{
            getProductDetails();
        }, []);

        let getProductDetails = async()=>{
            console.log(params);
            let response = await fetch(`http://localhost:5000/update/${params.id}`)
            let result =await response.json();
            setproductName(result.productName)
            setproductPrice(result.productPrice)
            setproductCategory(result.productCategory)
            setCompany(result.company)
        }

        const update = async()=>{

            // console.log(productName,productPrice,productCategory,company);

            let response = await fetch(`http://localhost:5000/updateProduct/${params.id}`,{
                method : "Put",
                body : JSON.stringify({productName,productPrice,productCategory,company}),
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            let result = await response.json();
            // console.log(result);
            navigate('/');
            
        }
        return(
        <div className="updateProduct">
            <h1>Update Product</h1>
            <input type="text" className="InputBox" 
            onChange={(e)=>setproductName(e.target.value)} value={productName}></input>
           
            <input type="text" className="InputBox" 
            onChange={(e)=>setproductPrice(e.target.value)} value={productPrice}></input>
            
            <input type="text" className="InputBox" 
            onChange={(e)=>setproductCategory(e.target.value)} value={productCategory}></input>

            <input type="text" className="InputBox" 
            onChange={(e)=>setCompany(e.target.value)} value={company}></input>
            
            <button className="updateProductButton" type="button" onClick={update}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;