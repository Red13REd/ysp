import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 18px 25px;
  gap: 10px;

  width: ${props => props.width ? props.width : '156px'};
  height: 50px;

  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  color: #FFFFFF;

  background: #0086A8;
  border-radius: 8px;
  border: none;

  &:hover {
    background: #007693;
  }

  &:active {
    background: #00657E;
  }

  &:disabled {
    background: #E3E3E3;
  }

  flex: none;
  order: 0;
  flex-grow: 0;

`