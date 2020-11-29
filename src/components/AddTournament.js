import React from 'react';
import Header from './Header';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SAVE_TOURNAMENT } from '../lib/constants';
import { postCall } from '../lib/requests';
import { format } from 'date-fns';

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

export default function AddTournament(props) {
    const classes = useStyles();
    const [payload, setPayload] = React.useState({
        tournament_name: "",
        startDate: format(new Date(), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd')
    });

    const handleChange = (val, type) => {
        setPayload(o => {
            switch (type) {
                case 'tournament_name': return ({ ...o, ...{ tournament_name: val } });
                case 'startDate': console.log('[val]', val, o);
                    return ({ ...o, ...{ startDate: val } });
                case 'endDate': console.log('[val]', val, o);
                    return ({ ...o, ...{ endDate: val } });
                default: return (o)
            }
        })
    }

    const handleSubmit = () => {
        const pl = { tournament_name: payload.tournament_name, startDate: format(new Date(payload.startDate), 'MM-dd-yyyy'), endDate: format(new Date(payload.endDate), 'MM-dd-yyyy') };
        const postRes = apiCall(SAVE_TOURNAMENT(), pl);
        postRes.then((d) => {
            console.log('[respmpost]', d)
            if (d) {
                props.history.push({
                    pathname: '/tournaments'
                });
            }
        });
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
                            onChange={(e) => handleChange(e.target.value, 'tournament_name')}
                            value={payload.tournament_name}
                        />
                        <TextField
                            id="startdate"
                            label="Start Date"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant='outlined'
                            fullWidth
                            size="small"
                            onChange={(e) => handleChange(e.target.value, 'startDate')}
                            value={format(new Date(payload.startDate), 'yyyy-MM-dd')}
                        />
                        <TextField
                            id="endDate"
                            label="End Date"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant='outlined'
                            fullWidth
                            size="small"
                            onChange={(e) => handleChange(e.target.value, 'endDate')}
                            value={format(new Date(payload.endDate), 'yyyy-MM-dd')}
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