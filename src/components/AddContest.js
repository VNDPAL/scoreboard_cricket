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


export default function AddMatch(props) {
    const classes = useStyles();
    const teams = [{ label: 'delhi capitals', value: 'DC' }, { label: 'mumbai indians', value: 'MI' }]
    const tournaments = [{ label: 'T1', value: 't1' }, { label: 'T2', value: 't2' }]

    React.useEffect(() => {

    }, []);

    const handleSubmit = () => {

    }

    return (
        <>
            <Header title='Add Match' />
            <div className={classes.pageRoot}>
                <Paper elevation={1}>
                    <form className={classes.containerForm} noValidate>
                        <TextField
                            id="team1"
                            label="Team 1"
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
                            id="team1"
                            label="Team 2"
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
                            id="trn"
                            label="Tournament"
                            className={classes.textField}
                            variant='outlined'
                            select
                            fullWidth
                            size="small"
                        >
                            {
                                tournaments.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                        <TextField
                            id="endDate"
                            label="Start Time"
                            type="datetime-local"
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