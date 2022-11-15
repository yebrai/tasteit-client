import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

// Antd
import { Button } from "antd";
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

// React icon
import { AiOutlinePoweroff } from "react-icons/ai";

import AddFoodModal from "./AddFoodModal";


function Navbar() {

  const { authenticateUser, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate()

  // Log Out
  const handleLogout = () => {
    localStorage.removeItem("authToken");

    // Invoke validate token function
    authenticateUser();

    // Redirect to Home
    navigate("/")
  };

  return (
    <div className="navbar-container-main">
    <div  className="navbar-container" >
      <Link className="home-icon" to="/">
      <HomeOutlined/>
      </Link>

      {isLoggedIn ? (
        <div className="loged-icons-container">
          {/* Add product */}
          <Link className="home-icon" to="/profile">
            <UserOutlined/>
          </Link>
          <AddFoodModal/>
          {/* Log Out */}
          <Button type="text" icon={<AiOutlinePoweroff size="1.5rem"/>} onClick={handleLogout}></Button>
        </div>
      ) : (
        <div>
          <LoginModal />
          <SignupModal />
        </div>
      )}
      
    </div>
    </div>
  );
}

export default Navbar;
