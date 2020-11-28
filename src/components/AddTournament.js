import React from 'react';
import Header from './Header';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    pageRoot: {
        padding: '1rem'
    },
    root: {
        position: 'relative',
        minWidth: 300,
        fontFamily: theme.typography.fontFamily,
        textAlign: 'initial',
        width: '100%'
    },
    textField: {
        marginBottom: '2rem'
    },
    containerForm: {
        padding: '1rem'
    }
}));


export default function AddTournament(props) {
    const classes = useStyles();

    React.useEffect(() => {

    }, []);

    const handleSubmit = () => {

    }

    return (
        <>
            <Header title='Add Tournament' />
            <div className={classes.pageRoot}>
                <Paper elevation={1}>
                    <form className={classes.containerForm} noValidate>
                        <TextField
                            id="name"
                            label="Tournament Name"
                            type="text"
                            className={classes.textField}
                            variant='outlined'
                            fullWidth
                            size="small"
                        />
                        <TextField
                            id="startdate"
                            label="Start Date"
                            type="date"
                            defaultValue={Date.now()}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant='outlined'
                            fullWidth
                            size="small"
                        />
                        <TextField
                            id="endDate"
                            label="End Date"
                            type="date"
                            defaultValue={Date.now()}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant='outlined'
                            fullWidth
                            size="small"
                        />


                        <Button variant="contained" color="secondary" onClick={handleSubmit}>
                            SUBMIT
                        </Button>
                    </form>
                </Paper>
            </div>
        </>
    )
}