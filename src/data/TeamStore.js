import {ReduceStore} from 'flux/utils'
import BattleDispatcher from './BattleDispatcher'
import BattleActionTypes from './BattleActionTypes'

class CharacterStore extends ReduceStore {
    constructor() {
        super(BattleDispatcher)
    }

    getInitialState() {
        return null
    }
    // eslint-disable-next-line class-methods-use-this
    reduce(state, action) {
        switch (action.type) {
            case BattleActionTypes.ATK_BATTLE: {
                const newState = {...state}
                const Team = [...newState.Team]
                const member = {...Team[action.Results.enemyTarget]}
                member.playerHP -= action.Results.damage
                if (member.playerHP < 0) member.playerHP = 0
                Team[action.Results.enemyTarget] = member
                newState.Team = Team
                return newState
            }

            case BattleActionTypes.INITIALIZE: {
                return action.TeamInfo
            }
            default:
                return state
        }
    }
}

export default new CharacterStore()
