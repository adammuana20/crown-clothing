import { NavLink, Outlet } from "react-router-dom"

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import './Navigation.styles.scss'

const Navigation = () => {
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
                    <NavLink 
                        to='auth' 
                        className='nav-link' 
                    >
                        Sign In
                    </NavLink>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navigation