module.exports = {
    name: 'rps',
    execute(message, args){
        if(!args.length) return message.channel.send('the choices are `rock` `paper` and `scissors`');
        let number = Math.floor(Math.random() * 3) + 1;
        if(number === 1){
            if(args[0] === 'rock'){
                message.channel.send('I pick rock, it\s a tie!');
            }else if(args[0] === 'paper'){
                message.channel.send('I pick rock, you win!');
            }else if(args[0] === 'scissors'){
                message.channel.send('I pick rock, I win!');
            }
        }else if(number === 2){
            if(args[0] === 'rock'){
                message.channel.send('I pick paper, I win!');
            }else if(args[0] === 'paper'){
                message.channel.send('I pick paper, it\'s a tie!');
            }else if(args[0] === 'scissors'){
                message.channel.send('I pick paper, you win!');
            }
        }else if(number === 3){
            if(args[0] === 'rock'){
                message.channel.send('I pick scissors, you win!');
            }else if(args[0] === 'paper'){
                message.channel.send('I pick scissors, I win!');
            }else if(args[0] === 'scissors'){
                message.channel.send('I pick scissors, it\'s a tie!');
            }
        }
    }
}
