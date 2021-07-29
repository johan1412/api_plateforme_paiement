import React, {useEffect, useState} from "react";
import TransactionDataService from "../../services/MerchandService";
import TextField from '@material-ui/core/TextField';


const AddTransaction = (props) => {
    //let cart =[];
    const initialData = ()=> {

       // cart = props.cartItems.map(product => {
       //      const obj = {name:product.name,unitPrice:product.unitPrice}
       //      return obj;
       //  });

    }
    useEffect(initialData,[]);

  const initialTransactionState = {
    id: null,
    customer:"",
    billingAddress: {
          address: "",
          zipCode: "",
          city: "",
          country: "",
    },
    cart: props.cartItems.map(product => {
        const obj = {name:product.name,unitPrice:product.unitPrice}
        return obj;
    }) ,
    totalPrice:props.totalPrice,
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
      customer:Transaction.customer,
      billingAddress: {
            address: Transaction.address,
            zipCode: Transaction.zipCode,
            city: Transaction.city,
            country: Transaction.country,
      },
      cart: initialTransactionState.cart,
      totalPrice: Transaction.totalPrice,
      currency: Transaction.currency,
      shippingAddress: {
            address: Transaction.address,
            zipCode: Transaction.zipCode,
            city: Transaction.city,
            country: Transaction.country,
      }
    };
    console.log(data);
    TransactionDataService.create(data)
      .then(response => {
        setTransaction({
          id: response.data.id,
          customer:response.data.customer,
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
          
        <div className="ml-5">
            <h3 className="text-center">Add New Tansaction</h3>
            <br/><br />
            <div className="row">
                <div className="col-6">
                    <TextField
                        fullWidth
                        id="customer"
                        name="customer"
                        value={Transaction.customer}
                        onChange={handleInputChange}
                        label="Name"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
            </div>
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
            <div className="row">
                <div className="col-4">
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
                </div>
                <div className="col-8">
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
                </div>
            </div>
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
            <div className="row">
                <div className="col-6">
                    <TextField
                        fullWidth
                        id="totalPrice" 
                        name="totalPrice"
                        value={props.totalPrice}
                        onChange={handleInputChange}
                        label="Total Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="col-6">
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
                </div>
            </div>
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