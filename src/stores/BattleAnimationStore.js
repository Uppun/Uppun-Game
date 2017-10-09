import Middleware from '../Middleware'
import {ReduceStore} from 'flux/utils'
import Dispatcher from '../Dispatcher'
import ActionTypes from '../actions/ActionTypes'
import Sprites from '../assets/Animation_Data'

class BattleAnimationStore extends ReduceStore {
    constructor() {
        super(Dispatcher)
    }


    getInitialState() {
        return null
    }

    reduce(state, action) {
        switch(action.type) {
            case ActionTypes.ENEMY_ATTACKED:
                let newState = {...state}
                let currentMember = action.attacker
                newState = {currentMember, frames: Sprites.Usagi.Attack.number, order: Sprites.Usagi.Attack.order, startingPosition: Sprites.Usagi.Attack.start}
                Middleware.Animate(newState)
                return newState
        }
    }
}