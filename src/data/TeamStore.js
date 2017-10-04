import {ReduceStore} from 'flux/utils'
import BattleDispatcher from './BattleDispatcher'
import SailorMoon from '../assets/usagi.gif'
import BattleActionTypes from './BattleActionTypes'
import BattleStore from './BattleStore'

function updateTeam(team, action, damage) {
    console.log(damage)
    const teamLocation = team.findIndex(member => 
        member.playerHP > 0)
    const teamCopy = [...team]
    let member = {...teamCopy[teamLocation]}
    if (member.playerHP - damage <= 0){
        member.playerHP = 0
    }
    else {
        member.playerHP -= damage
    }
    teamCopy[teamLocation] = {...member}
    return teamCopy
}
class CharacterStore extends ReduceStore {
    constructor() {
        super(BattleDispatcher)
    }

    getInitialState() {
       return null
    }
    reduce (state, action) {
        switch(action.type) {
            case BattleActionTypes.ATK_BATTLE:
            const newState = {...state}
            const Team = [...newState.Team]
            const member = {...Team[action.Results.enemyTarget]}
            member.playerHP -= action.Results.damage
            if(member.playerHP < 0)
                member.playerHP = 0
            Team[action.Results.enemyTarget] = member
            newState.Team = Team
            return newState

            case BattleActionTypes.INITIALIZE: {
                return action.TeamInfo
            }
            default: 
                return state
        }
    }
}

export default new CharacterStore()