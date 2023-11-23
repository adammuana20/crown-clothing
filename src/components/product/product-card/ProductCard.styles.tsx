import styled from "styled-components";
import { Link } from "react-router-dom";

export const WishlistRibbon = styled.div`
  position: absolute;
  top: -50px;
  right: -50px;
  width: 100px;
  height: 100px;
  z-index: 2;
  background-color: black;
  transform: rotate(45deg);
  display: none;
`

export const ProductCardWrapper = styled.div`
  position: relative;
  overflow: hidden;

  &:hover {
    ${WishlistRibbon} {
      display: flex;
    }
  }
`

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 235px;
    display: none;
  }

  &:hover {
    img {
      opacity: 0.8;
    }

    button {
      opacity: 0.85;
      display: flex;
    }
  }
`

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`

export const Price = styled.span`
  font-weight: bold;
`

export const ProductLink = styled(Link)`
  width: 100%;
  height: 90%;
  margin-bottom: 5px;
`

export const WishlistContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`