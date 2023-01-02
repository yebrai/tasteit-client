import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export const useModalForm = () => {
  //Navigate
  const navigate = useNavigate();

  //formData
  const [Form, setForm] = useState();
  const showFormData = () => Form;
  const setFormData = (data) => setForm(data);
  const { authenticateUser } = useContext(AuthContext);

  //Loading Modal spinner
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showLoading = () => confirmLoading;
  const setLoading = (controller) => setConfirmLoading(controller);

  //Errors
  const [errorMessage, setErrorMessage] = useState("");
  const showErrorMesage = () => errorMessage;
  const handleSetErrorMessage = (error) => setErrorMessage(error);

  //Modal statement
  const [open, setOpen] = useState(false);
  const showModal = () => setOpen(true);
  const isOpen = () => open;
  const handleCancel = () => {
    setOpen(false);
    setErrorMessage("");
  };

  //Get data from form events.target
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...Form, [name]: value });
  };

  //SendData and verify auth
  const handleAuth = async (service) => {
    setLoading(true);
    try {
      // Login user
      const response = await service(Form);
      // Store Token in browser local storage
      localStorage.setItem("authToken", response.data.authToken);
      showModal();
      setLoading(false);
      authenticateUser();
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        handleSetErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return {
    showModal,
    isOpen,
    handleCancel,
    showLoading,
    setLoading,
    showErrorMesage,
    handleSetErrorMessage,
    handleChange,
    showFormData,
    handleAuth,
    setFormData,
  };
};
