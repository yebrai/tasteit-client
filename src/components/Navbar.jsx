import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

import { AiFillHome } from "react-icons/ai";

function Navbar() {
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
      </div>
    </div>
  );
}

export default Navbar;
