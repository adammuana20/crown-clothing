import styled from "styled-components";
import { Link } from "react-router-dom";

export const WishlistRibbon = styled.div`
  position: absolute;
  top: -50px;
  right: -50px;
  width: 100px;
  height: 100px;
  z-index: 2;
  background-color: hsla(0,0%,100%,.5);
  transform: rotate(45deg);
`

export const ProductCardWrapper = styled.div`
  position: relative;
  overflow: hidden;
  ${WishlistRibbon}
`

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const ProductLink = styled(Link)`
  width: 100%;
  height: 350px;
  margin-bottom: 5px;

  &:hover {
    background-color: var(--background-color);

    img {
      opacity: 0.8;
    }
  }
`

export const Footer = styled.div`
  width: 100%;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  color: var(--color-text-primary);
`

export const Price = styled.span`
  font-weight: bolder;
  color: red;
`

export const WishlistContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`