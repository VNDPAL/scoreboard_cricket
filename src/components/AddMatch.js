import React from 'react';
import Header from './Header';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { multiCall, postCall } from '../lib/requests';
import { GET_TOURNAMENT, GET_TEAMS, SAVE_MATCH } from '../lib/constants';
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

async function apiCall(urls) {
    const res = multiCall(urls).then(r => {
        console.log('[response]', r)
        return (r.map(d => (d.status && d.value.success && d.value.res)))
    });
    return res;
}

async function apiCallSave(url, pl) {
    const res = await postCall(url, pl).then(r => {
        return (true)
    });
    return res;
}

export default function AddMatch(props) {
    const classes = useStyles();
    const [listTeam, setListTeam] = React.useState([]);
    const [listTrn, setListTrn] = React.useState([]);
    const [payload, setPayload] = React.useState({
        tournamentId: '',
        matchDate: format(new Date(), "yyyy-MM-dd'T'hh:mm"),
        team1: '',
        team2: ''
    });

    React.useEffect(() => {
        const apiRes = apiCall([GET_TEAMS(), GET_TOURNAMENT()]);
        apiRes.then(res => {
            const teams = res[0].map(d => ({ label: d.team_name, value: d.team_name }));
            const trn = res[1].map(d => ({ label: d.tournament_name, value: d._id }));
            setListTrn(trn);
            setListTeam(teams);
        })
    }, []);

    const handleChange = (val, type) => {
        setPayload(o => {
            switch (type) {
                case 'tournamentId': return ({ ...o, ...{ tournamentId: val } });
                case 'matchDate': return ({ ...o, ...{ matchDate: val } });
                case 'team1': return ({ ...o, ...{ team1: val } });
                case 'team2': return ({ ...o, ...{ team2: val } });
                default: return (o)
            }
        })
    }

    const handleSubmit = () => {
        const pl = {
            tournamentId: payload.tournamentId,
            matchDate: format(new Date(payload.matchDate), "MM-dd-yyyy hh:mm"),
            team1: payload.team1,
            team2: payload.team2
        }
        const postRes = apiCallSave(SAVE_MATCH(), pl);
        postRes.then((d) => {
            console.log('[respmpost]', d)
            if (d) {
                props.history.push({
                    pathname: '/matches'
                });
            }
        });
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
                            value={payload.team1}
                            onChange={(e) => handleChange(e.target.value, 'team1')}
                        >
                            {
                                listTeam.map(option => {
                                    return ((option.value !== payload.team2) ? (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ) : null)
                                })
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
                            value={payload.team2}
                            onChange={(e) => handleChange(e.target.value, 'team2')}
                        >
                            {
                                listTeam.map(option => {
                                    return ((option.value !== payload.team1) ? (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ) : null)
                                })
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
                            value={payload.tournamentId}
                            onChange={(e) => handleChange(e.target.value, 'tournamentId')}
                        >
                            {
                                listTrn.map(option => (
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
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant='outlined'
                            fullWidth
                            size="small"
                            onChange={(e) => handleChange(e.target.value, 'matchDate')}
                            value={format(new Date(payload.matchDate), "yyyy-MM-dd'T'hh:mm")}
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