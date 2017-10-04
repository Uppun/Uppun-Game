import React from 'react'
import {Container} from 'flux/utils'
import TeamStore from '../data/TeamStore'

class TeamWindow extends React.Component {
    static getStores() {
        return [TeamStore]
    }

    static calculateState(prevState) {
        return {
            ...TeamStore.getState(),
        }
    }

    render() {
        if (this.state.Team != null) {
            return (
                <div>
                    {this.state.Team.map((player, index) => (
                        <div
                            key={index}
                            style={{
                                ...player.characterSprite,
                                position: 'absolute',
                                top: player.characterSprite.top + index * 50,
                            }}
                        />
                    ))}
                </div>
            )
        }

        return null
    }
}

export default Container.create(TeamWindow)
