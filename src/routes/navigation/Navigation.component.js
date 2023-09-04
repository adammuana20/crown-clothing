import { useContext } from "react"
import { NavLink, Outlet } from "react-router-dom"

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { UserContext } from "../../contexts/User.context"

import { signOutUser } from "../../utils/firebase/Firebase.utils"

import './Navigation.styles.scss'

const Navigation = () => {
    const { currentUser } = useContext(UserContext)

    return (
        <>
            <nav className='navigation'>
                <NavLink 
                    to='/'
                    className='logo-container'
                >
                    <CrownLogo className='logo' />
                </NavLink>
                <div className='nav-links-container'>
                    <NavLink 
                            to='shop'
                            className='nav-link'
                    >
                        Shop
                    </NavLink>
                    <NavLink 
                        to='contact' 
                        className='nav-link' 
                    >
                    Contact
                    </NavLink>
                    {
                        currentUser ? (
                            <span 
                                className='nav-link' 
                                onClick={signOutUser}
                            >
                                SIGN OUT
                            </span>
                        ) : (
                            <NavLink 
                            to='auth' 
                            className='nav-link' 
                            >
                                Sign In
                            </NavLink>
                        )
                    }

                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navigation