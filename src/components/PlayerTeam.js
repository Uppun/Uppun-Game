import React from 'react'
import {Container} from 'flux/utils'
import TeamStore from '../stores/TeamStore'

class PlayerSprite extends React.PureComponent {
    render() {
        return <div style={this.props.style} />
    }
}

class PlayerTeam extends React.PureComponent {
    static getStores() {
        return [TeamStore]
    }

    static calculateState(prevState) {
        return {
            ...TeamStore.getState(),
        }
    }

    render() {
        const {team} = this.state
        if (team == null) {
            return null
        }

        return (
            <div>
                {team.map((player, index) => (
                    <PlayerSprite
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
}

export default Container.create(PlayerTeam)
