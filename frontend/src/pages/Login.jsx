import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();
  
  const submitValue = (event) => {
    axios.post('http://127.0.0.1:4000/login', { email, password })
      .then(res => {
        if (res.data.flag === 1) {
          localStorage.setItem('is_login', true);
          localStorage.setItem('userid', res.data.mydata._id);
          localStorage.setItem('username', res.data.mydata.name);

          navigate('/');
        } else {
          alert('Login Failed');
        }
      })
      .catch(err => console.log(err));
    event.preventDefault();
  }

  const [elementStyle, setElementStyle] = useState({
    backgroundColor: 'blue',
    color: 'white',
  });

  const changeElementStyle = () => {
    // Change the CSS properties in response to an event or logic
    if (JSON.parse(localStorage.getItem('is_login')) == true) {
      alert('ogin');
      setElementStyle({
        backgroundColor: 'white',
        color: 'white',
      });
    }

  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={submitValue}>
              <div class="my-3">
                <label for="display-4">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit" onClick={changeElementStyle}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
