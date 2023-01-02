import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export const useModalForm = () => {
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmLoading, setConfirmLoading] = useState(false)
    //formData
    const [Form, setForm] = useState();
    const showFormData = () => Form
    //Navigate
    const navigate = useNavigate();

    const { authenticateUser } = useContext(AuthContext);
  
    const showLoading = () => confirmLoading
    const setLoading = (controller) => setConfirmLoading(controller)
    const showErrorMesage = () =>  errorMessage
    const handleSetErrorMessage = (error) => setErrorMessage(error)
    const showModal = () => setOpen(true)
    const isOpen = () => open
  
    const handleCancel = () => {
      setOpen(false);
      setErrorMessage("");
    };
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      setForm({ ...Form, [name]: value });
    };

    const setFormData = (data) => setForm(data)

    const handleAuth = async (service) => {
        setLoading(true);
        console.log(Form)
        try {
          // Login user
          const response = await service(showFormData());
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
    }
  
    return {
      showModal, isOpen, handleCancel, showLoading, setLoading, showErrorMesage, handleSetErrorMessage, handleChange, showFormData, handleAuth, setFormData
    }
  }