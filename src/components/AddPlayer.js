import React from 'react';
import Header from './Header';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { multiCall, postCall, putCall } from '../lib/requests';
import { GET_PLAYER_ROLES, GET_TEAMS, SAVE_PLAYER } from '../lib/constants';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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

async function apiCallUpdate(url, pl) {
    const res = await putCall(url, pl).then(r => {
        return (true)
    });
    return res;
}

export default function AddPlayer(props) {
    const classes = useStyles();
    const [listTeam, setListTeam] = React.useState([]);
    const [listRole, setListRole] = React.useState([]);
    const [payload, setPayload] = React.useState({
        player_credit_points: 0,
        name: '',
        player_role_type: '',
        player_team_name: '',
        status: false
    });
    const [isEdit, setIsEdit] = React.useState(false);

    React.useEffect(() => {
        const apiRes = apiCall([GET_PLAYER_ROLES(), GET_TEAMS()]);
        apiRes.then(res => {
            const roles = res[0].map(d => ({ label: d, value: d }));
            const teams = res[1].map(d => ({ label: d.team_name, value: d.team_name }));
            setListRole(roles);
            setListTeam(teams);
        })
    }, []);

    React.useEffect(() => {
        const info = props.location.state && props.location.state.info ? JSON.parse(props.location.state.info) : null;
        if (info) {
            setPayload({
                player_credit_points: info.player_credit_points,
                name: info.name,
                player_role_type: info.player_role_type,
                player_team_name: info.player_team_name,
                _id: info._id,
                status: info.status
            })
            setIsEdit(true)
        }
        console.log('[data to print]', info)
    }, [props.location.state]);


    const handleChange = (val, type) => {
        setPayload(o => {
            switch (type) {
                case 'player_credit_points': return ({ ...o, ...{ player_credit_points: val } });
                case 'name': return ({ ...o, ...{ name: val } });
                case 'player_role_type': return ({ ...o, ...{ player_role_type: val } });
                case 'player_team_name': return ({ ...o, ...{ player_team_name: val } });
                case 'status': return ({ ...o, ...{ status: val } });
                default: return (o)
            }
        })
    }

    const handleSubmit = () => {
        const postRes = isEdit ? apiCallUpdate(SAVE_PLAYER(), payload) : apiCallSave(SAVE_PLAYER(), payload);
        postRes.then((d) => {
            console.log('[respmpost]', d)
            if (d) {
                props.history.push({
                    pathname: '/players'
                });
            }
        });
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
                            value={payload.name}
                            onChange={(e) => handleChange(e.target.value, 'name')}
                        />
                        <TextField
                            id="team"
                            label="Team"
                            className={classes.textField}
                            variant='outlined'
                            select
                            fullWidth
                            size="small"
                            value={payload.player_team_name}
                            onChange={(e) => handleChange(e.target.value, 'player_team_name')}
                        >
                            {
                                listTeam.map(option => (
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
                            value={payload.player_role_type}
                            onChange={(e) => handleChange(e.target.value, 'player_role_type')}
                        >
                            {
                                listRole.map(option => (
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
                            value={payload.player_credit_points}
                            onChange={(e) => handleChange(e.target.value, 'player_credit_points')}
                        />
                        <div>{
                            isEdit ? (
                                <FormControlLabel style={{ marginBottom: '1.5rem' }}
                                    control={<Switch checked={payload.status} onChange={(e) => handleChange(e.target.checked, 'status')} name="status" />}
                                    label="Playing XI"
                                />
                            ) : null
                        }</div>


                        <Button variant="contained" color="secondary" onClick={handleSubmit}>
                            SUBMIT
                        </Button>
                    </form>
                </Paper>
            </div>
        </>
    )
}