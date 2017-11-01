import Sprite from '../rei.gif'
export default {
    default: {
        backgroundPositionX: 100,
        backgroundPositionY: 355,
        height: 40,
        width: 39,
        top: 150,
        left: 50,
        backgroundImage: `url(${Sprite})`,
        zIndex: 2,
        visibility: 'visible',
    },
    Animation: {
        Walk: {
            start: {top: 634 - 279, left: 421 - 319},
            number: 5,
            time: 1000,
            order: 'reverse',
            dimensions: {height: 37, width: 19},
        },
        Attack: {
            start: {top: 634 - 491, left: 421 - 345},
            number: 6,
            time: 1000,
            order: 'reverse',
            dimensions: {height: 43, width: 40},
        },
        ReverseWalk: {
            start: {top: 624 - 279, left: 421 - 159},
            number: 5,
            time: 1000,
            order: 'forward',
            dimensions: {height: 37, width: 19},
        },
        Idle: {
            start: {top: 634 - 279, left: 421 - 319},
            number: 1,
            time: 100,
            order: 'forward',
            dimensions: {height: 37, width: 19},
        },
        takeDamage: {
            start: {top: 634 - 361, left: 421 - 236},
            number: 1,
            time: 500,
            order: 'reverse',
            dimensions: {height: 34, width: 24},
        },
        defeat: {
            start: {top: 634 - 364, left: 421 - 199},
            number: 2,
            time: 200,
            order: 'reverse',
            dimensions: {height: 27, width: 24},
        },
    }
}
