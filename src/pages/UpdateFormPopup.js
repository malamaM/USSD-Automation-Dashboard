import React, { useState } from 'react';
import axios from 'axios';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const UpdateFormPopup = ({ selectedRow, closePopup }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [formData, setFormData] = useState({
      appId: selectedRow.appId,
      custName: selectedRow.custName,
      shortCode: selectedRow.shortCode,
      expiryDate: selectedRow.expiryDate,
      licenseStatus: selectedRow.licenseStatus,
    });
  
    const handleClose = () => {
      setIsOpen(false);
      closePopup();
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/licenses/update', formData);
        console.log('Form submitted successfully', response.data);
        // Optionally, you can show a success message or perform any other actions here
      } catch (error) {
        console.error('Error submitting form:', error);
        // Optionally, you can show an error message or perform any other error handling here
      }
  
      handleClose();
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    return (
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Update License</DialogTitle>
        <DialogContent>
          {/* Render the form fields here */}
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Application ID"
              name="appId"
              value={formData.appId}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Customer Name"
              name="custName"
              value={formData.custName}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Short Code"
              name="shortCode"
              value={formData.shortCode}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Expiry Date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="License Status"
              name="licenseStatus"
              value={formData.licenseStatus}
              onChange={handleInputChange}
              fullWidth
            />
            {/* Add more form fields for other columns */}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  

export default UpdateFormPopup;
