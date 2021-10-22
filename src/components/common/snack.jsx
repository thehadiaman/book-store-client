import React from "react";
import {Alert, Snackbar} from "@mui/material";


function Snack({snackState, handleSnackClose, snackMessage, severity}){
    return (
        <div>
            <Snackbar anchorOrigin={{vertical: "top", horizontal: "left"}} open={snackState} autoHideDuration={5000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
                    {snackMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Snack;