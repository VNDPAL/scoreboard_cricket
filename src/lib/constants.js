const PREFIX = `http://localhost:8080/`;
// const PREFIX = `https://expressmon.herokuapp.com/`;
export const GET_TOURNAMENT = () => `${PREFIX}tournament`;
export const SAVE_TOURNAMENT = () => `${PREFIX}tournament`;

export const GET_PLAYER_ROLES = () => `${PREFIX}playerinfo/getPlayerType`;

export const GET_PLAYERS = () => `${PREFIX}playerInfo`;
export const UPDATE_TEAM_STATUS = () => `${PREFIX}tournament/updateTeamStatus`;
export const GET_PLAYERS_BY_TEAM = (player_team_name) => `${PREFIX}playerInfo/getPlayersByTeam?player_team_name=${player_team_name}`;
export const SAVE_PLAYER = () => `${PREFIX}playerInfo`;

export const GET_TEAMS = () => `${PREFIX}tournament/getTeams`;
export const GET_ACTIVE_TEAMS = () => `${PREFIX}tournament/getActiveTeams`;
export const SAVE_TEAM = () => `${PREFIX}tournament/addTeam`;

export const GET_MATCH = () => `${PREFIX}match`;
export const SAVE_MATCH = () => `${PREFIX}match`;
export const START_MATCH = () => `${PREFIX}match/startMatch`;