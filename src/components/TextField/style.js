
import styled, { css } from 'styled-components';

const Container = styled.div`
border: 1px solid black;
width:100%;
height: 100%;
`;
const Text = styled.div`
font-weight: bold;
`;

const Input = styled.input`
  width:99.6%;
  height: 25px;
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
  height: 25px;
  border: .5px solid grey;-
`};
${(props) => props.value === '101'
    && css`
  width:99.8%;
  background-color: white;
  border: .5px solid red;
  height: 25px
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
