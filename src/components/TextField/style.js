
import styled, { css } from 'styled-components';

const Container = styled.div`
width: 100%;
padding: 12px 20px;
margin: 8px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;

`;
const Text = styled.div`
font-weight: bold;
`;

const Input = styled.input`
  ${(props) => props.value === 'Disabled input'
  && css`
    width:99.6%;
    background-color: lightgrey;
    height: 25px;
`};
${(props) => props.value === 'Accessible'
&& css`
  width:99.8%;
  background-color: white;
  height: 100px;
  border: .5px solid grey;-
`};
${(props) => props.value === '101'
&& css`
  width:99.8%;
  background-color: white;
  border: .5px solid red;
  height: 25px
`};
${(props) => props.type === 'text'
&& css`
  width:99.8%;
  background-color: white;
  height: 30px;
  border-radius: 5px;
  border: .5px solid grey;-
`};
`;
const P = styled.div`
margin-top: 4px;
margin-bottom: 2%;
color: red;
`;

export {
  Input, Container, Text, P,
};
