import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import AddRecipeTab from './AddRecipeTab.jsx';
// For MUI styling 
const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: '#CB997E',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// If commented out, the ENTIRE frontend disappears,
// but it appears it's only responsible for the Get New Recipe functionality
/**
 * // Exports a component that renders the modal for adding a recipe
 *
 * @param {Boolean} open Boolean value that is being passed as a prop
 * @param {Function} handleClose An event listener that is being passed as a prop
 * 
 * @return {JSX} The modal component
 */
// renders get new recipe modal after clicking initial button
export default function AddRecipeModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflow: 'scroll', }}
    >
      <Box sx={boxStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Get New Recipe
        </Typography>
        <AddRecipeTab />
      </Box>
    </Modal>
  );
}
