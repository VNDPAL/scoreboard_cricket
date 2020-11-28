import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loader from '../commons/Loader';
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
// }));

const Tournaments = React.lazy(() => import('./Tournaments'));
const AddTournaments = React.lazy(() => import('./AddTournament'));
const Matches = React.lazy(() => import('./Matches'));
const AddMatches = React.lazy(() => import('./AddMatch'));
const Players = React.lazy(() => import('./Players'));
const AddPlayer = React.lazy(() => import('./AddPlayer'));
const Teams = React.lazy(() => import('./Teams'));
const AddTeams = React.lazy(() => import('./AddTeam'));
const Contests = React.lazy(() => import('./Contests'));
const AddContest = React.lazy(() => import('./AddContest'));
const Match = React.lazy(() => import('./Match'));
const Home = React.lazy(() => import('./Home'));

export default function Layout(props) {
    // const [showLoader, setShowLoader] = React.useState(false);
    // const classes = useStyles();

    console.log('[layout]', props)

    return (
        <>
            <React.Suspense fallback={<Loader show='true' />}>
                <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='/tournaments' exact component={Tournaments} />
                    <Route path='/tournaments/add' component={AddTournaments} />
                    <Route path='/matches' exact component={Matches} />
                    <Route path='/matches/add' component={AddMatches} />
                    <Route path='/players' exact component={Players} />
                    <Route path='/players/add' component={AddPlayer} />
                    <Route path='/teams' exact component={Teams} />
                    <Route path='/teams/add' component={AddTeams} />
                    <Route path='/contests' exact component={Contests} />
                    <Route path='/contests/add' component={AddContest} />
                    <Route path='/match' component={Match} />
                    <Redirect from='/' to='home' />
                </Switch>
            </React.Suspense>
        </>
    )
}