import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

const Cart = () => {

  const [data, setData] = useState([]);
  const [totalprice, setTotalprice] = useState(0);
  const [removeproduct, setRemoveproduct] = useState(false);

  const deleteproduct = async(item) => {
    let response = await axios.delete(
      `http://localhost:8000/AddtoCart/${item.id}`
    );
    setRemoveproduct(false);
  } 

  useEffect(() => {
    async function fetchdata() {
      let response = await axios.get(`http://localhost:8000/AddtoCart`);
      setData(response.data);
      price(response.data);
    }
    fetchdata();
  }, [removeproduct]);

  const price = (data) => {
    let totalPrice = 0;
    data.forEach((object, index) => {
      totalPrice += object.points;
    });
    setTotalprice(totalPrice);
  };

  return (
    <Wrapper>
      <br/>
      <Container className='main-container'>
        <h1 className='top-element'>My Shopping Cart</h1>
        <hr />
        {data.map((object, index) => (
          <>
            <Row>
              <Col sm={2}>
                <img src={object.Img} alt=".." />
              </Col>
              <Col sm={10} className='flex'>
                <div>
                  <p className='style-left-auto'>{object.Description}</p>
                  <div className='style-block'>
                    <span>Quantity : {object.Quantity}</span>
                    <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                    <button onClick={ () => { deleteproduct(object); setRemoveproduct(true) }} >Remove</button>
                  </div>
                </div>
                <p className='style-left-auto'>{object.points} Points</p>
              </Col>
            </Row>
            <hr/>
          </>
        ))}
        <Row className='style-float-right'>
          <Col>
          { totalprice != 0 &&
            <>
            <h2>Total : {totalprice} points</h2>
            <p>item price includes shipping and handling</p>
            </>
          }
          </Col>
        </Row>
        { totalprice == 0 &&
          <>
            <center>
            <h2>Your cart is empty, Please add the product</h2>
            </center>
          </>  
        }
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .flex {
    display: flex;
  }
  .style-block {
    display: block;
  }
  .style-left-auto {
    margin-left: auto;
  }
  .style-float-right {
    float: right;
  }
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 80px;
  }
  button {
    color: blue;
    background-color: color;
    border: aliceblue;
  }
  @media screen and (max-width: 768px) {
    .top-element{
      margin-top : 50px;
    }
  }
  @media screen and (min-width: 768px) {
    .main-container {
      width: 900px;
    }
  }
`;

export default Cart;
