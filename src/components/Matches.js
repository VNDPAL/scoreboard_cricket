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
import { multiCall } from '../lib/requests';
import { GET_MATCH, GET_TOURNAMENT } from '../lib/constants';

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
        return (r.map(d => (d.status && d.value.success && d.value.res)))
    });
    return res;
}

const MtCard = props => {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4}>
            <ButtonBase className={classes.w100}>
                <Card className={classes.root} onClick={e => (props.onCardClick(e, props))}>
                    <CardContent className={classes.cardContent}>
                        <div className={classes.mCardTournament}>
                            {props.tournament}
                        </div>
                        <div className={classes.matchTeams}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {props.team1}
                            </Typography>
                            <span className={classes.timeLeft}>10:20:00</span>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {props.team2}
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
    const [trn, setTrn] = React.useState('');
    const pageTitle = (props.location.state ? props.location.state.name : 'Matches');

    React.useEffect(() => {
        const apiRes = apiCall([GET_MATCH(), GET_TOURNAMENT()]);
        apiRes.then(res => {
            const trn = res[1].map(d => ({ label: d.tournament_name, value: d._id }));
            trn.push({ label: 'All', value: 'all' });
            setListMatches(res[0]);
            setListTournaments(trn);
            setTrn('all');
        });
    }, []);


    const handleCardClick = (e, tdata) => {
        props.history.push({
            pathname: '/match',
            state: {
                team1: tdata.team1,
                team2: tdata.team2
            }
        });
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