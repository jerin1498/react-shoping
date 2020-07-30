import React from 'react';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg.svg';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils.js';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component.jsx';
import CartDropDown from '../cart-dropdown/cart-dropdown.component.jsx';
import { selectCurrentUser } from '../../redux/user/user.selectors.js';
import { selectCartHidden } from '../../redux/cart/cart.selectors.js';
import { createStructuredSelector } from 'reselect';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ? 
                    <div className='option' onClick={() => auth.signOut()}>Sing Out</div>
                    :
                    <Link className='option' to='/signin'>Login</Link>
            }
            <CartIcon />
        </div>
        {
            hidden ? null : <CartDropDown/>
        }
    </div>
)


// const mapStateToProps = (state) => ({ // below code is same as this code this is but using createStructuredSelector()
//     currentUser: selectCurrentUser(state),
//     hidden: selectCartHidden(state)
// })

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);