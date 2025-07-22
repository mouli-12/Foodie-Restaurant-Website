import React, { useState } from 'react';
import { Container } from '@mui/material';
import Navbar from '../Global/Navbar';
import RestaurantList from '../user/RestaurantList';
import ItemList from '../user/ItemList';
import Cart from '../user/Cart';
import OrderHistory from '../user/OrderHistory';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify'; // ⬅️ Add this at the top


const UserPanel = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const { user } = useAuth(); // Get logged-in user
  const emailId = user?.email; // Use from context

  const addToCart = (item) => {
    toast.success('Item Added to Cart Successfuly');
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const placeOrder = (items) => {
  if (!selectedRestaurant) {
    alert("Please select a restaurant before placing an order.");
    return;
  }
console.log('Items:', items);
items.forEach((item, index) => {
  console.log(`Item ${index + 1}: Price = ${item.itemPrice}, Quantity = ${item.quantity}`);
});

const totalAmount = items.reduce((sum, item) => {
  const price = parseFloat(item.itemPrice);
  const quantity = parseInt(item.quantity);

  const subtotal = (isNaN(price) ? 0 : price) * (isNaN(quantity) ? 1 : quantity);
  console.log(`Price: ${price}, Quantity: ${quantity}, Subtotal: ${subtotal}`);

  return sum + subtotal;
}, 0);

console.log('Total Amount:', totalAmount);


  const order = {
    emailId,
    restaurantId: selectedRestaurant.resid,
    restaurantName: selectedRestaurant.restaurantName,
    items: items.map(item => ({
      itemId: item.itemId,
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      quantity: item.quantity,
      itemImage: item.itemImage,
    })),
totalAmount: items.reduce((sum, item) => {
  const price = parseFloat(item.itemPrice) || 0;
  const qty = parseInt(item.quantity) || 1;
  return sum + price * qty;
}, 0),

    status: 'PENDING',
  };

  axios.post('http://localhost:9090/api/orders/place', order)
    .then(response => {
      const razorpayOrder = response.data;
      const options = {
        key: 'rzp_test_1DP5mmOlF5G5ag',
        amount: order.totalAmount * 100,
        currency: 'INR',
        name: 'Royal Restaurants',
        description: 'Order Payment',
        handler: function (response) {
          // After successful payment
          axios.put(`http://localhost:9090/api/orders/${razorpayOrder.orderId}/status`, null, {
            params: { status: 'SUCCESS' }
          })
          .then(() => {
            alert('Payment Successful & Order Placed!');
            // ✅ Remove ordered items from cart
            setCartItems(prev =>
              prev.filter(cartItem =>
                !items.some(orderedItem => orderedItem.itemId === cartItem.itemId)
              )
            );
          })
          .catch(err => console.error('Status update error:', err));
        },
        prefill: {
          email: emailId,
        },
        theme: {
          color: '#1976d2',
        },
        modal: {
    ondismiss: function () {
      // User closed the Razorpay popup without completing payment
      axios.put(`http://localhost:9090/api/orders/${razorpayOrder.orderId}/status`, null, {
        params: { status: 'FAILED' }
      })
      .then(() => {
        toast.error('Payment was not completed. Order marked as FAILED.');
      })
      .catch(err => console.error('Failed status update error:', err));
    }
  }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    })
    .catch(err => console.error('Order placement error:', err));
};


  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return (
          selectedRestaurant ? (
            <ItemList
              restaurant={selectedRestaurant}
              addToCart={addToCart}
              goBack={() => setSelectedRestaurant(null)}
            />
          ) : (
            <RestaurantList onSelectRestaurant={setSelectedRestaurant} />
          )
        );
      case 1:
        return (
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            placeOrder={placeOrder}
          />
        );
      case 2:
        return <OrderHistory emailId={emailId} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Container sx={{ mt: 3 }}>
        {renderTabContent()}
      </Container>
    </>
  );
};

export default UserPanel;
