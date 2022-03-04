import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

function FeedbackList({ data }) {

  

    return (
        <div>
            {data.map((el, index) => {
                return (
                    <Box component="span" key={index} sx={{ borderRadius: "10px",maxWidth: '80vw', paddingBottom: "10px", margin: '20px auto', display: "grid", bgcolor: "white"}}>
                        <Typography variant='body1' sx={{padding: "10px 0 0px 10px", color: "#373e68", fontWeight: "bold"}}>{el.title}<Typography variant="caption" sx={{color: "gray", fontSize: '12px'}}> - {el.username}</Typography></Typography>
                        <Typography variant='body1' sx={{color: "#3a3b3c", padding: "10px 0 10px 10px" }}>{el.details}</Typography>
                        <Typography variant="caption" sx={{bgcolor: "#f3f5ff", width: "fit-content", marginLeft: "10px", borderRadius: "15px", padding: "10px", color: "#9da7df", fontWeight: "bold"}}>{el.tag}</Typography>
                    </Box>
                )
            })}
        </div>
    )
}

export default FeedbackList