import React from 'react';
import Header from './Header';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SAVE_TEAM } from '../lib/constants';
import { postCall } from '../lib/requests';

const useStyles = makeStyles(theme => ({
    pageRoot: {
        padding: '1rem',
        maxWidth: '640px',
        margin: '0 auto'
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

async function apiCall(url, pl) {
    const res = await postCall(url, pl).then(r => {
        return (true)
    });
    return res;
}

export default function AddTeam(props) {
    const classes = useStyles();
    const [payload, setPayload] = React.useState({
        team_name: '',
        short_name: '',
        rating: 1
    });

    const handleChange = (val, type) => {
        setPayload(o => {
            switch (type) {
                case 'team_name': return ({ ...o, ...{ team_name: val } });
                case 'short_name': return ({ ...o, ...{ short_name: val } });
                case 'rating': return ({ ...o, ...{ rating: +val } });
                default: return (o)
            }
        })
    }

    const handleSubmit = () => {
        const postRes = apiCall(SAVE_TEAM(), payload);
        postRes.then((d) => {
            console.log('[respmpost]', d)
            if (d) {
                props.history.push({
                    pathname: '/teams'
                });
            }
        });
    }

    return (
        <>
            <Header title='Add Team' />
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
                            value={payload.team_name}
                            onChange={(e) => { handleChange(e.target.value, 'team_name') }}
                        />
                        <TextField
                            id="sname"
                            label="Short Name"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant='outlined'
                            fullWidth
                            size="small"
                            value={payload.short_name}
                            onChange={(e) => { handleChange(e.target.value, 'short_name') }}
                        />
                        <TextField
                            id="rat"
                            label="Ratings"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant='outlined'
                            fullWidth
                            size="small"
                            value={payload.rating}
                            onChange={(e) => { handleChange(e.target.value, 'rating') }}
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