import React from 'react';
import Header from './Header';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import { CalendarToday } from '@material-ui/icons';
import ButtonBase from '@material-ui/core/ButtonBase';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
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
    }
}));

const data = [
    { id: '1', team: 'RCB', name: 'AB devillers', type: 'batsman', credits: '8' },
    { id: '1', team: 'MI', name: 'J. Bumrah', type: 'bowler', credits: '9.5' },
    { id: '1', team: 'RR', name: 'B. Stokes', type: 'all-rounder', credits: '10' }
]

const PlayerCard = props => {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4}>
            <ButtonBase className={classes.w100}>
                <Card className={classes.root} onClick={e => (props.onCardClick(e, props))}>
                    <CardContent className={classes.cardContent}>
                        <div className={classes.mCardTournament}>
                            {props.team}
                        </div>
                        <div className={classes.matchTeams}>
                            <Typography className={classes.nameText} color="textSecondary" gutterBottom>
                                {props.name}
                            </Typography>
                            <Typography className={classes.creditsText} color="textSecondary" gutterBottom>
                                {props.credits}
                            </Typography>
                        </div>
                        <div className={classes.mCardFoot}>
                            {props.type}
                        </div>
                    </CardContent>
                </Card>
            </ButtonBase>
        </Grid>
    )
}

export default function Players(props) {
    const classes = useStyles();
    const [listTournaments, setListTournaments] = React.useState([]);
    const [hideEnded] = React.useState(false);
    const [pageTitle, setPageTitle] = React.useState('Players');
    const tournaments = [{ label: 'T1', value: 't1' }, { label: 'T2', value: 't2' }]

    React.useEffect(() => {
        setListTournaments(data);
        if (props.location.state) {
            setPageTitle(props.location.state.name);
        }
    }, [props.location]);

    // const handleChange = e => {
    //     setHideEnded(p => !p)
    // }

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
            <Header title={pageTitle} rightLink={{ to: '/players/add', label: 'add' }} />
            <div className={classes.pageRoot}>
                <div className={classes.filterRow}>
                    <TextField
                        id="trn"
                        label="Team"
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
                </div>
                <Grid container spacing={3}>
                    {
                        listTournaments.map(item => {
                            if (hideEnded) {
                                return (item.status !== 'ended' ? (<PlayerCard key={item.id} {...item} onCardClick={handleCardClick} />) : null)
                            } else {
                                return (<PlayerCard key={item.id} {...item} onCardClick={handleCardClick} />)
                            }
                        })
                    }

                </Grid>
            </div>
        </>
    )
}