import CharacterStore from '../data/CharacterStore'
import React from 'react'
import {Container} from 'flux/utils'

class CharacterWindow extends React.Component {
    static getStores() {
        return [CharacterStore]
    }

    static calculateState(prevState) {
        return {
            ...CharacterStore.getState(),
        }
    }
    render() {
        return (
            <div style = {{...this.state.characterSprite, position: 'absolute'}}>
            </div>
        )
    }
} 

export default Container.create(CharacterWindow)