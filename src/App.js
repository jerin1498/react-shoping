import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import { Route, Switch, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions.js';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors.js';
import CheckoutPage from './pages/checkout/checkout.component.jsx';


class App extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          // this.setState({
          //   currentUser: {
          //     id: snapShot.id,
          //     ...snapShot.data()
          //   }
          // })
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      } else {
        // this.setState({currentUser: userAuth})
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() => (
            this.props.currentUser ? 
              (<Redirect to='/' />) :
              (<SignInAndSignUpPage/>)
          )} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector(
  {
    currentUser: selectCurrentUser
  }
)

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
})


export default connect(mapStateToProps, mapDispatchToProps)(App);


