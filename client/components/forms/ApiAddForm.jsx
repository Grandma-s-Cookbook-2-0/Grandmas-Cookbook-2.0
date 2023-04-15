import React, { useRef } from 'react';
import { TextField, Button, Box, Typography, Backdrop, CircularProgress} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setKeywordResult } from '../../slices/modalSlice.js';
import { addCard } from '../../slices/cardSlice'
import RecipeCard from '../recipeCard.jsx';

function APIAddForm() {
    const keywordFieldValue = useRef('');
    const tagFieldValue = useRef('');
    const dispatch = useDispatch();
    const { keywordResults, clearKeywordResult } = useSelector(state=>state.modal)
    const [open, setOpen] = React.useState(false);
    const [queryError, setQueryError] = React.useState(false)
    const cardArr = []
    
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
    
    function addHandler(e, props) {
        e.preventDefault();
        handleOpen();
        fetch('/recipe/add', 
            {method: 'POST', 
            body: JSON.stringify(props),
            headers: {
                'Content-type': 'application/json',
            }})
            .then(res => res.json())
            .then(data => dispatch(addCard(data)))
            .then(() => handleClose())
    }

    async function handleSubmit(e) {
        e.preventDefault();
        handleOpen();
        
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
            keywordsQuery += `%20${  keywords.shift()}`
        }
        
        while (tags.length >= 1) {
            tagsQuery += `%20${  tags.shift()}`
        }

        const query = 'http://localhost:3000/tasty/tagQuery/0/50/' + tagsQuery.toLowerCase() + '/' + keywordsQuery.toLowerCase()

        await fetch(query)
            .then((res) => res.json())
            .then((data) => {
                for (let i = 0; i < 5; i++) {
                    const { title, ingredientList, directions } = data[i];
                    cardArr.push(<RecipeCard key={title} type="addForm" title={title} ingredientList={ingredientList} directions={directions} addHandler={addHandler} />)
                }
                dispatch(setKeywordResult(cardArr))
            })
            .then(() => handleClose())
            // .then(() => dispatch(clearKeywordResult()))
    };


    return (
        <Box>
            <TextField id="tagsField" label='tags' inputRef={tagFieldValue}/>
            <TextField id="keywordField" label='keywords' inputRef={keywordFieldValue}/>
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