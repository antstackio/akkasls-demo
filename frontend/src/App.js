import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Catalog from './components/Catalog';
import ItemDetails from './components/ItemDetails';
import Login from './components/Login';
import Cart from './components/Cart';
import Admin from './components/Admin';
import CartItemsTable from './components/CartItemsTable';

const inventory = [
  {
      id: "db-1",
      name: "Large Dog Bed",
      description: "Comfy large dog bed",
      image: "images/db1.png",
      price: 1500.00
  },
  {
      id: "db-2",
      name: "Small Dog Bed",
      description: "Comfy small dog bed",
      image: "images/db2.png",
      price: 1000.00
  },
  {
      id: "db-3",
      name: "Medium Dog Bed",
      description: "Comfy medium dog bed",
      image: "images/db3.png",
      price: 1200.00
  },
  {
      id: "db-4",
      name: "Large Cat Tree",
      description: "Aesthetic Cat tree",
      image: "images/db4.png",
      price: 4000.00
  },
  {
      id: "db-5",
      name: "Medium Cat Bed",
      description: "Comfy medium cat bed",
      image: "images/db5.png",
      price: 1200.00
  },
  {
      id: "db-6",
      name: "Dog food",
      description: "Nutritious doggo food",
      image: "images/db6.png",
      price: 200.00
  },
  {
      id: "db-7",
      name: "Cat food",
      description: "Nutritious catto food",
      image: "images/db7.png",
      price: 200.00
  },
  
  {
      id: "db-8",
      name: "Dog collar",
      description: "Cute doggo collar with bow",
      image: "images/db8.png",
      price: 400.00
  },
  {
      id: "db-9",
      name: "Cat collar",
      description: "Cute catto collar with bow",
      image: "images/db9.png",
      price: 400.00
  },
  {
      id: "db-10",
      name: "Pet carrier",
      description: "Ideal sized pet carrier with vents",
      image: "images/db10.png",
      price: 1400.00
  }
]

// Read enpoints from environment variables
const user_backend = process.env.USER_BACKEND
const cart_backend = process.env.CART_BACKEND

function App() {

  const [user, setUser] = useState();

  const [items, setItems] = useState([]);

  const [cart, setCart] = useState([]);

  const [allusers, setAllusers] = useState([]);

  const passInventory = () => {
    setItems(inventory);
  }

  async function getUser(url='', id='') {
    const response = await fetch(url + '/user/' + id);
    return response.json();
  };


  async function getAllUsers(url=user_backend+'/admin') {
    const admin = fetch(url)
    .then(data => { return data.text() })
    .then(res => {return res})
    .catch(err => { console.log("Error: ", err)});
    
    const response = await admin;
    const users = response.trim();
    const users_array = users.split('\n');
    var users_json = [];
    for (var i = 0; i < users_array.length; i++) {
      users_json[i] = JSON.parse(users_array[i]);
    }
    // console.log(users_json);
    setAllusers(users_json);
  };


  const passAllusers = () => {
    getAllUsers();
  }


  async function addUser(url='', data={}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
  }

  const checkUser = async (new_user) => {
    const request = new_user;
    const user_url = user_backend;
    var response = await getUser(user_url, new_user.id);
    if (response.status === 500) {
      response = await addUser(user_url + '/users/' + new_user.id, request);
      alert("Welcome to the databaseless pet store!");
    }
    else {
      alert("Welcome back to the databaseless pet store!")
    }
    setUser(response);
    localStorage.setItem('user', JSON.stringify(response));
  }

  async function getCartItems(url='', id='') {
    const response = await fetch(url + 'carts/' + id);
    return response.json();
  }

  async function getCart() {
    const cart_url = cart_backend;
    console.log("Get cart of ", user);
    var response = await getCartItems(cart_url, user.id);

    setCart(response.items);
    console.log("Cart", cart);
    // return response;
  }

  async function removeItemFromCart(url='', id) {
    await fetch(url + 'cart/' + user.id + '/items/' + id + '/remove', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    });
  }

  const removeFromCart = async (id) => {
    const cart_url = cart_backend;
    await removeItemFromCart(cart_url, id);

    await getCart();
    // return response;
  }

  async function addItemToCart(url='', data) {
    await fetch(url + 'cart/' + user.id + '/items/add', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
  }

  const addToCart = async (id) => {
    const cart_url = cart_backend;
    const itemFromInventory = items.filter((item) => {
      return item.id === id;
    });
    const data = {
      "userId": user.id,
      "productId": id,
      "name": itemFromInventory[0].name,
      "quantity": 1
    }
    console.log("Adding item to cart", data);
    await addItemToCart(cart_url, data);

    await getCart();
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if(loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  useEffect(() => {
    passInventory();
  }, []);

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  // useEffect(() => {
  //   passAllusers();
  // }, [cart]);

  if(user) {
    return (
      <div className="ui container">
        <Router>
          <Header user={user}/>
          <Switch>
            <Route path="/" exact render={(props) => (
              <Catalog {...props} items={items} addToCart={addToCart}/>
            )}
            />
            <Route path="/item/:id" render={(props) => (
              <ItemDetails {...props} addToCart={addToCart}/>
            )}/>
            <Route path="/cart" render={(props) => (
              <Cart {...props} items={items} cart={cart} user={user} removeFromCart={removeFromCart} addToCart={addToCart}/>
            )}
            />
            <Route path="/eekeekai" exact render={(props) => (
              <Admin {...props} passAllUsers={passAllusers} allUsers={allusers} getCart={getCartItems}/>
            )}
            />
            <Route path="/eekeekai/carts/:id" render={(props) => (
              <CartItemsTable {...props}/>
            )}/>
          </Switch>
        </Router>
      </div>
    );
    
  }

  return (<Login checkUser={checkUser}/>);
  
}

export default App;
