import { TextField, Divider, Dialog, DialogContent, DialogTitle, Slide, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { updateUser } from "../../redux/action/user";
import { useDispatch, useSelector } from "react-redux";
import {
  PiNotepad,
  PiXLight,
} from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { currentEmployee, isFetching, error } = useSelector((state) => state.user);
  const initialEmployeeState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
  };
  const [employeeData, setEmployeeData] = useState(currentEmployee);
  useEffect(() => {
    setEmployeeData(currentEmployee);
  }, [currentEmployee]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(currentEmployee._id, employeeData, employeeData?.role, () => {
      setEmployeeData(initialEmployeeState);
      setOpen(false);
    }));
  };

  const handleInputChange = (field, value) => {
    setEmployeeData((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      scroll={"paper"}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth="sm"
      maxWidth="sm"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">Edit Employee</div>
        <div className="cursor-pointer" onClick={handleClose}>
          <PiXLight className="text-[25px]" />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
          <div className="text-xl flex justify-start items-center gap-2 font-normal">
            <PiNotepad size={23} />
            <span>Employee Detials</span>
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
                  value={employeeData?.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
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
                  value={employeeData?.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  variant="outlined"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  User Name <span className="text-red-500">*</span>
                </label>
                <TextField
                  size="small"
                  fullWidth
                  value={employeeData?.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  variant="outlined"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Email
                  <span className="text-xs text-gray-500 ml-2">(System Restricted)</span>
                </label>
                <TextField
                  size="small"
                  fullWidth
                  value={employeeData?.email || 'Not provided'}
                  variant="outlined"
                  disabled
                  sx={{
                    '& .MuiInputBase-input': {
                      color: 'rgb(156, 163, 175)',
                      cursor: 'not-allowed'
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgb(249, 250, 251)'
                    }
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <TextField
                  size="small"
                  value={employeeData?.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    handleInputChange("phone", value);
                  }}
                  fullWidth
                  variant="outlined"
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                />
              </div>
              <div className="md:col-span-1"></div>
            </div>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm font-medium">Error: {error}</p>
            </div>
          )}
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
          className="px-6 py-2.5 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-lg hover:bg-green-700 focus:z-10 focus:ring-2 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 tracking-wide">
          {isFetching ? "Updating..." : "Update"}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
