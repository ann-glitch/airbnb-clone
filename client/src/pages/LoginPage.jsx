import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import axios from "axios";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
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
      const response = await axios.post("/api/v1/auth/login", userData);
      setUser(response.data);
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (err) {
      console.log(err);
      alert("Error logging in");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64" onSubmit={handleSubmit}>
        <h1 className="text-4xl text-center mb-4 n">Login Page</h1>
        <form className="max-w-md mx-auto">
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
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link to={"/register"} className="underline text-black">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
