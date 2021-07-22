import React, { useState } from "react";
import TransactionDataService from "../../services/TransactionService";
import TextField from '@material-ui/core/TextField';


// const data = {
//   consumer: {
//     lastname: "Foo",
//     firstname: "Bart",
//   },
//   billingAddress: {
//     address: "1 rue Bouvier",
//     zipCode: "75011",
//     city: "Paris",
//     country: "France",
//   },
//   cart: list,
//   totalPrice,
//   currency: "EUR",
//   shippingAddress: {
//     address: "1 rue Bouvier",
//     zipCode: "75011",
//     city: "Paris",
//     country: "France",
//   },
// };

const AddTransaction = () => {
  const initialTransactionState = {
    id: null,
    customer:{
      lastName: "",
      firstName: "",
    },
    billingAddress: {
          address: "",
          zipCode: "",
          city: "",
          country: "",
    },
    cart: [],
    totalPrice:0,
    currency: "",
    shippingAddress: {
          address: "",
          zipCode: "",
          city: "",
          country: "",
    }
  };
  const [Transaction, setTransaction] = useState(initialTransactionState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTransaction({ ...Transaction, [name]: value });
  };

  const saveTransaction = () => {
    var data = {
      customer:{
        lastName: Transaction.lastName,
        firstName: Transaction.firstName,
      },
      billingAddress: {
            address: Transaction.address,
            zipCode: Transaction.zipCode,
            city: Transaction.city,
            country: Transaction.country,
      },
      cart: Transaction.cart,
      totalPrice: Transaction.totalPrice,
      currency: Transaction.currency,
      shippingAddress: {
            address: Transaction.address,
            zipCode: Transaction.zipCode,
            city: Transaction.city,
            country: Transaction.country,
      }
    };

    TransactionDataService.create(data)
      .then(response => {
        setTransaction({
          id: response.data._id,
          customer:{
            lastName: response.data.customer.lastName,
            firstName: response.data.customer.firstName,
          },
          billingAddress: {
                address: response.data.billingAddress.address,
                zipCode: response.data.billingAddress.zipCode,
                city: response.data.billingAddress.city,
                country: response.data.billingAddress.country,
          },
          cart: response.data.cart,
          totalPrice:response.data.totalPrice,
          currency: response.data.currency,
          shippingAddress: {
                address: response.data.shippingAddress.currency,
                zipCode: response.data.shippingAddress.zipCode,
                city: response.data.shippingAddress.city,
                country: response.data.shippingAddress.country,
          }
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTransaction = () => {
    setTransaction(initialTransactionState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTransaction}>
            Add
          </button>
        </div>
      ) : (
          
        <div>
            <h3>Add New Tansaction</h3>
         <br/>
         <TextField
          fullWidth
          id="firstName" 
          name="firstName" 
          value={Transaction.firstName} 
          onChange={handleInputChange}
          label="First Name"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <TextField
          fullWidth
          id="lastName" 
          name="lastName" 
          value={Transaction.lastName} 
          onChange={handleInputChange}
          label="Last Name"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
        <br/>
        <TextField
          fullWidth
          id="address" 
          name="address" 
          value={Transaction.address} 
          onChange={handleInputChange}
          label="Address"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
        <br/>
        <TextField
          fullWidth
          id="zipCode" 
          name="zipCode" 
          value={Transaction.zipCode} 
          onChange={handleInputChange}
          label="Zip Code"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
        <br/>
        <TextField
          fullWidth
          id="city" 
          name="city" 
          value={Transaction.city} 
          onChange={handleInputChange}
          label="City"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
        <br/>
        <TextField
          fullWidth
          id="country" 
          name="country" 
          value={Transaction.country} 
          onChange={handleInputChange}
          label="Country"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
        <br/>
         <TextField
         fullWidth
          id="totalPrice" 
          name="totalPrice"
          value={Transaction.totalPrice} 
          onChange={handleInputChange}
          label="Total Price"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <br/>
        <br/>
         <TextField
         fullWidth
          id="currency" 
          name="currency"
          value={Transaction.currency}
          onChange={handleInputChange}
          label="Currency"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
        <br/>
          <button onClick={saveTransaction} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;