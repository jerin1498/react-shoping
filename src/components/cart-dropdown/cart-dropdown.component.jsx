import React from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component.jsx';
import CartItem from '../cart-item/cart-item.component.jsx';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors.js';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';


const CartDropDown = ({cartItems, history, dispatch}) => ( // automatically add dispatch into the prop due to connect method
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ?
                    (cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem}/>
                    ))) :
                    (<span className='empty-message'>your cart is empty</span>)
            }
        </div>
        <CustomButton onClick={() => {
            history.push('/checkout')
            dispatch(toggleCartHidden())
        }}>GO TO CHECKOUT</CustomButton>
    </div>
)


// const mapDispatchToProps = dispatch => ({
//     toggleCartHidden: () => dispatch(toggleCartHidden())
// })

const mapStateToProps = createStructuredSelector(
    {
        cartItems: selectCartItems
    }
)

export default withRouter(connect(mapStateToProps)(CartDropDown));