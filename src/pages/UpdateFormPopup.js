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

const UpdateFormPopup = ({
  selectedRow,
  closePopup,
  buttonText2,
  buttonText,
  handleChangeStatusEndpoint,
  dialogueTitle
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    id: selectedRow.id,
    appId: selectedRow.appId,
    custName: selectedRow.custName,
    shortCode: selectedRow.shortCode,
    expiryDate: selectedRow.expiryDate,
    licenseStatus: selectedRow.licenseStatus,
  });
  const [deleteLoading, setDeleteLoading] = useState(false); // Delete loading state
  const [renewLoading, setRenewLoading] = useState(false); // Renew loading state
  const [updateLoading, setUpdateLoading] = useState(false); // Update loading state
  const [ApproveLoading, setApproveLoading]=useState(false);

  const handleClose = () => {
    setIsOpen(false);
    closePopup();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setUpdateLoading(true); // Set update loading state to true

    try {
      const response = await axios.post('https://vulkantechnologylabs.com/api/licenses/update', formData);
      console.log('Form submitted successfully', response.data);
      // Optionally, you can show a success message or perform any other actions here
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally, you can show an error message or perform any other error handling here
    }

    setUpdateLoading(false); // Set update loading state to false
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
    setDeleteLoading(true); // Set delete loading state to true

    try {
      // Perform the delete operation here
      const response = await axios.post('https://vulkantechnologylabs.com/api/delete-application', formData);
      console.log('API 1 response:', response.data);
      handleClose(); // Close the dialog box when delete action is completed
    } catch (error) {
      console.error('Error deleting:', error);
    }

    setDeleteLoading(false); // Set delete loading state to false
  };

  const handleChangeStatus = async () => {
    setRenewLoading(true); // Set renew loading state to true

    try {
      // Perform the change status operation based on the chosen endpoint
      if (handleChangeStatusEndpoint === 'api1') {
        const response = await axios.post('https://vulkantechnologylabs.com/api/change-status', formData);
        console.log('API 1 response:', response.data);
        handleClose(); // Close the dialog box when renew action is completed
      } else if (handleChangeStatusEndpoint === 'api2') {
        const response = await axios.post('https://vulkantechnologylabs.com/api/shortcode/setexpiry', formData);
        console.log('API 2 response:', response.data);
        handleClose(); // Close the dialog box when renew action is completed
      }
    } catch (error) {
      console.error('Error changing status:', error);
    }

    setRenewLoading(false); // Set renew loading state to false
  };

  const handleRenewApprove = async () => {
    setApproveLoading(true); // Set renew loading state to true

    try {
      // Perform the change status operation based on the chosen endpoint
      if (handleChangeStatusEndpoint === 'api1') {
        const response = await axios.post('https://vulkantechnologylabs.com/api/licenserenewalapproved', formData);
        console.log('API 1 response:', response.data);
        handleClose(); // Close the dialog box when renew action is completed
      } else if (handleChangeStatusEndpoint === 'api2') {
        const response = await axios.post('https://vulkantechnologylabs.com/api/shortcode/setexpiry', formData);
        console.log('API 2 response:', response.data);
        handleClose(); // Close the dialog box when renew action is completed
      }
    } catch (error) {
      console.error('Error changing status:', error);
    }

    setApproveLoading(false); // Set renew loading state to false
  };





  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{dialogueTitle}</DialogTitle>
      <DialogContent style={{ backgroundColor: '#f5f5f5' }}>
        {/* Render the form fields here */}
        <form style={{ backgroundColor: '#f5f5f5', color: 'black' }} onSubmit={handleFormSubmit}>
          <TextField
            style={{ marginTop: '20px' }}
            label="Application ID"
            name="appId"
            value={formData.appId || ''}
            onChange={handleInputChange}
            fullWidth
            inputProps={{ style: { color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
          />

          <TextField
            style={{ marginTop: '20px' }}
            label="Customer Name"
            name="custName"
            value={formData.custName || ''}
            onChange={handleInputChange}
            fullWidth
            inputProps={{ style: { color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
          />

          <TextField
            style={{ marginTop: '20px' }}
            label="Short Code"
            name="shortCode"
            value={formData.shortCode || ''}
            onChange={handleInputChange}
            fullWidth
            inputProps={{ style: { color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
          />

          <TextField
            style={{ marginTop: '20px' }}
            label="Expiry Date"
            name="expiryDate"
            value={formData.expiryDate || ''}
            onChange={handleInputChange}
            fullWidth
            inputProps={{ style: { color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
          />

          <TextField
            style={{ marginTop: '20px' }}
            label="License Status"
            name="licenseStatus"
            value={formData.licenseStatus || ''}
            onChange={handleInputChange}
            fullWidth
            inputProps={{ style: { color: 'black' } }}
            InputLabelProps={{ style: { color: 'black' } }}
          />

          {/* Add more form fields for other columns */}
          <DialogActions style={{ marginTop: '40px', backgroundColor: '#f5f5f5' }}>
            <Button onClick={handleClose} style={{ backgroundColor: 'black', color: 'white' }}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              style={{ backgroundColor: 'red', color: 'white' }}
              disabled={deleteLoading} // Disable the delete button when delete loading is true
            >
              {deleteLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                'Delete'
              )}
            </Button>


            <Button
              onClick={handleRenewApprove}
              variant="contained"
              style={{ backgroundColor: 'blue', color: 'white' }}
              disabled={renewLoading}
            >
              {ApproveLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                buttonText2
              )}
            </Button>
            <Button
              onClick={handleChangeStatus}
              variant="contained"
              style={{ backgroundColor: 'blue', color: 'white' }}
              disabled={renewLoading} // Disable the renew button when renew loading is true
            >
              {renewLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                buttonText
              )}
            </Button>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: 'green', color: 'white' }}
              disabled={updateLoading} // Disable the update button when update loading is true
            >
              {updateLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                'Update'
              )}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

UpdateFormPopup.propTypes = {
  selectedRow: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  buttonText2: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  handleChangeStatusEndpoint: PropTypes.oneOf(['api1', 'api2']).isRequired,
  dialogueTitle: PropTypes.string.isRequired,
};

export default UpdateFormPopup;
