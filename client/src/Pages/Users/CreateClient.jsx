import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../../redux/action/user";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateClient = ({ open, setOpen, scroll }) => {
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialClientState = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    email: "",
  }
  const [clientData, setClientData] = useState(initialClientState);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, username, phone } = clientData
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!username) newErrors.username = "Username is required";
    if (!phone) newErrors.phone = "Phone is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({
      email: "",
      password: "",
      username: "",
      phone: "",
    });
    
    dispatch(createClient(clientData, () => {
      setClientData(initialClientState);
      setOpen(false);
    }));
  };

  const handleChange = (field, value) => {
    setClientData((prevFilters) => ({ ...prevFilters, [field]: value, }));
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
  };

  const handleBlur = (field) => {
    const value = clientData[field];
    let errorMessage = "";
    
    switch (field) {
      case "email":
        if (!value) errorMessage = "Email is required";
        break;
      case "password":
        if (!value) errorMessage = "Password is required";
        break;
      case "username":
        if (!value) errorMessage = "Username is required";
        break;
      case "phone":
        if (!value) errorMessage = "Phone is required";
        break;
    }
    
    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
  };

  const handleClose = () => {
    setOpen(false);
    setClientData(initialClientState);
    setErrors({
      email: "",
      password: "",
      username: "",
      phone: "",
    });
  };

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Client</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Client Details</span>
            </div>
            <Divider />
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Optional"
                    value={clientData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    variant="outlined"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Optional"
                    value={clientData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    variant="outlined"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    size="small"
                    fullWidth
                    value={clientData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    onBlur={() => handleBlur('username')}
                    error={!!errors.username}
                    helperText={errors.username}
                    variant="outlined"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    size="small"
                    fullWidth
                    value={clientData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    error={!!errors.email}
                    helperText={errors.email}
                    variant="outlined"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    type="password"
                    value={clientData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onBlur={() => handleBlur('password')}
                    size="small"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password}
                    variant="outlined"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <TextField
                    size="small"
                    value={clientData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      handleChange("phone", value);
                    }}
                    onBlur={() => handleBlur('phone')}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    fullWidth
                    variant="outlined"
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="gap-3 p-6">
          <button
            onClick={handleClose}
            type="button"
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-gray-300 transition-all duration-200 tracking-wide">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            disabled={isFetching}
            className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 tracking-wide">
            {isFetching ? 'Submitting...' : 'Add Client'}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateClient;