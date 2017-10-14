import React from 'react'
import {Container} from 'flux/utils'
import TeamStore from '../stores/TeamStore'
import AnimationStore from '../stores/BattleAnimationStore'

class PlayerSprite extends React.PureComponent {
    render() {
        const {player, index} = this.props
        return <div style={{
            ...player.characterSprite,
            position: 'absolute',
            top: player.characterSprite.top + index * 50,
        }} />
    }
}

class AnimatedPlayerSprite extends React.PureComponent {
    componentDidMount() {
        let order
        const {AnimationInfo} = this.props
        (AnimationInfo.order === 'forward') ? order = 1 : order = -1
        for (let currentFrame = 0; currentFrame < this.props.AnimationInfo.frames; currentFrame++){
            setTimeout(() => {
                this.setState({backgroundPositionX: AnimationInfo.startingPosition.left + 
                               (currentFrame * AnimationInfo.dimensions.width * order),
                               backgroundPositionY: AnimationInfo.startingPosition.top})
                }, 1000 * (currentFrame + 1))}
    }
    render() {
        const {player, index} = this.props
        return <div style={{
            ...player.characterSprite,
            position: 'absolute',
            top: player.characterSprite.top + index * 50,
            backgroundPositionX: this.state.backgroundPositionX,
            backgroundPositionY: this.state.backgroundPositionY
        }} />
    }
}

class PlayerTeam extends React.PureComponent {
    static getStores() {
        return [TeamStore, AnimationStore]
    }

    static calculateState(prevState) {
        return {
            ...TeamStore.getState(),
            ...AnimationStore.getState(),
        }
    }

    render() {
        const team = this.state.team
        if (team == null) {
            return null
        }
        let teamSprites
        const currentAnimation = this.state.queue[0]
        teamSprites = team.map((player, index) => (
            (currentAnimation && 
            currentAnimation.type === 'player' &&
            index === this.state.queue[0].currentMember) ? 
                <AnimatedPlayerSprite
                    key={index}
                    player = {player}
                    index = {index}
                    AnimationInfo = {currentAnimation}
                />
                :
                <PlayerSprite
                    key={index}
                    player = {player}
                    index = {index}
                />
            ))
        return (
            <div>
                {teamSprites}
            </div>
        )
    }
}

export default Container.create(PlayerTeam)
