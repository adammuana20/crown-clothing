import { screen, fireEvent } from "@testing-library/react";
import * as reactRedux from "react-redux"

import Layout from "../Layout.component";
import { renderWithProviders } from "../../../utils/test/Test.utils";
import { signOutStart } from "../../../store/user/User.action";

const mockDispatch = jest.fn()
        
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch
}))

describe('Layout tests', () => {
    test('It should render a Sign in link and not a Sign out if there is no currentUser', () => {
        renderWithProviders(<Layout />, {
            preloadedState: {
                user: {
                    currentUser: null
                }
            }
        })

        const signInLinkElement = screen.getByText(/sign in/i)
        expect(signInLinkElement).toBeInTheDocument()

        const signOutLinkElement = screen.queryByText(/sign out/i)
        expect(signOutLinkElement).toBeNull()
    })

    test('It should render Sign Out and not Sign In link if there is a currentUser', () => {
        renderWithProviders(<Layout />, {
            preloadedState: {
                user: {
                    currentUser: {}
                }
            }
        })

        const signOutLinkElement = screen.getByText(/sign out/i)
        expect(signOutLinkElement).toBeInTheDocument()

        const signInLinkElement = screen.queryByText(/sign in/i)
        expect(signInLinkElement).toBeNull()
    })

    test('It should not render a cart dropdown if isCartOpen is false', () => {
        renderWithProviders(<Layout />, {
            preloadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems: []
                }
            }
        })

        const cartDropdownTextElement = screen.queryByText(/your cart is empty/i)
        expect(cartDropdownTextElement).toBeNull()
    })

    test('It should render a cart dropdown if isCartOpen is true', () => {
        renderWithProviders(<Layout />, {
            preloadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: []
                }
            }
        })

        const cartDropdownTextElement = screen.getByText(/your cart is empty/i)
        expect(cartDropdownTextElement).toBeInTheDocument()
    })

    
    test('It should dispatch signOutStart action when clicking on the sign out link', async () => {

        renderWithProviders(<Layout />, {
            preloadedState: {
                user: {
                    currentUser: {}
                }
            }
        })

        const signOutLinkElement = screen.getByText(/sign out/i)
        expect(signOutLinkElement).toBeInTheDocument()

        await fireEvent.click(signOutLinkElement)
        expect(mockDispatch).toHaveBeenCalled()

        const signOutAction = signOutStart()
        expect(mockDispatch).toHaveBeenCalledWith(signOutAction)

        mockDispatch.mockClear()
    })

})