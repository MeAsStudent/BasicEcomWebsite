import React , {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";

const Filter = () => {
  
  let navigate = useNavigate(); 
  const [data, setdata] = useState([])

  useEffect(() => {
    async function fetchdata(){
    let response=await axios.get("http://localhost:8000/AllCategories")
    setdata(response.data);
    }
    fetchdata();
  },[])

  return (
    <Wrapper>
      {
        data.map(
        (object, index) => 
          <div key={index}>
            <p onClick={ ()=> navigate(`/${object}`)}>{object}</p>
          </div>
        )
      } 
    </Wrapper>
  )
}

const Wrapper = styled.section`
 
`;

export default Filter;