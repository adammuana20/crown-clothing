import styled from "styled-components";
import { Link } from "react-router-dom";

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  h2 {
    margin-bottom: 1.5rem;
  }
`

export const Title = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;

  &:hover {
    font-weight: normal;
    text-decoration: underline;
  }
`

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(18rem,1fr));
  gap: 30px 20px;

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`