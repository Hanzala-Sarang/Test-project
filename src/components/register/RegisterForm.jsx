// src/RegisterForm.js
import { useState } from "react";
import "./RegisterForm.css"; // Import your CSS for styling
import { useFirebase } from "../../firebase/FirebaseProvider";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Handle form submission logic here
    const newUser = await firebase.signupUserWithEmailAndPassword(
      formData.email,
      formData.password
    );

    await firebase.setUserData(formData);

    if (newUser) {
      console.log("User registered successfully!");
      navigate("/users");
    } else {
      console.error("Error registering user");
      // Add your own logic to handle registration error
    }
  };

  return (
    <div className="register-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
