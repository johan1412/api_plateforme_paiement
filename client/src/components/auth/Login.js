import React, { useState } from "react";
import AuthDataService from "../../services/AuthService";
import TextField from '@material-ui/core/TextField';

const Login = () => {
  const initialLoginState = {
    id: null,
    username:"",
    password:""
  };
  const [Login, setLogin] = useState(initialLoginState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setLogin({ ...Login, [name]: value });
  };

  const saveLogin = () => {
    var data = {
        username: Login.username,
        password: Login.password,
    };

    AuthDataService.login(data)
      .then(response => {
        setLogin({
          id: response.data._id,
          username: response.data.username,
          password: response.data.password,
        });
        setSubmitted(true);
        localStorage.setItem('user', response.data._id);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newLogin = () => {
    setLogin(initialLoginState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You logged successfully!</h4>
          <button className="btn btn-success" onClick={newLogin}>
            Logout
          </button>
        </div>
      ) : (
          
        <div>
            <h3 className="mb-5">Sign in</h3>
            <br />
            <br />
            <TextField
                fullWidth
                id="username" 
                name="username" 
                value={Login.username} 
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
                value={Login.password} 
                onChange={handleInputChange}
                label="Password"
                type="password"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        <br/>
        <br/>
          <button onClick={saveLogin} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;