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

const data = [
    { id: '1', name: 'Tournament-1', type: '66', startDate: '01/12/2020', endDate: '12/12/2020', status: 'upcoming' },
    { id: '2', name: 'Tournament-2', type: '66', startDate: '01/12/2021', endDate: '12/12/2021', status: 'ongoing' },
    { id: '3', name: 'Tournament-3', type: '66', startDate: '01/11/2020', endDate: '12/11/2020', status: 'ended' }
]

const TnCard = props => {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4}>
            <ButtonBase className={classes.w100}>
                <Card className={classes.root} onClick={e => (props.onCardClick(e, props))}>
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {props.name}
                        </Typography>
                        <div className={classes.scheduleText}>
                            <CalendarToday className={classes.txtIcon} /> {props.startDate || ' - '} - {props.endDate || ' - '}
                        </div>
                    </CardContent>
                </Card>
            </ButtonBase>
        </Grid>
    )
}

export default function Tournaments(props) {
    const classes = useStyles();
    const [listTournaments, setListTournaments] = React.useState([]);
    const [hideEnded, setHideEnded] = React.useState(false);

    React.useEffect(() => {
        setListTournaments(data);
    }, []);

    const handleChange = e => {
        setHideEnded(p => !p)
    }

    const handleCardClick = (e, tdata) => {
        props.history.push({
            pathname: '/matches',
            state: {
                name: tdata.name
            }
        });
    }

    return (
        <>
            <Header title='Tournaments' rightLink={{ to: '/tournaments/add', label: 'add' }} />
            <div className={classes.pageRoot}>
                <div className={classes.filterRow}>

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
                    />
                </div>
                <Grid container spacing={3}>
                    {
                        listTournaments.map(item => {
                            if (hideEnded) {
                                return (item.status !== 'ended' ? (<TnCard key={item.id} {...item} onCardClick={handleCardClick} />) : null)
                            } else {
                                return (<TnCard key={item.id} {...item} onCardClick={handleCardClick} />)
                            }
                        })
                    }

                </Grid>
            </div>
        </>
    )
}