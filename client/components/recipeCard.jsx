import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import {Grid} from '@mui/material';
import { borders, shadows} from '@mui/system';
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
      
    
      <Grid container spacing={2}>
        <Card sx={{
          m: 2,
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '0px',
          boxShadow: 8,
          
          p: 2.25
        }}
        
        style={{ border: "none", background:'#FAF8F1' }}
        >
              <CardHeader sx={{ height: '50px', p:2.25, fontSize:'10rem', textAlign: 'center' }}title={(recipe.title).toUpperCase()}/>
            
              <Grid item xs={12} sx={{paddingTop: 2.25,borderTop:2, borderTopColor: '#D4CDC3', height: '300px'}}>
                <CardMedia
                  component="img"
                  alt="recipe image"
                 
                  border
                  sx={{borderRadius:'50px', objectFit: 'cover'}}
                  height="300"
                  
                 
                  image={recipe.imagePath}
                />
              </Grid>
            
          
              <CardActions > 
              {type === 'addForm' ? <Button color="success" onClick={addHandler(recipe)}>Add</Button> : null}
                <MoreButton recipe={recipe}/>
                <Button color="error"  size="small" onClick={setDeleteButtonLogic}>
                  Delete
                </Button>
              </CardActions>
            
            {children}
          
        </Card>
      </Grid>
      
    );
}

export default RecipeCard;