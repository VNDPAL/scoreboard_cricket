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
import { multiCall, postCall } from '../lib/requests';
import { GET_MATCH, GET_TOURNAMENT, START_MATCH } from '../lib/constants';

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
    title: {
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#212121',
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '0.5rem',
        width: 'calc(50% - 50px)'
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
    }
}));

async function apiCall(urls) {
    const res = multiCall(urls).then(r => {
        console.log('[response]', r)
        return (r.map(d => (d.status && d.value.success && d.value.res || [])))
    });
    return res;
}

const MtCard = props => {
    const classes = useStyles();
    const tm = useCountdown(props.startDate);
    return (
        <Grid item xs={12} sm={6} md={4}>
            <ButtonBase className={classes.w100}>
                <Card className={classes.root} onClick={e => (props.onCardClick(e, props))}>
                    <CardContent className={classes.cardContent}>
                        <div className={classes.mCardTournament}>
                            {props.tournamentId.tournament_name}
                        </div>
                        <div className={classes.matchTeams}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {props.detailsTeam1.short_name}
                            </Typography>
                            <span className={classes.timeLeft}>{tm.join(' : ')}</span>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {props.detailsTeam2.short_name}
                            </Typography>
                        </div>
                        <div className={classes.mCardFoot}>
                            <b>{props.contestCount}</b> Contests
                        </div>
                    </CardContent>
                </Card>
            </ButtonBase>
        </Grid>
    )
}

export default function Matches(props) {
    const classes = useStyles();
    const [listTournaments, setListTournaments] = React.useState([]);
    const [listMatches, setListMatches] = React.useState([]);
    const [listMatchesFiltered, setListMatchesFiltered] = React.useState([]);
    const [trn, setTrn] = React.useState('');
    const pageTitle = (props.location.state ? props.location.state.name : 'Matches');
    console.log(listMatchesFiltered);
    React.useEffect(() => {
        const apiRes = apiCall([GET_MATCH(), GET_TOURNAMENT()]);
        apiRes.then(res => {
            const trnx = res[1].map(d => ({ label: d.tournament_name, value: d._id }));
            trnx.push({ label: 'All', value: 'all' });
            console.log('[new]: ', res)
            setListMatches(res[0]);
            setListTournaments(trnx);
            setTrn('all');
        });
    }, []);

    React.useEffect(() => {
        if (trn === 'all') {
            setListMatchesFiltered(listMatches)
        } else if (trn) {
            setListMatchesFiltered(o => {
                return (listMatches.filter(d => (d.tournamentId.tournament_name === trn)))
            })
        }
    }, [trn, listMatches]);

    const handleCardClick = (e, tdata) => {
        postCall(START_MATCH(), { _id: tdata._id }).then(res => {
            if (res.success && res.data) {
                props.history.push({
                    pathname: '/match',
                    state: {
                        team1: tdata.team1,
                        team2: tdata.team2
                    }
                });
            }
        })
        console.log('[props]', tdata)
    }

    return (
        <>
            <Header title={pageTitle} rightLink={{ to: '/matches/add', label: 'add' }} />
            <div className={classes.pageRoot}>
                <div className={classes.filterRow}>
                    <TextField
                        id="trn"
                        label="Tournament"
                        className={classes.textField}
                        variant='outlined'
                        select
                        fullWidth
                        size="small"
                        value={trn}
                        onChange={(e) => { setTrn(e.target.value) }}
                    >
                        {
                            listTournaments.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </div>
                <Grid container spacing={3}>
                    {
                        listMatches.map(item => {
                            return (<MtCard key={item._id} {...item} onCardClick={handleCardClick} />)
                        })
                    }

                </Grid>
            </div>
        </>
    )
}

function useCountdown(dt, callback) {
    const [time, setTime] = React.useState([0, 0, 0, 0]);
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let countDown = new Date(dt || '10/10/2050').getTime(),
        x = setInterval(function () {

            let now = new Date().getTime(),
                distance = countDown - now;

            //do something later when date is reached
            if (distance < 0) {
                clearInterval(x);
                // return null;  
                callback && callback();
            } else {
                setTime([Math.floor(distance / (day)), Math.floor((distance % (day)) / (hour)), Math.floor((distance % (hour)) / (minute)), Math.floor((distance % (minute)) / second)]);
            }
            //seconds
        }, 0);

    return time;
}