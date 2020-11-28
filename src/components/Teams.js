import React from 'react';
import Header from './Header';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CalendarToday } from '@material-ui/icons';
import ButtonBase from '@material-ui/core/ButtonBase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import GradeIcon from '@material-ui/icons/Grade';

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
    title: {
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#212121',
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '0.5rem',
        textAlign: 'left'
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
        borderBottom: '1px solid #e3e3e3',
        textTransform: 'capitalize'
    },
    mCardFoot: {
        fontSize: 'small',
        padding: '0.5rem',
        backgroundColor: '#f2f2f2'
    }
}));

const data = [
    { id: '1', name: 'RCB', rating: 2, fullName: "royal challengers banglore" },
    { id: '2', name: 'DC', rating: 5, fullName: "delhi capitals" },
    { id: '3', name: 'KXIP', rating: 4, fullName: "kings XI punjab" }
]

const TeamCard = props => {
    const classes = useStyles();
    const ratingStars = [1, 2, 3, 4, 5];
    return (
        <Grid item xs={12} sm={6} md={4}>
            <ButtonBase className={classes.w100}>
                <Card className={classes.root} onClick={e => (props.onCardClick(e, props))}>
                    <CardContent className={classes.cardContent}>
                        <div className={classes.mCardTournament}>
                            {props.fullName}
                        </div>
                        <div className={classes.matchTeams}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {props.name}
                            </Typography>
                        </div>
                        <div className={classes.mCardFoot}>
                            {
                                ratingStars.map((x, i) => {
                                    return (
                                        (i <= props.rating) ? (<GradeIcon style={{ color: "#ffc107", fontSize: "0.85rem" }} />) : null
                                    )
                                })
                            }
                        </div>
                    </CardContent>
                </Card>
            </ButtonBase>
        </Grid>
    )
}

export default function Teams(props) {
    const classes = useStyles();
    const [listTournaments, setListTournaments] = React.useState([]);
    const [hideEnded, setHideEnded] = React.useState(false);
    const [pageTitle, setPageTitle] = React.useState('Teams');
    const tournaments = [{ label: 'T1', value: 't1' }, { label: 'T2', value: 't2' }]

    React.useEffect(() => {
        setListTournaments(data);
        if (props.location.state) {
            setPageTitle(props.location.state.name);
        }
    }, []);

    const handleChange = e => {
        setHideEnded(p => !p)
    }

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
            <Header title={pageTitle} rightLink={{ to: '/teams/add', label: 'add' }} />
            <div className={classes.pageRoot}>
                <div className={classes.filterRow}>
                </div>
                <Grid container spacing={3}>
                    {
                        listTournaments.map(item => {
                            if (hideEnded) {
                                return (item.status !== 'ended' ? (<TeamCard key={item.id} {...item} onCardClick={handleCardClick} />) : null)
                            } else {
                                return (<TeamCard key={item.id} {...item} onCardClick={handleCardClick} />)
                            }
                        })
                    }

                </Grid>
            </div>
        </>
    )
}