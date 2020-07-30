import React from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component.jsx';
import CartItem from '../cart-item/cart-item.component.jsx';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors.js';
import { createStructuredSelector } from 'reselect';


const CartDropDown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem}/>
                ))
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector(
    {
        cartItems: selectCartItems
    }
)

export default connect(mapStateToProps)(CartDropDown);