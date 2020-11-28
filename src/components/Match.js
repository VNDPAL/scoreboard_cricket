import React from 'react';
import Header from './Header';

import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import ButtonBase from '@material-ui/core/ButtonBase';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';

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
    },
    btnRun: {
        margin: 'auto'
    },
    '.MuiGridListTile-tile': {
        display: 'flex'
    },
    radioGroup: {
        flexDirection: 'row',
        '& .MuiFormControlLabel-root': {
            minWidth: 'calc(33.33% - 1rem)',
            background: '#f4f4f4',
            margin: '0.5rem',
            boxShadow: '0px 2px 5px 0px #b4b4b4'
        }
    },
    UpdateRun: {
        width: '100%',
        margin: '1rem 0 0',
        padding: '0.85rem'
    },
    overCard: {
        position: 'relative',
        margin: '2rem 0 0',
        padding: '0 2rem 2rem'
    },
    overDetail: {
        fontSize: 'small',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        textTransform: 'uppercase',
        '& .balls': {
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-evenly',
            minWidth: '150px',
            '& span': {
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                background: '#f2f2f2',
                display: 'inline-block',
                '&.active': {
                    background: '#673AB7'
                }
            }
        }
    }
}));


export default function Match(props) {
    const classes = useStyles();
    // const [listTournaments, setListTournaments] = React.useState([]);
    // const [hideEnded, setHideEnded] = React.useState(false);
    const [pageTitle, setPageTitle] = React.useState('Match');
    const [value, setValue] = React.useState(0);
    const [isWide, setIsWide] = React.useState(false);
    const [isNoball, setIsNoball] = React.useState(false);
    const [isLegbye, setIsLegbye] = React.useState(false);
    const [isBye, setIsBye] = React.useState(false);

    React.useEffect(() => {
        // setListTournaments(data);
        setPageTitle(`${props.location.state.team1} vs ${props.location.state.team2}`)
        console.log('[location]', props.location)
    }, [props.location]);

    const handleChange = e => {
        setValue(e.target.value)
    }

    // const handleCardClick = (e, tdata) => {
    //     // history.push('/match')
    // }

    return (
        <>
            <Header title={pageTitle} />
            <div className={classes.pageRoot}>
                <Paper elevation={2} className={classes.overCard} >
                    <Fab color="secondary" style={{ position: 'relative', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1' }} aria-label="edit">17</Fab>
                    <div className={classes.overDetail}>
                        <div>inn 1</div>
                        <div className={'balls'}>
                            <span className='active'></span>
                            <span className='active'></span>
                            <span className='active'></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <FormControl component="fieldset" style={{ width: '100%' }}>
                        <FormLabel component="legend">Run</FormLabel>
                        <RadioGroup aria-label="gender" name="run" value={value} onChange={handleChange} className={classes.radioGroup}>
                            <FormControlLabel value="0" control={<Radio />} label="0" />
                            <FormControlLabel value="1" control={<Radio />} label="1" />
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                            <FormControlLabel value="4" control={<Radio />} label="4" />
                            <FormControlLabel value="5" control={<Radio />} label="5" />
                            <FormControlLabel value="6" control={<Radio />} label="6" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset" style={{ marginTop: '2rem' }}>
                        <FormLabel component="legend">Extra</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={isWide} onChange={() => { setIsWide(v => !v) }} name="Wide" />}
                                label="Wide"
                            />
                            <FormControlLabel
                                control={<Switch checked={isNoball} onChange={() => { setIsNoball(v => !v) }} name="noBall" />}
                                label="No ball"
                            />
                            <FormControlLabel
                                control={<Switch checked={isLegbye} onChange={() => { setIsLegbye(v => !v) }} name="legBye" />}
                                label="Leg Bye"
                            />
                            <FormControlLabel
                                control={<Switch checked={isBye} onChange={() => { setIsBye(v => !v) }} name="bye" />}
                                label="Bye"
                            />
                        </FormGroup>
                    </FormControl>
                    <div>
                        <Button color="secondary" variant="contained" className={classes.UpdateRun}>Update</Button>
                    </div>
                </Paper>
            </div>
        </>
    )
}