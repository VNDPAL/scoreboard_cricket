
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import ImgLogo from '../assets/kheladu11.png';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        display: 'block',
        fontSize: '0',
        width: '30px',
        color: 'white'
    },
    offset: theme.mixins.toolbar,
    headerLink: {
        color: 'white',
        textTransform: 'uppercase',
        textDecoration: 'none !important',
        padding: '0.5rem',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const history = useHistory();
    console.log('[render header]', history);
    const onLogoClick = () => {
        history.push('/');
    }

    return (
        <header>
            <AppBar position='fixed'>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={onLogoClick}>
                        <img src={ImgLogo} alt='kheladu11' className={classes.logo} />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.title}
                    </Typography>
                    {
                        props.rightLink ? (
                            <IconButton edge="start" color="inherit" onClick={() => {
                                history.push(props.rightLink.to)
                            }}>
                                <AddIcon />
                            </IconButton>
                        ) : null
                    }
                </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
        </header>
    )
}