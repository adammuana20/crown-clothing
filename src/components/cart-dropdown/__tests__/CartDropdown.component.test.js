import { screen, fireEvent } from "@testing-library/react";

import CartDropdown from "../CartDropdown.component";
import { renderWithProviders } from "../../../utils/test/Test.utils";

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

describe('Cart Dropdown tests', () => {
    test('It should render Empty message when no products are present', () => {
        renderWithProviders(<CartDropdown />, {
            preloadedState: {
                cart: {
                    cartItems: []
                }
            }
        })

        const emptyMessageElement = screen.getByText(/your cart is empty/i)
        expect(emptyMessageElement).toBeInTheDocument()
    })

    test('It should render items in dropdown if items are present', () => {
        const cartInitialState = [
            { id: 1, name: 'Product A', imageUrl: 'test', price: 10, quantity: 1 },
            { id: 2, name: 'Product B', imageUrl: 'test', price: 10, quantity: 1 }
        ]

        renderWithProviders(<CartDropdown />, {
            preloadedState: {
                cart: {
                    cartItems: cartInitialState
                }
            }
        })

        const emptyMessageElement = screen.queryByText(/your cart is empty/i)
        expect(emptyMessageElement).toBeNull()

        expect(screen.getByText('Product A')).toBeInTheDocument()
        expect(screen.getByText('Product B')).toBeInTheDocument()
    })

    test('Go to checkout button should navigate to checkout page', async () => {
        renderWithProviders(<CartDropdown />, {
            preloadedState: {
                cart: {
                    cartItems: []
                }
            }
        })

        const checkOutButtonElement = screen.getByText(/go to checkout/i)
        expect(checkOutButtonElement).toBeInTheDocument()

        await fireEvent.click(checkOutButtonElement)
        expect(mockNavigate).toHaveBeenCalledWith('checkout')
    })
})