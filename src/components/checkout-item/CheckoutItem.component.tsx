import { useDispatch } from 'react-redux'
import { FC, useState } from 'react'

import ProductInputQuantity from '../product/product-input-quantity/ProductInputQuantity.component'

import { CartItem as TCartItem } from '../../store/cart/Cart.types'

import { CheckoutItemContainer, ImageContainer, BaseSpan, ProductInputContainer, RemoveItem, ProductDetailsContainer, ProductLink } from './CheckoutItem.styles'
import { removeItemFromCartStart, updateQtyItemFromCartStart } from '../../store/cart/Cart.action'
// import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/Cart.action'

type CheckoutItemProps = {
    cartItem: TCartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
    const dispatch = useDispatch()

    const { name, imageUrl, quantity, price, id, category } = cartItem

    const [qty, setQty] = useState<string | number>(quantity)
    const [isUpdating, setIsUpdating] = useState(false)

    const onChangeInput = (value: string | number) => {
        if(Number(value) > 10) {
            console.log('error', 'Ops up to 10 max only');
            setQty(10);
            return
        }
        setQty(value)
    }

    const onChangeBlur = (value: string) => {
        if(!value) {
            setIsUpdating(true)
            setQty(quantity)
            dispatch(updateQtyItemFromCartStart(id, quantity, setIsUpdating))
            return
        } else if(Number(value) === 0) {
            setIsUpdating(true)
            setQty(quantity)
            dispatch(updateQtyItemFromCartStart(id, quantity, setIsUpdating))
            return
        }

        setIsUpdating(true)
        dispatch(updateQtyItemFromCartStart(id, Number(qty), setIsUpdating))
    }

    const addQtyHandler = () => {
        const newQuantity = Number(qty) + 1

        if(Number(qty) >= 10) {
            console.log('error', 'Ops up to 10 max only');
            setQty(10);
            return
        }

        setIsUpdating(true)
        dispatch(updateQtyItemFromCartStart(id, newQuantity, setIsUpdating))
        setQty(newQuantity);
    }

    const decQtyHandler = () => {
        const newQuantity = Number(qty) - 1

        if(Number(qty) <= 1) {
            console.log('error', 'Ops up to 1 minimum only');
            setQty(1);
            return
        }

        setIsUpdating(true)
        dispatch(updateQtyItemFromCartStart(id, newQuantity, setIsUpdating))
        setQty(newQuantity);
    }
    
    const clearItemHandler = () => {
        dispatch(removeItemFromCartStart(id))
    }

    return (
        <CheckoutItemContainer $isUpdating={isUpdating}>
            <ImageContainer>
                <ProductLink to={`/shop/${category}/${id}`}>
                    <img src={imageUrl} alt={name} />
                </ProductLink>
            </ImageContainer>
            <ProductDetailsContainer>
                <ProductLink to={`/shop/${category}/${id}`}>
                    {name}
                </ProductLink>
                <ProductInputContainer>
                    <ProductInputQuantity value={qty} onChangeQty={onChangeInput} onChangeBlur={onChangeBlur} addQtyHandler={addQtyHandler} decQtyHandler={decQtyHandler} />
                </ProductInputContainer>
                <BaseSpan>${price}</BaseSpan>
                <BaseSpan>${quantity * price}</BaseSpan>
                <RemoveItem onClick={clearItemHandler}>&#10005;</RemoveItem>
            </ProductDetailsContainer>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem