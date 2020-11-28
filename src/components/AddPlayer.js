import React from 'react';
import Header from './Header';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

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


export default function AddPlayer(props) {
    const classes = useStyles();
    const teams = [{ label: 'delhi capitals', value: 'DC' }, { label: 'mumbai indians', value: 'MI' }]
    const types = [{ label: 'batsman', value: 'batsman' }, { label: 'bowler', value: 'bowler' }, { label: 'all-rounder', value: 'all-rounder' }]

    React.useEffect(() => {

    }, []);

    const handleSubmit = () => {

    }

    return (
        <>
            <Header title='Add Player' />
            <div className={classes.pageRoot}>
                <Paper elevation={1}>
                    <form className={classes.containerForm} noValidate>
                        <TextField
                            id="name"
                            label="Name"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant='outlined'
                            fullWidth
                            size="small"
                        />
                        <TextField
                            id="team"
                            label="Team"
                            className={classes.textField}
                            variant='outlined'
                            select
                            fullWidth
                            size="small"
                        >
                            {
                                teams.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                        <TextField
                            id="type"
                            label="Type"
                            className={classes.textField}
                            variant='outlined'
                            select
                            fullWidth
                            size="small"
                        >
                            {
                                types.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                        <TextField
                            id="cred"
                            label="Credits"
                            type="number"
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