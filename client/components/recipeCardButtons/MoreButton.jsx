import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import { updateCard } from '../../slices/cardSlice';
import { purple } from '@mui/material/colors';

/**
 * // This component renders more recipes upon clicking 'More'
 *
 * @param {Object} recipe Object of recipe with their corresponding data
 * 
 * @return {JSX} The pop up window to be rendered when you click more on a recipe
 */
export default function MoreButton({ recipe }) {
  // *what are these state used for?
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const dispatch = useDispatch();

  // * what is this state used for?
  const [saveEditButton, setSaveEditButton] = React.useState('Edit');
  const [canEdit, setCanEdit] = React.useState(false);

  // Manages two values of 'saveEditButton' state 
  function setSaveEditButtonLogic() {
    if (saveEditButton === 'Edit') {
      setSaveEditButton('Save');
    } else {
      setSaveEditButton('Edit');
    }
  }

  /**
 *If canEdit state is true, saveEditButton becomes 'Edit'. We send a PUT request to the backend route, sending a body that includes
  the old state (... recipe), the ingredientList (text), and ingredient directions. Also sends a header, and returns JSON response
  With the data received from the backend, we pass it into the updateCard action, and that action is dispatched.
 * 
 * @return {JSX} The modal with recipe and ingredient list
 */
  const canEditLogic = () => {
    if (canEdit) {
      console.log(
        'ingredientText',
        document.getElementById(`${recipe.id}ingredientText`).textContent
      );
      setSaveEditButton('Edit');
      fetch(`/recipe/update/${recipe.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...recipe,
          ingredientList: document
            .getElementById(`${recipe.id}ingredientText`)
            .textContent.split('\n'),
          directions: document
            .getElementById(`${recipe.id}directions`)
            .textContent.split('\n'),
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error(res.status);
        })
        .then((data) => {
          console.log('here', data);
          console.log('here', data);
          dispatch(updateCard(data));
        })
        .catch((err) => console.log(`Error code: ${err}`));
    } else setSaveEditButton('Save');
    setCanEdit((state) => !state);
  };
  // Event listener to handle opening the modal and setting the scrolling functionality
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  // Event listener to handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button color="success" onClick={handleClickOpen('paper')}>
        More
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{recipe.title}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id={`${recipe.id}ingredientText`}
            ref={descriptionElementRef}
            tabIndex={-1}
            contentEditable={canEdit.toString()}
            // multiline
            style={{ whiteSpace: 'pre-line' }}
          >
            {recipe.ingredientList ? recipe.ingredientList.join('\n') : null}
          </DialogContentText>
        </DialogContent>

        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id={`${recipe.id}directions`}
            ref={descriptionElementRef}
            tabIndex={-1}
            contentEditable={canEdit.toString()}
            // multiline
            style={{ whiteSpace: 'pre-line' }}
          >
            {recipe.directions ? recipe.directions.join('\n') : null}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="success" onClick={canEditLogic}>
            {saveEditButton}
          </Button>
          <Button color="warning" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}