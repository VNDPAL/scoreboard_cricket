import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    root: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    }
}));

export default function Loader() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            Loading
        </div>
    )
}