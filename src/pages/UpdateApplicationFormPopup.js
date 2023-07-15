import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';

const UpdateApplicationFormPopup = ({
  selectedRow,
  closePopup,
  buttonText,
  handleChangeStatusEndpoint,
  dialogueTitle,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    id: selectedRow.id,
    appId: selectedRow.appId,
    custName: selectedRow.custName,
    shortCode: selectedRow.shortCode,
    organizationName: selectedRow.organizationName,
    status: selectedRow.status,
  });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [renewLoading, setRenewLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    closePopup();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setUpdateLoading(true);

    try {
      const response = await axios.post('https://vulkantechnologylabs.com//api/applications/update', formData);
      console.log('Form submitted successfully', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    setUpdateLoading(false);
    handleClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    setDeleteLoading(true);

    try {
      const response = await axios.post('https://vulkantechnologylabs.com//api/delete-application', formData);
      console.log('API response:', response.data);
      handleClose();
    } catch (error) {
      console.error('Error deleting:', error);
    }

    setDeleteLoading(false);
  };

  const handleChangeStatus = async () => {
    setRenewLoading(true);

    try {
      if (handleChangeStatusEndpoint === 'api1') {
        const response = await axios.post('https://vulkantechnologylabs.com//api/change-status', formData);
        console.log('API 1 response:', response.data);
        handleClose();
      } else if (handleChangeStatusEndpoint === 'api2') {
        const response = await axios.post('https://vulkantechnologylabs.com//api/endpoint2', formData);
        console.log('API 2 response:', response.data);
        handleClose();
      }
    } catch (error) {
      console.error('Error changing status:', error);
    }

    setRenewLoading(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{dialogueTitle}</DialogTitle>
      <DialogContent style={{ backgroundColor: '#f5f5f5' }}>
        <form
          style={{ backgroundColor: '#f5f5f5', color: 'black', display: 'flex', flexDirection: 'column' }}
          onSubmit={handleFormSubmit}
        >
          <TextField
            style={{ marginTop: '20px' }}
            label="Application ID"
            name="appId"
            value={formData.appId}
            onChange={handleInputChange}
            fullWidth
            inputProps={{ style: { color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
            margin="normal"
          />
          <TextField
            style={{ marginTop: '20px' }}
            label="Customer Name"
            name="custName"
            value={formData.custName}
            onChange={handleInputChange}
            fullWidth
            inputProps={{ style: { color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
            margin="normal"
          />
          <TextField
            style={{ marginTop: '20px' }}
            label="Organization"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleInputChange}
            fullWidth
            inputProps={{ style: { color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
            margin="normal"
          />
          <TextField
            style={{ marginTop: '20px' }}
            label="Short Code"
            name="shortCode"
            value={formData.shortCode}
            onChange={handleInputChange}
            fullWidth
            inputProps={{ style: { color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
            margin="normal"
          />
          <TextField
            style={{ marginTop: '20px' }}
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            fullWidth
            inputProps={{ style: { color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
            margin="normal"
          />
          <DialogActions style={{ marginTop: '40px', backgroundColor: '#f5f5f5' }}>
            <Button onClick={handleClose} style={{ backgroundColor: 'black', color: 'white' }}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              style={{ backgroundColor: 'red', color: 'white' }}
              disabled={deleteLoading}
            >
              {deleteLoading ? <CircularProgress color="inherit" size={20} /> : 'Delete'}
            </Button>
            <Button
              onClick={handleChangeStatus}
              variant="contained"
              style={{ backgroundColor: 'blue', color: 'white' }}
              disabled={renewLoading}
            >
              {renewLoading ? <CircularProgress color="inherit" size={20} /> : buttonText}
            </Button>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: 'green', color: 'white' }}
              disabled={updateLoading}
            >
              {updateLoading ? <CircularProgress color="inherit" size={20} /> : 'Update'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

UpdateApplicationFormPopup.propTypes = {
  selectedRow: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  handleChangeStatusEndpoint: PropTypes.oneOf(['api1', 'api2']).isRequired,
  dialogueTitle: PropTypes.string.isRequired,
};

export default UpdateApplicationFormPopup;
