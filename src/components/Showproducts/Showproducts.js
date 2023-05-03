import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import {addToCart} from '../../redux/cartSlice';
import "./Showproducts.css"
const Showproducts = () => {
    const dispatch = useDispatch()
    const Prodact = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
      const url = `/products/${Prodact.id}`;
      fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.log(error));
    }, [Prodact.id]);
    useEffect(() => {
      if (data.length !== 0) {
        setIsLoading(false);
      }
  
    }, [data]);
    console.log(data)
    let id=data._id;
    let title=data.title;
    let price=data.price;
    let image=data.img;
    return (
      
        <div>
           {isLoading ? (
        <h1>
          loading ...
        </h1>
      ) : (
          <div className='showproduct'>
            <div className="showproduct-img">
              <img src={data.img} alt="" />
          </div>
          <div className="showproduct-info">
                      <p className='category-name'>{data.category}</p>
                      <h2 className='product_name'>{data.title}</h2>
                      <p className='descriptions'>{data.description}</p>
                      <p className='product_price'>{data.price} LE</p>
                      <div className='showproduct-button'>
                        <input type='button'  onClick={() => 
                          dispatch(addToCart({
                            id, title, image, price
                          }))
                        } value={"Add To Cart"}/>
                        <Link to={'/cart'}>
                          <input type='button' value={"Cart"}/>
                        </Link>
                      </div>  
          </div>
          </div>
      )}
        </div>
    // <div>
    //     <div>ff</div>
    //     <div>ff</div>
    //     <div>ff</div>
    //     <div>ff</div>
    //     <div>ff</div>
    //     <div>ff</div>
    //     <div>ff</div>
    // </div>
      
    )
  }
export default Showproducts;