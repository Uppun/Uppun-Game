import Sprite from '../usagi.gif'
export default {
    default: {
        backgroundPositionX: 353,
        backgroundPositionY: 685,
        height: 40,
        width: 40,
        top: 150,
        left: 250,
        backgroundImage: Sprite,
        zIndex: 2,
    },
    Animation: {
        Walk: {
            start: {top: 853 - 168, left: 423 - 70},
            number: 5,
            time: 350,
            order: 'forward',
            dimensions: {height: 40, width: 40},
        },
        Attack: {
            start: {top: 853 - 252, left: 423 - 310},
            number: 3,
            time: 500,
            order: 'reverse',
            dimensions: {height: 40, width: 40},
        },
        ReverseWalk: {
            start: {top: 853 - 168, left: 423 - 230},
            number: 5,
            time: 1000,
            order: 'reverse',
            dimensions: {height: 40, width: 40},
        },
        Idle: {
            start: {top: 853 - 168, left: 423 - 70},
            number: 1,
            time: 100,
            order: 'forward',
            dimensions: {height: 40, width: 40},
        },
        takeDamage: {
            start: {top: 853 - 211, left: 423 - 230},
            number: 2,
            time: 500,
            order: 'reverse',
            dimensions: {height: 40, width: 40},
        },
        defeat: {
            start: {top: 853 - 219, left: 423 - 270},
            number: 1,
            time: 100,
            order: 'forward',
            dimensions: {height: 40, width: 40},
        },
    },
}
