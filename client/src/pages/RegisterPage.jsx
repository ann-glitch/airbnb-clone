import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import axios from "axios";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  //handle user input
  const handleUserInput = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/auth/register", userData);
      setUser(response.data);
      if (response.status === 201) {
        setRedirect(true);
      }
    } catch (err) {
      console.log(err);
      alert("Error registering. Please ensure your passwords match.");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4 n">Register Page</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Mary Ann"
            id="name"
            value={userData.name}
            onChange={handleUserInput}
          />
          <input
            type="email"
            placeholder="your@email.com"
            id="email"
            value={userData.email}
            onChange={handleUserInput}
          />
          <input
            type="password"
            placeholder="password..."
            autoComplete="true"
            id="password"
            value={userData.password}
            onChange={handleUserInput}
          />
          <input
            type="password"
            placeholder="confirm password..."
            autoComplete="true"
            id="password2"
            value={userData.password2}
            onChange={handleUserInput}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link to={"/login"} className="underline text-black">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
