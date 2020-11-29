import React from 'react';
import Header from './Header';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CalendarToday } from '@material-ui/icons';
import ButtonBase from '@material-ui/core/ButtonBase';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
import { getCall } from '../lib/requests';
import { GET_TOURNAMENT } from '../lib/constants';
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
        padding: '0.5rem'
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
        backgroundColor: '#f2f2f2',
        fontSize: 'small',
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
    }
}));

const TnCard = props => {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4}>
            <ButtonBase className={classes.w100}>
                <Card className={classes.root} onClick={e => (props.onCardClick(e, props))}>
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {props.tournament_name}
                        </Typography>
                        <div className={classes.scheduleText}>
                            <CalendarToday className={classes.txtIcon} /> {format(new Date(props.startDate), 'dd/MM/yyyy') || ' - '} - {format(new Date(props.endDate), 'dd/MM/yyyy') || ' - '}
                        </div>
                    </CardContent>
                </Card>
            </ButtonBase>
        </Grid>
    )
}

async function apiCall(url) {
    const apiRes = getCall(url).then(r => {
        console.log('response', r);
        return (r.success ? r.data : null)
    })
    return apiRes;
}

export default function Tournaments(props) {
    const classes = useStyles();
    const [listTournaments, setListTournaments] = React.useState([]);
    const [hideEnded] = React.useState(false);

    React.useEffect(() => {
        const response = apiCall(GET_TOURNAMENT());
        response.then(data => {
            console.log('[respdata]', data)
            if (data) {
                setListTournaments(data);
            }
        })
    }, []);

    // const handleChange = e => {
    //     setHideEnded(p => !p)
    // }

    const handleCardClick = (e, tdata) => {
        props.history.push({
            pathname: '/matches',
            state: {
                name: tdata.tournament_name
            }
        });
    }

    return (
        <>
            <Header title='Tournaments' rightLink={{ to: '/tournaments/add', label: 'add' }} />
            <div className={classes.pageRoot}>
                <div className={classes.filterRow}>
                    {/* 
                    <FormControlLabel
                        control={
                            <Switch
                                checked={hideEnded}
                                onChange={handleChange}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Hide Completed"
                    /> */}
                </div>
                <Grid container spacing={3}>
                    {
                        listTournaments.map(item => {
                            if (hideEnded) {
                                return (item.status !== 'ended' ? (<TnCard key={item._id} {...item} onCardClick={handleCardClick} />) : null)
                            } else {
                                return (<TnCard key={item._id} {...item} onCardClick={handleCardClick} />)
                            }
                        })
                    }

                </Grid>
            </div>
        </>
    )
}