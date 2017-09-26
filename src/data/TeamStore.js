import {ReduceStore} from 'flux/utils'
import BattleDispatcher from './BattleDispatcher'
import SailorMoon from '../assets/usagi.gif'
import BattleActionTypes from './BattleActionTypes'

function updateTeam(team, action) {
    console.log("Got here")
    const teamLocation = team.findIndex(member => 
        member.playerHP > 0)
    const teamCopy = [...team]
    let member = {...teamCopy[teamLocation]}
    if (member.playerHP - action.enemyDamage <= 0){
        member.playerHP = 0
    }
    else {
        member.playerHP -= action.enemyDamage
    }
    teamCopy[teamLocation] = {...member}
    return teamCopy
}
class CharacterStore extends ReduceStore {
    constructor() {
        super(BattleDispatcher)
    }

    getInitialState() {
        let TeamArray = []
        const TeamSize = Math.floor((Math.random()*4) + 1)
        const testPlayer = {
            characterSprite: {
                backgroundPositionX: 353,
                backgroundPositionY: 685,
                height: 40,
                width: 40,
                top: 100,
                left: 250,
                backgroundImage: `url(${SailorMoon})`,
                zIndex: 2
            },
            playerHP: Math.floor((Math.random()*50)+21),
            playerBaseAtk: Math.floor((Math.random()*10)+1)
        }

        for (let i = 0; i < TeamSize; i++) {
                TeamArray.push(testPlayer)
            }
        const TeamState = {Team: TeamArray}
        return (TeamState)
    }
    reduce (state, action) {
        switch(action.type) {
            case BattleActionTypes.ATK_BATTLE:
                const newState = {...state}
                let TeamArrayCopy = [...newState.Team]
                TeamArrayCopy = updateTeam(TeamArrayCopy, action)
                newState.Team = TeamArrayCopy
                return newState
            default: 
                return state
        }
    }
}

export default new CharacterStore()