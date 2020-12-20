import React from 'react';
import Header from './Header';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { multiCall, putCall } from '../lib/requests';
import { GET_PLAYERS, GET_TEAMS, GET_PLAYERS_BY_TEAM, UPDATE_TEAM_STATUS } from '../lib/constants';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

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
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    nameText: {
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#212121',
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '0.5rem',
        width: 'calc(100% - 80px)',
        textAlign: 'left'
    },
    creditsText: {
        color: '#212121',
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '0.5rem',
        width: '80px'
    },
    pos: {
        marginBottom: 12,
    },
    bgImg: {
        position: 'absolute',
        top: '10%',
        left: '50%',
        height: '80%',
        opacity: '0.2'
    },
    scheduleText: {
        padding: '0.5rem',
        backgroundColor: '#e5e5e5',
        fontSize: '0.875rem',
        verticalAlign: 'middle'
    },
    txtIcon: {
        display: 'inline-block',
        verticalAlign: 'middle',
        fontSize: 'inherit',
        color: theme.palette.primary
    },
    cardContent: {
        padding: '0 0 0 0 !important',
        backgroundImage: `url(https://cdn.onlinewebfonts.com/svg/img_21613.png)`
    },
    w100: {
        width: '100%'
    },
    filterRow: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: '0 0 1rem'
    },
    matchTeams: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',

    },
    timeLeft: {
        minWidth: '100px',
        color: '#F44336'
    },
    mCardTournament: {
        fontSize: 'small',
        padding: '0.5rem',
        borderBottom: '1px solid #e3e3e3'
    },
    mCardFoot: {
        fontSize: 'small',
        padding: '0.5rem',
        backgroundColor: '#f2f2f2'
    },
    playingStatus: {
        position: 'absolute',
        right: '10px',
        bottom: '10px',
        width: '10px',
        height: '10px',
        borderRadius: '10px'
    },
    playing: {
        backgroundColor: '#4caf50'
    },
    notplaying: {
        backgroundColor: '#f44336'
    }
}));

async function apiCall(urls) {
    const res = multiCall(urls).then(r => {
        console.log('[response]', r)
        return (r.map(d => (d.status && d.value.success && d.value.res)))
    });
    return res;
}

export default function Players(props) {
    const classes = useStyles();
    const [listTeam, setListTeam] = React.useState([]);
    const [team, setTeam] = React.useState('');
    const [listPlayer, setListPlayer] = React.useState([]);
    const [listPlayerFiltered, setListPlayerFiltered] = React.useState([]);
    const pageTitle = (props.location.state ? props.location.state.name : 'Players');
    const selectedTeam = (props.location.state ? props.location.state.team : 'all');
    const columns = [{ title: 'Name', field: 'name' },
    { title: 'Role', field: 'player_role_type' },
    { title: 'Team', field: 'player_team_name' },
    {
        title: 'Playing', field: 'status', render: rowData => {
            return (<span>{rowData.status ? 'Yes' : 'No'}</span>)
        }
    },
    { title: 'credits', field: 'player_credit_points' },
    ];

    React.useEffect(() => {
        const apiRes = apiCall([GET_PLAYERS_BY_TEAM(selectedTeam), GET_TEAMS()]);
        apiRes.then(res => {
            const teams = res[1].map(d => ({ label: d.team_name, value: d.team_name }));
            teams.push({ label: 'All', value: 'all' });
            setListPlayer(res[0]);
            setListTeam(teams);
            setTeam(selectedTeam);
        });
    }, []);


    console.log('[render]', team, listPlayer)

    const handlerRowClick = (e, tdata) => {
        props.history.push({
            pathname: '/players/add',
            state: {
                info: JSON.stringify(tdata)
            }
        });
        console.log('[props]', tdata)
    }

    const handleSaveTeam = () => {
        putCall(UPDATE_TEAM_STATUS(), { player_team_name: selectedTeam }).then(res => {

        })
    }

    return (
        <>
            <Header title={pageTitle} rightLink={{ to: '/players/add', label: 'add' }} />
            <div className={classes.pageRoot}>
                <Paper elevation={2}>
                    <MaterialTable
                        title={selectedTeam}
                        columns={columns}
                        data={listPlayer}
                        options={{ rowStyle: { fontFamily: "Roboto, sans-serif" }, paging: false }}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'edit player',
                                onClick: (event, rowData) => handlerRowClick(event, rowData)
                            }
                        ]}
                    />
                    <div>
                        <Button variant="contained" onClick={handleSaveTeam}>Save</Button>
                    </div>
                </Paper>
            </div>
        </>
    )
}