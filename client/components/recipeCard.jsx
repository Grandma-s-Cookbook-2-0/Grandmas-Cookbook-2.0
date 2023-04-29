import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useSelector, useDispatch } from 'react-redux';
import MoreButton from "./recipeCardButtons/MoreButton.jsx";
import { deleteCard, cardSlice } from '../slices/cardSlice';

/**
 * This component renders all the cards onto the screen
 *
 * @param {Object} recipe Each meal with their recipes
 * @param {} children ?
 * @param {Object} type a tasty type (Look at tastyQueryTypes.js)
 * @param {Function} addHandler An event listener function in which it will maka a fetch request to add recipe and dispatch the action to create a recipe card
 * @return {JSX} The recipe cards to be rendered
 */
function RecipeCard({ recipe, children, type, addHandler }) {
  const dispatch = useDispatch();

  const [deleteButton, setDeleteButton] = React.useState(true);
  /**
  * When called, a DELETE request is sent to the servers' endpoint, 
  * then returns the result of dispatching deleteCard action (returns new array with selected recipe.id deleted)
  */
  // 
  const setDeleteButtonLogic = () => {
    setDeleteButton((prev) => !prev);
    fetch(`/recipe/delete/${recipe.id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) return dispatch(deleteCard(recipe));
        throw new Error(res.status);
      })
      .catch((err) => console.log(`Error code: ${err}`));
  };


  // renders recipe cards, 'More', 'Delete', and the recipe image
  // *(when will deleteButton be 'false'?)
  if (deleteButton)
    return (
      <Card sx={{
        maxWidth: 600,
      }}
        style={{ border: "none", background: '#DDBEA9' }}
      >
        <CardMedia
          component="img"
          alt="recipe image"
          sx={{ width: '258px', height: '256px', alignItems: 'flex-end' }}
          // height="140"
          image={recipe.imagePath}
        />
        <CardContent >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
          >
            {recipe.title}
          </Typography>
        </CardContent>
        <CardActions> 
          {type === 'cardForm' ? <Button color="success" onClick={addHandler(recipe)}>Add</Button> : null}
          <MoreButton recipe={recipe}/>
          <Button color="error"  size="small" onClick={setDeleteButtonLogic}>
            Delete
          </Button>
        </CardActions>
        {/* {children} */}
      </Card>
    );
}

export default RecipeCard;