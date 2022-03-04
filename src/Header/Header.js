import { Button, Modal, Paper, TextField, Typography } from "@mui/material"
import { bgcolor, Box } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import FeedbackList from "../FeedbackList/FeedbackList";
import './Header.css';

const Header = () => {
    const [open, setOpen] = useState(false)

    const [userName, setUserName] = useState('');
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [tag, setTag] = useState('');

    const [data, setData] = useState([])

    useEffect(() => {
        getFeedback();
    }, [])

    const getFeedback = () => {
        fetch('https://lit-plateau-61522.herokuapp.com/feedback')
            .then(response => response.json())
            .then(data => setData(data));
    }

    const handleClose = () => {
        setOpen(false)
    }

    const submitFeedback = () => {
        const data = { username: userName, title, details, tag };

        fetch('https://lit-plateau-61522.herokuapp.com/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setUserName('');
                setTag('');
                setDetails('');
                setTitle('');
                getFeedback();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (
        <>
            <Paper sx={{ bgcolor: "#373e68", borderRadius: "10px", maxWidth: '80vw', margin: "30px auto"}} className="header" elevation={0}>
                <Button sx={{
                    bgcolor: '#b21fea', 
                    borderRadius: "5px", 
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                        bgcolor: '#b21fea80',
                        color: 'white'
                    },
                }} onClick={() => setOpen(true)} variant="contained"> + Add Feedback </Button>
            </Paper >
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box className="modal-content" sx={{display: 'grid', gridGap: "30px", maxWidth: "50%", p: 5, borderRadius: "10px"}}>
                    <Typography variant="h4" sx={{marginBottom: '15px', color: "#373e68", fontWeight: 'bold'}}>Add New Feedback</Typography>
                    <TextField id="outlined-basic" label="Username" variant="outlined" value={userName} onChange={(event) => setUserName(event.target.value)} />
                    <TextField id="outlined-basicTwo" label="Title" variant="outlined" value={title} onChange={(event) => setTitle(event.target.value)} />
                    <TextField id="outlined-basicThree" label="Feedback" variant="outlined" value={details} onChange={(event) => setDetails(event.target.value)} />
                    <TextField id="outlined-basicFour" label="Tag" variant="outlined" value={tag} onChange={(event) => setTag(event.target.value)} />
                    <Button variant="contained" onClick={submitFeedback} sx={{bgcolor: '#373e68', height: "50px", }}>Submit</Button>
                </Box>
            </Modal>
            <FeedbackList data={data} />

        </>
    )

}
export default Header;