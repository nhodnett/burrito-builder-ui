import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    console.log('Did mount');
    getOrders().then((data) =>
      this.setState({ orders: data.orders }))
    .catch(err => console.error('Error fetching:', err));
  }

  addOrder = (newOrder) => {
    this.setState({ orders: [...this.state.orders, newOrder] })
  }

  postOrder = (newOrder) => {
    console.log('Did post')
    fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => console.log('36', response))
    .catch(err => console.error('Error fetching:', err))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder} />
        </header>

        <Orders orders={this.state.orders} />
      </main>
    );
  }
}


export default App;
