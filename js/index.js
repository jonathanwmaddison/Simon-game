var sounds = {
  "red": new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  "blue": new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  "yellow": new Audio ( 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  "green":new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
};

sounds.red.preload="auto";
sounds.blue.preload="auto";
sounds.yellow.preload="auto";
sounds.green.preload="auto";



var buttonIDs = ["red","yellow","green","blue"];
var gameData =[];
var playerData=[];
var playerTurn=false;
var timer = 700-gameData.length*5;
var strictMode = false;
var colorChanges = {
  "red": ["#FF79A1","red"],
  "blue": ["#33CCFF","blue"],
  "yellow": ["#CCFF99","yellow"],
  "green": ["#66FF33","green"]
};
function changeToStrict(){
  if(strictMode){
    strictMode=false;
  } else {
    strictMode=true;
  }
}
function resetGame(){
  playerTurn=false;
  gameData=[];
  playerData=[];
   $("#countBox").html(0);
}

function cpuPlay(){
  timer = 600-gameData.length*8
  if(!playerTurn){
    if (gameData.length==0){
      var randomNum=Math.floor(Math.random()*(3 - 0 + 1)) + 0;
      buttonSoundColor(buttonIDs[randomNum]);
      gameData.push(buttonIDs[randomNum]);
      $("#countBox").html(1);
      playerTurn=true;
    }
    else if(gameData.length>playerData.length){
      playerTurn=true;
    }
    else if(gameData.length===20){
      gameData=[];
      $("#countBox").html("WIN!");
      playerTurn = false;
      return; 
    }
    else {
      if(JSON.stringify(gameData)===JSON.stringify(playerData)){
        var i = 0;               
        function myLoop () {     
          setTimeout(function () { 
            buttonSoundColor(gameData[i]);
            i++;                   
            if (i < gameData.length) {           
              myLoop();           
            }                       
          }, timer)
        }
      var randomNum=Math.floor(Math.random()*(3 - 0 + 1)) + 0;
      gameData.push(buttonIDs[randomNum]);
      myLoop();  
      $("#countBox").html(gameData.length); 
      playerData=[];
      playerTurn=true;
      } else {
        if(strictMode){
       $("#countBox").html("Fail");
        } else {
          $("#countBox").html("Retry " +gameData.length);
          var i = 0;               
        function myLoop () {     
          setTimeout(function () { 
            buttonSoundColor(gameData[i]);
            i++;                   
            if (i < gameData.length) {           
              myLoop();           
            }                       
          }, timer)
        }
            myLoop();
            playerData=[];
            playerTurn=true;
        }
        
      }
    }
  }
}



function changeButtonColor(color){
  var input="#" +color;
   $(input).css('background-color', colorChanges[color][0]);
  setTimeout(function () {
      $(input).css('background-color', colorChanges[color][1]);
    }, 100);
}
function buttonSoundColor(id){
   sounds[id].play()
   changeButtonColor(id)
}

function pressButton(id){
  buttonSoundColor(id);
  if(playerTurn){
    playerData.push(id);
    playerTurn=false;
    setTimeout(function(){ cpuPlay()},500)

  }
}