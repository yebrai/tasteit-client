/* import { useContext } from "react";
import { AuthContext } from "../context/auth.context"; */
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

// Antd
import { Button } from "antd";
import { PoweroffOutlined } from '@ant-design/icons';

// React icon
import { AiFillHome } from "react-icons/ai";

function Navbar() {

  //const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate()

  // Log Out
  const handleLogout = () => {
    localStorage.removeItem("authToken");

    // Invoke validate token function
    //authenticateUser();

    // Redirect to Home
    navigate("/")
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        margin: "0px 0px",
        backgroundColor:"grey"
      }}
    >
      <Link to="/">
        <AiFillHome style={{ color: "black", fontSize: "1.5rem", margin:"0 60px" }} />
      </Link>

      <div  style={{
        display: "flex",
        gap:"25px",
        margin:"0 20px"
      }}>
        <LoginModal />
        <SignupModal />
        <Button icon={<PoweroffOutlined />} onClick={handleLogout}></Button>
      </div>
    </div>
  );
}

export default Navbar;
