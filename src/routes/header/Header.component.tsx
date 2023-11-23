import { NavLink } from 'react-router-dom'

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'

const Header = () => {
    return (
        <NavLink 
            to='/'
        >
            <CrownLogo/>
        </NavLink>
    )
}

export default Header