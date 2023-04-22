import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Container,
  TextField,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCard from '../components/recipeCard.jsx';
import AddRecipeModal from '../components/addRecipePage/AddRecipeModal.jsx';
import { init } from '../slices/cardSlice';
import { clearKeywordResult } from '../slices/modalSlice.js';

function CardGrid() {
  // store reference into a variable to allow use in regular JS functions
  const dispatch = useDispatch();

  // States to manage live filtering of the recipes
  const [filteredRecipes, setFilteredRecipes] = React.useState([]);
  const [filterKeyword, setFilterKeyword] = React.useState('');

  // State to support the add recipe modal.
  const [openAddRecipe, setOpenAddRecipe] = React.useState(false);

  // Handler for control the filter keyword in text field.
  const onFilterKeywordChange = (e) => setFilterKeyword(e.target.value);

  // Upon closing the modal, clears keyword results
  const handleCloseAddRecipe = () => {
    setOpenAddRecipe(false);
    dispatch(clearKeywordResult())
  };

  // Updates openAddRecipe state to true upon opening modal
  const handleOpenAddRecipe = () => {
    setOpenAddRecipe(true);
  };

  // Extracting recipe data from the initial state of cardSlice
    const { recipes } = useSelector(state=>state.card)
   
  // Populates recipe state with fetched data
  useEffect(() => {
    fetch('/recipe/all', { method: 'GET' })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.status);
      })
      .then((data) => {
        dispatch(init(data));
      })
      .catch((err) => console.log(`Error code: ${err}`));
  }, []);

  // Filter the recipes based on the value of filterKeyword
  useEffect(() => {
    setFilteredRecipes(
      recipes.filter((recipe) => 
        // console.log(recipe)
         recipe.title.toLowerCase().includes(filterKeyword.toLowerCase())
    )
    );
  }, [recipes, filterKeyword]);



  return (
    <main>
      <div>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button variant="contained" onClick={handleOpenAddRecipe} sx={{marginTop: '16px'}}>
                Get New Recipe
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <TextField
                label="Find Your Recipe"
                variant="standard"
                value={filterKeyword}
                onChange={onFilterKeywordChange}
                inputProps={{ style: { fontSize: 32 } }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Container className="classes.cardGrid">
                <Grid container spacing={3}>
                  {filteredRecipes.map((card) => (
                    <Grid item key={card.id} xs={12} sm={4} md={3}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <RecipeCard recipe={card} title={card.title} image={card.imagePath} />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
              <AddRecipeModal
                open={openAddRecipe}
                handleClose={handleCloseAddRecipe}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </main>
  );
}

export default CardGrid;