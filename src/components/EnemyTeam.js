import React from 'react'
import {Container} from 'flux/utils'
import BattleActions from '../actions/BattleActions'
import BattleStore from '../stores/BattleStore'
import AnimationStore from '../stores/BattleAnimationStore'
import Assets from '../assets/Animation_Data'

class EnemySprite extends React.PureComponent {
    handleClick = () => {
        const {onClick, index} = this.props
        if (onClick) onClick(index)
    }

    render() {
        const {enemy, index} = this.props
        return (
            <div
                onClick={this.handleClick}
                style={{
                    ...Assets[enemy.enemy].default,
                    position: 'absolute',
                    top: Assets[enemy.enemy].default.top + index * 50,
                    visibility: enemy.enemyHP > 0 ? 'visible' : 'hidden',
                }}
            />
        )
    }
}

class AnimatedEnemySprite extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            backgroundPositionX: props.AnimationInfo.startingPosition.left,
            backgroundPositionY: props.AnimationInfo.startingPosition.top,
        }
    }

    componentDidMount() {
        const {AnimationInfo} = this.props
        const order = AnimationInfo.order === 'forward' ? -1 : 1
        for (let currentFrame = 1; currentFrame < AnimationInfo.frames; currentFrame++) {
            setTimeout(() => {
                this.setState({
                    backgroundPositionX:
                        AnimationInfo.startingPosition.left + currentFrame * AnimationInfo.dimensions.width * order,
                })
            }, 250 * currentFrame)
        }
        setTimeout(() => {
            BattleActions.animationDone()
        }, AnimationInfo.frames * 250)
    }
    handleClick = () => {
        const {onClick, index} = this.props
        if (onClick) onClick(index)
    }

    render() {
        const {enemy, index} = this.props
        return (
            <div
                onClick={this.handleClick}
                style={{
                    ...Assets[enemy.enemy].default,
                    position: 'absolute',
                    top: Assets[enemy.enemy].default.top.top + index * 50,
                    visibility: enemy.enemyHP > 0 ? 'visible' : 'hidden',
                    backgroundPositionX: this.state.backgroundPositionX,
                    backgroundPositionY: this.state.backgroundPositionY,
                }}
            />
        )
    }
}

class EnemyTeam extends React.PureComponent {
    static getStores() {
        return [BattleStore, AnimationStore]
    }

    static calculateState(prevState) {
        const battles = BattleStore.getState()
        if (battles == null) {
            return null
        }

        return {...battles.stages[battles.currentStage], ...AnimationStore.getState()}
    }

    handleClickTarget = index => {
        BattleActions.updateTarget(index)
    }

    render() {
        const enemies = this.state.enemies
        if (enemies == null) {
            return null
        }
        const currentAnimation = this.state.queue[0]
        const enemySprites = enemies.map(
            (enemy, index) =>
                currentAnimation &&
                currentAnimation.type === 'enemy' &&
                index === currentAnimation.info.currentMember ? (
                    <AnimatedEnemySprite
                        key={index}
                        enemy={enemy}
                        index={index}
                        AnimationInfo={currentAnimation.info}
                    />
                ) : (
                    <EnemySprite key={index} enemy={enemy} index={index} />
                )
        )
        return <div>{enemySprites}</div>
    }
}

export default Container.create(EnemyTeam)
