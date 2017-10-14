import React from 'react'
import {Container} from 'flux/utils'
import TeamStore from '../stores/TeamStore'
import AnimationStore from '../stores/BattleAnimationStore'
import BattleActions from '../actions/BattleActions'

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
    constructor(props) {
        super(props)
        this.state = {backgroundPositionX: props.AnimationInfo.startingPosition.left,
                      backgroundPositionY: props.AnimationInfo.startingPosition.top}
    }
    componentDidMount() {
        const {AnimationInfo} = this.props
        const order = AnimationInfo.order === 'forward' ? -1 : 1
        for (let currentFrame = 1; currentFrame < AnimationInfo.frames; currentFrame++){
            setTimeout(() => {
                this.setState({backgroundPositionX: AnimationInfo.startingPosition.left + 
                               (currentFrame * AnimationInfo.dimensions.width * order)})
                }, 250 * (currentFrame))}
            setTimeout(() => {
                BattleActions.animationDone()
            }, AnimationInfo.frames * 250)
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
            index === currentAnimation.info.currentMember) ? 
                <AnimatedPlayerSprite
                    key={index}
                    player = {player}
                    index = {index}
                    AnimationInfo = {currentAnimation.info}
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
