import React from 'react';
// import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';

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
}));

export default function ScoreCard(props) {
    const classes = useStyles();

    React.useEffect(() => {

    }, []);

    return (
        <>
            <div className={classes.pageRoot}>
                No matches scheduled
            </div>
        </>
    )
}