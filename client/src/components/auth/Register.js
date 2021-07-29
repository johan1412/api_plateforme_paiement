import React, { useState } from "react";
import AuthDataService from "../../services/AuthService";
import TextField from '@material-ui/core/TextField';
import { Redirect } from "react-router-dom";

const Register = () => {
  const initialRegisterState = {
    id: null,
    username: "",
    password: "",
    phone: "",
    contact: "",
    societyName: "",
    kbis: "",
    confirmationUrl: "",
    cancelUrl: "",
    currency: "",
  };
  const [Register, setRegister] = useState(initialRegisterState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setRegister({ ...Register, [name]: value });
  };

  const saveRegister = () => {
    var data = {
      username: Register.username,
      password: Register.password,
      phone: Register.phone,
      contact: Register.contact,
      societyName: Register.societyName,
      kbis: Register.kbis,
      confirmationUrl: Register.confirmationUrl,
      cancelUrl: Register.cancelUrl,
      currency: Register.currency,
    };

    AuthDataService.register(data)
      .then(response => {
        setRegister({
          id: response.data.id,
          username: response.data.username,
          password: response.data.password,
          phone: response.data.phone,
          contact: response.data.contact,
          societyName: response.data.societyName,
          kbis: response.data.kbis,
          confirmationUrl: response.data.confirmationUrl,
          cancelUrl: response.data.cancelUrl,
          currency: response.data.currency,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newRegister = () => {
    setRegister(initialRegisterState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <Redirect to="/login" />

        </div>
      ) : (

        <div>
          <h3>Sign Up</h3>
          <br />
          <br />
          <TextField
            fullWidth
            id="username"
            name="username"
            value={Register.username}
            onChange={handleInputChange}
            label="Username"
            type="email"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth
            id="password"
            name="password"
            value={Register.password}
            onChange={handleInputChange}
            label="Password"
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth
            id="phone"
            name="phone"
            value={Register.phone}
            onChange={handleInputChange}
            label="Phone"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth
            id="contact"
            name="contact"
            value={Register.contact}
            onChange={handleInputChange}
            label="Contact"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth
            id="societyName"
            name="societyName"
            value={Register.societyName}
            onChange={handleInputChange}
            label="Society Name"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth
            id="kbis"
            name="kbis"
            value={Register.kbis}
            onChange={handleInputChange}
            label="Kbis"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth
            id="confirmationUrl"
            name="confirmationUrl"
            value={Register.confirmationUrl}
            onChange={handleInputChange}
            label="Confirmation Url"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth
            id="cancelUrl"
            name="cancelUrl"
            value={Register.cancelUrl}
            onChange={handleInputChange}
            label="Cancel Url"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth
            id="currency"
            name="currency"
            value={Register.currency}
            onChange={handleInputChange}
            label="Currency"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <button onClick={saveRegister} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Register;