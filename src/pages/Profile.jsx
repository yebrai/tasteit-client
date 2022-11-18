import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserService } from "../services/tasteit.services";
import EditProfileModal from "../components/EditProfileModal";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Profile() {
  const navigate = useNavigate();

  const { loadingSpinner } = useContext(AuthContext);

  // Current user configuration
  const [user, setUser] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  // User details
  const getUser = async () => {
    try {
      const response = await getUserService();
      setUser(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching) {
    return loadingSpinner();
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-details">
          <img
            src={user.profileImage}
            alt={user.name}
            className="profile-photo"
          />
          <div className="profile-personal-details">
            <h1>Mi Perfil</h1>
            <h3>
              <span>Nombre:</span> {user.name}
            </h3>
            <div className="profile-divider"></div>
            <h3>
              <span>Correo electrónico:</span> {user.email}
            </h3>
            <div className="profile-divider"></div>
            <h3>
              Edad: <span>{user.age}</span>
            </h3>
            <div className="profile-divider"></div>
            <h3>Tipo: {user.role}</h3>
          </div>
        </div>
        <div className="profile-buttons">
          <EditProfileModal />
          <Link
            className="main-buttons edit-button profile-btn"
            to="/purchases"
          >
            Historial de compras
          </Link>
          <Link
            className="main-buttons edit-button profile-btn"
            to="/my-favourites"
          >
            Mis favoritos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
