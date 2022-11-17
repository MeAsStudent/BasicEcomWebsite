import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BsHeartFill } from 'react-icons/bs';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

const Carder = ({data}) => {
  
  let navigate = useNavigate(); 
  const [likeIcon, setlikeIcon] = useState(false)
  
  return (
    <Wrapper> 
     <Card className="mb-3">
        <span className={likeIcon ? "redheart heart" : "whiteheart heart"} onClick={ () =>
        {
          { likeIcon == false &&
          setlikeIcon(true)
          }
          { likeIcon != false &&
            setlikeIcon(false)
          }
        }
        }>
          <BsHeartFill />
        </span>
        <Card.Body onClick={ () => {navigate(`/singleproduct/${data.id}`);}  }>
          <img src={data.Img} alt={data.Name} width="100" height="100" /><br/>
          <Card.Title className="text-center">{data.Name}</Card.Title>
          <Card.Text className="text-center">
          {data.Description}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <label>{data.points} points</label>
        </Card.Footer> 
     </Card> 
    </Wrapper>
  )}

const Wrapper = styled.section` 
  p{
    text-align : center;
    height : 38px;
  }
  label{
    color: blue;
    font-weight: bold;
  }
  img{
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .whiteheart{
    color : #c2c2c2;
    float: right;
  }
  .redheart{
    color : red;
    float: right;
  }
  .heart{
    margin-left: auto;
    margin-right: 10px;
  }
`;

export default Carder;
