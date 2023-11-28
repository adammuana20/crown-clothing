import styled from "styled-components";

export const DirectoryContainer = styled.div`

`

export const CategoriesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1250px;
    margin: 3rem auto;
`

export const CategoriesContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export const ProductsWrapper = styled.div`
    display: flex;
    max-width: 1250px;
    margin: 0 auto;
    flex-direction: column;
`

export const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;
`