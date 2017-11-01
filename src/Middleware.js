import BattleActions from './actions/BattleActions'
import Dispatcher from './Dispatcher'
import BattleAnimationStore from './stores/BattleAnimationStore'

let socket

function send(data) {
    if (!socket) {
        console.log("No socket! :(")
        return;
    }
    socket.send(JSON.stringify(data));
}

function connect(){
    socket = new WebSocket('ws://localhost:9000')
    socket.addEventListener('message', (event) => {
        let recievedData

        try{
            recievedData = JSON.parse(event.data)
        } catch(err) {
            console.warn('invalid json:', event.data);
            console.warn(err);
        }
        console.log(recievedData)
        switch(recievedData.type) {
            case 'connection':
                send({type: 'initialize'})
                break;
            case 'initialize': 
                BattleActions.initialize(recievedData.game)
                break;
            case 'attack':
                for (const attack of recievedData.teamAttacks) {
                    BattleActions.enemyAttacked(attack)
                }

                for (const attack of recievedData.enemyAttacks) {
                    BattleActions.playerAttacked(attack)
                }
                
                BattleActions.changeStage(recievedData.stageUpdate)
        }
    })
}

function sendAttack(target) {
    send({type: 'attack', target})
}

export default {connect, sendAttack}
