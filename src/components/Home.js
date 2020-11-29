import React from 'react';
import Header from './Header';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ScoreCard from './ScoreCard';

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
}));

const tileData = [
    {
        id: 'x1',
        bg: `https://cdn1.vectorstock.com/i/1000x1000/90/30/batsman-and-bowler-playing-cricket-championship-vector-14239030.jpg`,
        title: 'Tournaments',
        col: 1,
        to: '/tournaments'
    },
    {
        id: 'x2',
        bg: `https://image.freepik.com/free-vector/cricket-match-concept-with-background_30996-1361.jpg`,
        title: 'Players',
        col: 1,
        to: '/players'
    },
    {
        id: 'x3',
        bg: `https://thelivenagpur.com/wp-content/uploads/2019/04/cricket.jpg`,
        title: 'Matches',
        col: 1,
        to: '/matches'
    },
    {
        id: 'x4',
        bg: `https://image.freepik.com/free-vector/cricket-stadium-background-with-golden-cup_23-2147947546.jpg`,
        title: 'Teams',
        col: 1,
        to: '/teams'
    },
    {
        id: 'x5',
        bg: `https://image.freepik.com/free-vector/cricket-stadium-background-with-golden-cup_23-2147947546.jpg`,
        title: 'Contests',
        col: 2,
        to: '/contests'
    },
]

export default function Home(props) {
    const classes = useStyles();

    React.useEffect(() => {

    }, []);

    const handleTileClick = (e, toPath) => {
        props.history.push(toPath);
        console.log('[redirect]', toPath)
    }

    return (
        <>
            <Header title='Premier 11' />
            <div className={classes.pageRoot}>
                <ScoreCard />
                <div>
                    <GridList cellHeight={150} >
                        {
                            tileData.map(d => {
                                return (
                                    <GridListTile key={d.id} cols={d.col} onClick={(e) => { handleTileClick(e, d.to) }}>
                                        <img src={d.bg} alt={d.title} />
                                        <GridListTileBar title={d.title} />
                                    </GridListTile>
                                )
                            })
                        }
                    </GridList>
                </div>
            </div>
        </>
    )
}