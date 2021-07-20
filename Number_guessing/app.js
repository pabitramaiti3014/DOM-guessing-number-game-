//Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    gussesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent=min;
maxNum.textContent=max;

//play again event listner
game.addEventListener('mousedown',function(e){
  if(e.target.className=='play-again'){
    window.location.reload();
  }
});
//listen for guess
guessBtn.addEventListener('click',function(){
  let guess = parseInt(guessInput.value);
  
  //validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`please enter the number between ${min} and ${max}`,'red');
  }

  //check if won
  if(guess == winningNum){
    //gameover - won
     gameOver(true,`${winningNum} is corret,YOU WIN!!`);

  }else{
    //wrong number
    gussesLeft -= 1;

    if(gussesLeft===0){
     //gameOver-lost
      gameOver(false,`Game Over, you Lost. The correct number was ${winningNum}`);
    }else{
      //game continues - answer wrong

    //change border color
    guessInput.style.borderColor = 'red';

    //clear guessInput
    guessInput.value='';

    //Tell user its the wrong Number
      setMessage(`${guess} is not correct, ${gussesLeft} guesses left`,'red');
      
    }

   
  }
  
});

//game over
function gameOver(won,msg){
 let color;
 won==true ? color='green': color='red';

  //disable input
  guessInput.disabled = true;
  //change border color
  guessInput.style.borderColor = color;
  //text color
  message.style.color = color;
  //setMessage
  setMessage(msg);

  //play Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';

}

//Get Winning Number
function getRandomNum(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function setMessage(msg,color){
  message.style.color=color;
  message.textContent=msg;
}