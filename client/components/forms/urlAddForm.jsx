import React, { useRef } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Backdrop, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setUrlResult, clearUrlResult } from '../../slices/modalSlice';
import { addCard } from '../../slices/cardSlice'

/**
 * // This component renders more recipes upon clicking 'More'
 *
 * @param {Object} recipe Object of recipe with their corresponding data
 * 
 * @return {JSX} The pop up window to be rendered when you click more on a recipe
 */
function UrlAddForm() {
    const fieldValue = useRef('');
    const dispatch = useDispatch();
    const { urlScrape } = useSelector(state => state.modal)
    const [open, setOpen] = React.useState(false);
    const [queryError, setQueryError] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
/**
 * // This component renders more recipes upon clicking 'More'
 *
 * @param {Object} recipe Object of recipe with their corresponding data
 * 
 * @return {JSX} The pop up window to be rendered when you click more on a recipe
 */
    async function handleSubmit(e) {
        e.preventDefault();
        setQueryError(false)
        handleOpen();
        // fetch data from url 
        await fetch(`http://localhost:3000/recipe/scrapeUrl/?url=${fieldValue.current.value}`)
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error(res.status);
            })
            .then((data) => {
                dispatch(setUrlResult(data))
            })
            .then(() => handleClose())
            .catch(() => {
                setQueryError(true);
                handleClose()
            })
    };

    /**
 * // Event handler function to add recipe card to recipe list
 *
 * @param {Object} e Event variable used for preventDefault method.
 * 
 */
    function addHandler(e) {
        e.preventDefault();
        setQueryError(false);
        handleOpen();
        fetch('/recipe/add',
            {
                method: 'POST',
                body: JSON.stringify(urlScrape),
                headers: {
                    'Content-type': 'application/json',
                }
            })
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error(res.status);
            })
            .then(data => dispatch(addCard(data)))
            .then(() => handleClose())
            .then(() => dispatch(clearUrlResult()))
            .catch(() => {
                setQueryError(true);
                handleClose()
            })
    }


    return (
        <Box>
            {/* alerts user if url is invalid */}
             {queryError ? <Alert severity="error" style={{border: 'black 5px', background: '#DDBEA9'}}>Could not complete the search</Alert> : null}
            <TextField id="urlField" label='URL' inputRef={fieldValue}/>
            <Button onClick={handleSubmit}>Submit</Button>
            {/* if ingredient does exist render results for client */}

            {/* conditional rendering to handle display of fetched website recipe data  */}
            {!urlScrape.ingredientList ? null : 
            <>
                <Typography variant='h5'>
                    {urlScrape.title}
                </Typography>
                <Typography variant='h6'>
                    ingredients
                </Typography>
                {/* if ingredients exist create a list by maping over them */}
                { !urlScrape.ingredientList ? null : urlScrape.ingredientList.map((item, i=0) => {
                    i += 1;
                    return <li key={`ingredient${i}`}>{item}</li> 
                } 
                )}
                <Typography variant='h6'>
                    directions
                </Typography>
                {/* if directions exist, map over them to create list */}
                { !urlScrape.directions ? null : urlScrape.directions.map((item, i = 0) => {
                    i += 1;
                    return <li key={`direction${i}`}>{item}</li> 
                    }) 
                }
                {/* button to add recipe to recipe list */}
                <Button onClick={addHandler}>Add to my Recipes</Button>   
            </>
            }
            {/* component during load */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}

export default UrlAddForm;