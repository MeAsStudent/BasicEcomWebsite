import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { BsHeartFill } from "react-icons/bs";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { TiShoppingCart } from "react-icons/ti";
import styled from "styled-components";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SingleProduct = () => {
  const params = useParams();
  let navigate = useNavigate(); 
  const [naam, setnaaam] = useState(false);
  const [singleprod, setSingleprod] = useState([]);
  const [zoomIcon, setZoomIcon] = useState(true);
  const [likeIcon, setlikeIcon] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const navigatecart = async(data) => {
    let overalldata = {...data, Quantity : quantity, points : singleprod[0].points * quantity}
    let response = await axios.post(
      `http://localhost:8000/AddtoCart`,overalldata
    );
    navigate('/cart');
  }

  const plusquantity = () => {
    setQuantity(quantity + 1);
  }

  const minusquantity = () => {
    setQuantity(quantity - 1);
  }

  useEffect(() => {
    async function fetchdata() {
      let response = await axios.get(
        `http://localhost:8000/allproducts?id=${params.id}`
      );
      setSingleprod(response.data);
    }
    fetchdata();
  }, [params.id]);

  return (
    <Wrapper>
    {singleprod.length !== 0 && (
      <Container className='main-container'>
      <Row className='block'>
        <Col className='margintop'>
          <div className='imgborder'>
            <img
              src={singleprod[0].Img}
              alt=".."
              className={naam ? 'zoomeffect' : 'nothing'}
            />
          </div>
          <br />
          {zoomIcon && (
            <span
              className='zoom-in'
              onClick={() => {
                setnaaam(true);
                setZoomIcon(false);
              }}
            >
              <AiOutlineZoomIn />
            </span>
          )}
          {!zoomIcon && (
            <span
              className='zoom-out'
              onClick={() => {
                setnaaam(false);
                setZoomIcon(true);
              }}
            >
              <AiOutlineZoomOut />
            </span>
          )}
        </Col>
        <Col>
          <Col>
            <h5>{singleprod[0].Description}</h5>
            <h6>{singleprod[0].Name}</h6>
            <p>price : {singleprod[0].points} Points</p>
            <span>
              <RiCheckboxCircleFill color="green" /> <span>item price includes shipping and handling</span>
            </span>
           
            <div className='quantity'>
              { quantity >= 1 &&
              <a className='quantity__minus'  onClick={() => minusquantity()}><span>-</span></a>
              }
              { quantity === 0 &&
              <a className='quantity__minus'><span>-</span></a>
              }
              <input name="quantity" type="text" className='quantity__input' value={quantity} />
              <a className='quantity__plus' onClick={() => plusquantity()} ><span>+</span></a>
              <button className='addtocart' onClick={ () => navigatecart(singleprod[0]) } > <TiShoppingCart /> Add to cart</button>
            </div>
         
            <div style={{ marginTop: '10px' }}>
            <span
              className={likeIcon ? 'redheart' : 'whiteheart'}
              onClick={() => {
                {
                  likeIcon === false && setlikeIcon(true);
                }
                {
                  likeIcon !== false && setlikeIcon(false);
                }
              }}
            >
              <BsHeartFill />
            </span>
            <span >Add to Wish List</span>
            </div>

            <hr />  
            <span>Total</span>
            <span className='style-float-right'>{singleprod[0].points * quantity} Points</span>
            <hr />
          </Col>
          <Col>
            <TbTruckDelivery />
            <span>
              <b>Usually ships within 7 buisness days</b>
            </span>
            <div className='productdes'>
              <strong>Product Description</strong>
              <p>{singleprod[0].Description}</p>
              <p>
                {singleprod[0].Description},{singleprod[0].LongDescription}
              </p>
            </div>
          </Col>
        </Col>
      </Row>
      </Container>
    )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .zoom-in {
    color: blue;
    text-align: center;
    display: block;
  }
  .zoom-out {
    color: blue;
    text-align: center;
    display: block;
    margin-top: 20px;
  }
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .imgborder {
    border: 1px solid #e5dddb;
    margin: auto;
    margin-top: 10px;
    width: 370px;
  }
  .zoomeffect {
    -ms-transform: scale(1.2); /* IE 9 */
    -webkit-transform: scale(1.2); /* Safari 3-8 */
    transform: scale(1.2);
  }
  .productdes {
    border: 1px solid black;
    padding: 5px;
  }
  .style-float-right {
    float: right;
  }
  .whiteheart {
    color: #c2c2c2;
  }
  .redheart {
    color: red;
  }
  .quantity {
    display: flex;
    align-items : center;
    padding: 0;
    margin-top : 10px;
  }
  .quantity__minus,
  .quantity__plus {
    display: block;
    width: 32px;
    height: 33px;
    margin: 0;
    background: #dee0ee;
    text-decoration: none;
    text-align: center;
    line-height: 33px;
    font-size: 20px;
  }
  .quantity__minus:hover,
  .quantity__plus:hover {
    background: #575b71;
    color: #fff;
  }
  .quantity__minus {
    border-radius: 3px 0 0 3px;
  }
  .quantity__plus {
    border-radius: 0 3px 3px 0;
  }
  .quantity__input {
    width: 42px;
    height: 33px;
    margin: 0;
    padding: 0;
    text-align: center;
    border-top: 2px solid #dee0ee;
    border-bottom: 2px solid #dee0ee;
    border-left: 1px solid #dee0ee;
    border-right: 2px solid #dee0ee;
    background: #fff;
    color: #8184a1;
  }
  .quantity__minus:link,
  .quantity__plus:link {
    color: #8184a1;
  }
  .quantity__minus:visited,
  .quantity__plus:visited {
    color: #fff;
  }
  .addtocart{
    background-color: darkblue;
    margin-left: auto;
    color: white;
    padding-left: 95px;
    padding-right: 95px;
  }
  @media screen and (max-width: 768px) {
    img{
      width: 50%;
    }
    .block{
      display: inline-block;
    }
    .margintop{
      margin-top : 40px;
    }
  }
  @media screen and (min-width: 768px) {
    .main-container{
      width: 870px;
    }
  }
`;

export default SingleProduct;
