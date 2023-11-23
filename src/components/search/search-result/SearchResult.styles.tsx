import styled from "styled-components";
import { Link } from "react-router-dom";

export const SearchResultContainer = styled.div`
    position: absolute;
    top: 55px;
    width: 100%;
    background-color: white;
    z-index: 1;
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid black;
    left: 0;
    display: block;
`

export const ResultLink = styled(Link)`
    text-transform: none;
    display: flex;
    height: 40px;
    align-items: center;
    padding-left: 10px;
    font-weight: bold;

    &:not(:last-child) {
        border-bottom: 1px solid black;
    }

    &:hover {
        background-color: gray;
        cursor: pointer;
    }
`

export const NoResult = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-weight: bold;
`