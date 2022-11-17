import React , { useState, useEffect } from 'react'
import axios from 'axios';
import styled from "styled-components";
import Carder from './Carder';
import Filter from './Filter';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Product = (props) => {

 const [data, setdata] = useState([])
 const [currentValue, setcurrentValue] = useState('')
 const [sortType, setSortType] = useState('');
 const [sliderShow, setSliderShow] = useState(false)
 const [value, setValue] =  React.useState([0,5000]);
 const [dummy, setDummy] = useState([]);
 const [state, setState] = useState("");

 const marks = [
  {
    value: 0,
    label: '0 Points',
  },
  {
    value: 5000,
    label: '5000 Points',
  }
 ];

  // Changing State when slider increases/decreases
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeValue = (value) => {
    setcurrentValue(value)
  }

  useEffect(() => {
    async function fetchdata(){
      let response;
      if(props.name){
        response=await axios.get("http://localhost:8000/allproducts")
      }
      else{
        response=await axios.get(`http://localhost:8000/allproducts?Category=${props.name}`)
      }
      setdata(response.data);
    }
    fetchdata();
  },[])

  useEffect(() => {
    let newData;
    let tempData = [...data];
    newData = tempData.filter(object => object.points > value[0] && object.points <= value[1]);
    setDummy(newData);
    if(value[0] > 0 && value[1] <= 5000){
      setState('hi');
    }
  },[value])

  useEffect(() => {
    let newData;
    let tempData = [...data];
    let myBalance = 1500;
    if(sortType === "Any Price"){
      setDummy(data);
      setSliderShow(false);
    }
    if(sortType === "Filter by my balance"){
      newData = tempData.filter(object => object.points <= myBalance);
      setDummy(newData);
      setSliderShow(false);
    }
    if(sortType === "price range"){
      setSliderShow(true);
    }
  }, [sortType]); 

  useEffect(() => {
    let newData;
    let tempData = [...data];
    let tempDummyData = [...dummy];
    if(currentValue === "lowest"){
      if(dummy.length == 0){
        newData = tempData.sort((a, b) => a.points - b.points);
        setdata(newData);
      }
      if(dummy.length !== 0){
        newData = tempDummyData.sort((a, b) => a.points - b.points);
        setDummy(newData);
      }
    }
    if(currentValue === "highest"){
      if(dummy.length == 0){
        newData = tempData.sort((a, b) => b.points - a.points);
        setdata(newData);
      }
      if(dummy.length !== 0){
        newData = tempDummyData.sort((a, b) => b.points - a.points);
        setDummy(newData);
      }
    }
    if(currentValue === "a - z"){
      if(dummy.length == 0){
        newData = tempData.sort((a, b)=> a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1);
        setdata(newData);
      }
      if(dummy.length !== 0){
        newData = tempDummyData.sort((a, b)=> a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1);
        setDummy(newData);
      }
    }
    if(currentValue === "z - a"){
      if(dummy.length == 0){
        newData = tempData.sort((a, b)=> a.Name.toLowerCase() < b.Name.toLowerCase() ? 1 : -1);
        setdata(newData);
      }
      if(dummy.length !== 0){
        newData = tempDummyData.sort((a, b)=> a.Name.toLowerCase() < b.Name.toLowerCase() ? 1 : -1);
        setDummy(newData);
      }
    }
  }, [currentValue]); 

  let results = data.length || dummy.length;

  return (
  <Wrapper>
    <br/>
    <Container className='main-container'>
      <Row className='top-element'> 
        <Col sm={10} className='filters'>
          Filters
        </Col>
        <Col sm={2} className='float-right'>
          {
            dummy.length == 0 && 
            <span>{data.length} results</span>
          }
          {
            dummy.length != 0 && 
            <span>{dummy.length} results</span>
          }
          <form>
            <select 
                onChange={(event) => changeValue(event.target.value)}
                value={currentValue}
              >
              <option>All Products</option>
              <option value="lowest">points(lowest)</option>
              <option value="highest">points(highest)</option>
              <option value="a - z">a - z</option>
              <option value="z - a">z - a</option>
            </select>
          </form>
        </Col>
      </Row>
      <Row> 
        <Col md={2} className='style-none'>
          <div className='radio'>
            <hr/>
            <h6>Price</h6>
            <label>
                <input type="radio" name="radio" value="Any Price" onChange={(e) => setSortType(e.target.value)} />
                Any Price
            </label>
            <label>
                <input type="radio" name="radio" value="Filter by my balance" onChange={(e) => setSortType(e.target.value)} />
                Filter by my balance
            </label>
            <label>
                <input type="radio" name="radio" value="price range" onChange={(e) => setSortType(e.target.value)} />
                price range
            </label>
          </div>
          <Box sx={{ width: 120 }} className={ sliderShow ?  'show' : 'hide'}>
            <Slider
              value={value}
              onChange={handleChange}
              min={0}
              max={5000}
              marks={marks}
              valueLabelDisplay="auto"
            />
          </Box>
        <hr/>
        <div>
            <Filter />
            </div>
        </Col>
        <Col md={10} >
          <Row>
            { props.name == undefined && 
                state == "" && 
                data.map(
                    (object, index) => 
                    <Col sm={4} key={index}>
                        <Carder data={object}/>
                    </Col>
                )    
            } 
            { props.name == undefined && 
                dummy.length != 0 && 
                dummy.map(
                    (object, index) => 
                    <Col sm={4} key={index}>
                        <Carder data={object}/>
                    </Col>
                )     
            } 
            
            { props &&
                state == ""  &&
                data.filter(object => object.Category === `${props.name}`).map(
                    (filteredobject, index) => 
                    <Col sm={4} key={index}>
                        <Carder data={filteredobject}/>
                    </Col>
                )    
            } 
            { props &&
                dummy.length !== 0 && 
                dummy.filter(object => object.Category === `${props.name}`).map(
                    (filteredobject, index) => 
                    <Col sm={4} key={index}>
                        <Carder data={filteredobject}/>
                    </Col>
                )     
            }
          </Row>            
        </Col>
      </Row>     
    </Container>
  </Wrapper>
  )}

const Wrapper = styled.section`
  .radio{
    font-size: 12px;
    margin-bottom: 12px;
  }
  .hide{
    display : none;
  }
  .show{
    display : block;
  }
  hr{
    margin-top : 0px;
  }
  .filters{
    font-size : 12px;
    font-weight : bold;
    margin-top : 10px;
  }
  .float-right{
    margin-bottom : 10px; 
  }
  @media screen and (max-width: 768px) {
    .style-none,
    .filters{
      display : none;
    }
    form{
      float : right;
    }
    .top-element{
      margin-top : 50px;
    }
    .float-right{
      margin-bottom : 30px; 
    }
  }
  @media screen and (min-width: 768px) {
    .main-container{
      width: 900px;
    }
  }
`;

export default Product;
