import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { shareLead, } from "../../redux/action/lead";
import { getEmployees } from "../../redux/action/user";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Slide,
} from "@mui/material";
import { PiXLight } from "react-icons/pi";
import { Loader } from "../../utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ShiftLead = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { currentLead, isFetching } = useSelector((state) => state.lead);
  const { employees } = useSelector((state) => state.user);
  const employeeNames = employees
  .filter((employee) => employee.username != null && employee.username != undefined)
  .filter((employee) => {
    return currentLead?.allocatedTo.every((allocatedTo) => allocatedTo._id != employee._id);
  })
  .map(({ _id, username }) => ({ _id, username }));


  const [shareWith, setShareWith] = useState('');

  useEffect(() => {
    if (employees.length === 0) {
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(shareLead(currentLead?._id, shareWith));
    setOpen(false);
    setShareWith("")
  };
  const handleChange = (e) => {
    setShareWith(e.target.value);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        fullWidth="xs"
        maxWidth="xs"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-xl text-sky-400 font-primary">Share Lead</div>
          <div className="cursor-pointer" onClick={() => setOpen(false)}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        {isFetching ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <DialogContent>
            <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
              <table className="w-full">
                <tr>
                  <td className="pb-4 text-lg">Share with</td>
                  <td className="pb-4 w-64">
                    <Select name='allocatedTo' value={shareWith} onChange={handleChange} type="text" size="small" fullWidth>
                      {employeeNames.map((employee, index) => (
                        <MenuItem value={employee?._id} key={index}>
                          {employee?.username}
                        </MenuItem>
                      ))}
                    </Select>
                  </td>
                </tr>
              </table>
            </div>
          </DialogContent>
        )}
        <DialogActions>
          <button
            onClick={() => setOpen(false)}
            variant="contained"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? "Saving" : "Save"}
          </button>
        </DialogActions>
      </Dialog>
    </div>





  );
};

export default ShiftLead;
