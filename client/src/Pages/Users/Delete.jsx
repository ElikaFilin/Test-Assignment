import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Slide } from '@mui/material'
import React from 'react'
import { deleteUser } from '../../redux/action/user'
import { useDispatch, useSelector } from 'react-redux'
import { PiWarningCircle } from 'react-icons/pi'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DeleteModal = ({ open, setOpen, userId }) => {
  const { isFetching } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false)
  }
  
  const handleDelete = () => {
    dispatch(deleteUser(userId, () => {
      setOpen(false)
    }))
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={!isFetching ? handleClose : undefined}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className="flex items-center gap-3 text-red-600 font-primary">
        <PiWarningCircle className="text-2xl" />
        Confirm Deletion
      </DialogTitle>
      <DialogContent className="py-6">
        <DialogContentText className="text-gray-700 font-primary text-base">
          Are you sure you want to delete this user? This action cannot be undone and will permanently remove all associated data.
        </DialogContentText>
      </DialogContent>
      <DialogActions className="gap-3 p-6">
        <button
          onClick={handleClose}
          disabled={isFetching}
          className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 tracking-wide">
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isFetching}
          className="px-6 py-2.5 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-lg hover:bg-red-700 focus:z-10 focus:ring-2 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 tracking-wide">
          {isFetching ? 'Deleting...' : 'Delete User'}
        </button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteModal