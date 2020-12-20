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
    emtty: {
        paddingLeft: '1rem'
    },
    divSameLine: {
        display: 'inline-block',
        padding: '1rem'
    }
}));

export default function ScoreCard(props) {
    const classes = useStyles();

    React.useEffect(() => {

    }, []);

    return (
        <>
            <div className={classes.pageRoot}>
                <div className={classes.emtty}>
                    <div className={classes.divSameLine}>
                        <span>Mumbai Indians</span><span className={classes.emtty}>200-4</span>
                    </div>
                    <div className={classes.divSameLine}>
                        <span>overs</span><span className={classes.emtty}>10.5</span>
                    </div>
                    <div className={classes.divSameLine}>
                        <span>Rohit <span>20(10)</span></span><span className={classes.emtty}>Virat <span>30(20)</span></span>
                    </div>
                </div>
                <div className={classes.emtty}>
                    <div className={classes.divSameLine}>
                        <span>Bumrah</span><span className={classes.emtty}>0-60 7.5</span>
                    </div>
                    <div className={classes.divSameLine}>
                        <span>Required Rate</span><span className={classes.emtty}>5.6</span>
                    </div>
                </div>
            </div>
        </>
    )
}