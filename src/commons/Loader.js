import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    root: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        color: '#ffffff'
    }
}));

export default function Loader() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <span>Loading...</span>
        </div>
    )
}