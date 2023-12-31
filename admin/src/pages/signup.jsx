import React, { useState } from "react";
import { useFirebase } from "./context";
import { useNavigate } from "react-router-dom";
import "./signup.css"; 

const SignupPage = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    password: "",
  });

  // send data to firebase
  const handleSubmit = async (event) => {
    event.preventDefault();
    // useFirebase to create user
    const userCredential = await firebase.createUser(
      formData.email,
      formData.password
    );
    console.log(userCredential);
    if (userCredential) {
      navigate("/login");
    }

    // also update user's info to realtime database
    const userData = {
      firstName: formData.name,
      lastName: formData.lastname,
      username: formData.username,
      email: formData.email,
    };
    // realtimeDb
    const storeUser = await firebase.storeInfo(userCredential, userData);
    console.log(storeUser);

    // reset the values after updating the Database
    setFormData({
      name: "",
      username: "",
      lastname: "",
      email: "",
      mobilenumber: "",
      password: "",
    });
  };

  // handle onchange function
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  return (

    <div className="signcont container">
      <h1>Sign Up</h1>

      <form id="signup-form">
        <div className="form-group">
          <input
            placeholder="Firstname"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            placeholder="Lastname"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Telephone"
            type="tel"
            name="mobilenumber"
            value={formData.mobilenumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            required
          />  
        </div>
        <button onClick={handleSubmit} type="submit">Sign Up</button>
        <button onClick={firebase.signupWithGoogle}> Sign in with google</button>
       {/* <button className="google" > Sign IN with Google</button> */}
      </form>
    </div>
  );
};
export default SignupPage;
