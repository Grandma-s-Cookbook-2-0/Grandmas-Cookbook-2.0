import React, { useRef } from 'react';
import { TextField, Button, Box, Typography, Backdrop, CircularProgress, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setKeywordResult } from '../../slices/modalSlice.js';
import { addCard } from '../../slices/cardSlice'
import RecipeCard from '../recipeCard.jsx';

/**
 * // Sets up functionality for adding a recipe through tags and keywords
 * 
 * @return {JSX} The JSX for the tags and keyword pop up search prompt
 */
function APIAddForm() {
    const keywordFieldValue = useRef('');
    const tagFieldValue = useRef('');
    const dispatch = useDispatch();
    const { keywordResults, clearKeywordResult } = useSelector(state => state.modal)
    const [open, setOpen] = React.useState(false);
    const [queryError, setQueryError] = React.useState(false)
    const [success, setSuccess] = React.useState(false);
    const cardArr = []
    // Event listener for handiling closing the modal window
    const handleClose = () => {
        setOpen(false);
    };
    // Event listener for handiling opening the modal window
    const handleOpen = () => {
        setOpen(true);
    };
    /**
     * Adds a recipe to the application 
     *
     * @param {Object} recipe Object of recipe with their corresponding data
     * 
     * @return {Function} Returning a function that will handle the fetch request to post to the database the searched recipe
     */
    const addHandler = (recipe) => {
        handleOpen();
        setQueryError(true);
        return () => {
            fetch('/recipe/add',
                {
                    method: 'POST',
                    body: JSON.stringify(recipe),
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
                .catch(() => {
                    setQueryError(true);
                    handleClose()
                })
        }
    }
    /**
     * Event listener for handiling the submit button when searching for a recipe through tags/keywords. Will initiate a fetch request by adding the keywords or tags to the url that will be used in the 
     * fetch request
     * @param {Object} e The event object seems to only be used for the preventDefault method which will cancel any default action or event.
     * 
     * @return {Function} Returning a function that will handle the fetch request to post to the database the searched recipe
     */
    async function handleSubmit(e) {
        e.preventDefault();
        handleOpen();
        setQueryError(false)

        const keywords = keywordFieldValue.current.value.split(' ');
        const tags = tagFieldValue.current.value.split(' ');

        let tagsQuery;
        let keywordsQuery;

        if (keywords[0] === '') {
            keywordsQuery = 'null'
            keywords.shift()
        } else {
            keywordsQuery = keywords.shift();
        }

        if (tags[0] === '') {
            tagsQuery = 'null'
            tags.shift()
        } else {
            tagsQuery = tags.shift();
        }

        while (keywords.length >= 1) {
            keywordsQuery += `%20${keywords.shift()}`
        }

        while (tags.length >= 1) {
            tagsQuery += `%20${tags.shift()}`
        }

        const query = 'http://localhost:3000/tasty/tagQuery/0/50/' + tagsQuery.toLowerCase() + '/' + keywordsQuery.toLowerCase()

        await fetch(query)
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error(res.status);
            })
            .then((data) => {
                for (let i = 0; i < 5; i++) {
                    const { title } = data[i];
                    cardArr.push(<RecipeCard key={title} type='addForm' recipe={data[i]} addHandler={addHandler} />)
                }
                dispatch(setKeywordResult(cardArr))
            })
            .then(() => handleClose())
            .catch((err) => {
                setQueryError(true)
                handleClose()
            })

    };

    return (
        <Box>
            {queryError ? <Alert severity="error" style={{ border: 'black 5px', background: '#DDBEA9' }}>Could not complete the search</Alert> : null}
            <TextField id="tagsField" label='tags' inputRef={tagFieldValue} />
            <TextField id="keywordField" label='keywords' inputRef={keywordFieldValue} />
            <Button onClick={handleSubmit}>Submit</Button>
            {keywordResults}

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

export default APIAddForm;