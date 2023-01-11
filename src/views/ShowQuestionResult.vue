<template>
<body>
    <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
    <h3 id="correctAnswers">{{uiLabels.correctAnswers}}</h3>
   <div class="questionResultPage">
    <div class="resultList">
        <div class="participants">
        <div v-for="playerans in playerWansArr"
        v-bind:player="playerans"
        v-bind:key="playerans.name">
        <img class ="avatarImage" :src="require('../Icons/' + playerans.avatar + '.png')" /> {{playerans.name}} 
        </div>
        </div>
        <div id ="canvasContainer" ><canvas height="100" width="100" style="object-fit:contain;"></canvas></div>
        <div class="shuffledNumbers">
        <div v-for="playerans in shuffleAnswer"
        v-bind:playerans="playerans"
        v-bind:key="playerans.answer">
        {{playerans.answer}}
        </div>
    </div>
    </div>
    </div>
    
</body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {

data: function () {
    return {
        
        // playerWansArr: playerWansArr,
        // shuffleAnswer: shuffleAnswer,
      pollId:'',
      lang:'en',
      playerId:'',

      timerId: setInterval(this.timer, 1000),
      timeLeft: 10,
      sendTimer: false,
      Answers:[],
      players:[],
      playerWansArr:[],
      shuffleAnswer: [],
      assembled: false,
      uiLabels: {},

    }
},
  created: function () {

    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang;
    this.playerId = this.$route.params.playid;
    socket.emit('joinPoll', this.pollId)
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })

    socket.on("goToScoreBoard", () => {
      this.$router.push('/ScoreBoard2/' + this.lang+'/'+this.pollId);
    });
        socket.on("goToPodium", () => {
      this.$router.push('/PodiumView/' + this.lang+'/'+this.pollId);
    });

    socket.on("AnswersForResult", (Answers) => {
      this.Answers = Answers
      socket.emit("getPlayers", this.pollId)
    })

    socket.on("sendPlayers", (players) => {
      this.players = players
      if(this.assembled==false){
    this.assembleArr()
      }
    })

    
    socket.emit("getAnswerForResult", this.pollId)

  },


/*created: function () {
    this.draw();
},*/

methods: {
    ShuffleAnswers: function () {
        var currentIndex = this.playerWansArr.length;
        var temporaryValue;
        var randomIndex;
        var myRandomizedList;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = myRandomizedList[currentIndex];
            myRandomizedList[currentIndex] = myRandomizedList[randomIndex];
            myRandomizedList[randomIndex] = temporaryValue;
        }
        this.shuffleAnswer = myRandomizedList;


    },

  // timer: function(timerId){
  //   if (this.timeLeft == 0) {
  //     if(!this.sendTimer)
  //     {
  //       socket.emit("goToScoreBoard",this.pollId)
  //       socket.emit("roundOver", this.pollId)

  //       clearTimeout(timerId);
  //       timerId = null;
  //       this.sendTimer = true;
  //     }

  //   } else {
  //     return this.timeLeft--;
  //   }
  // },

    assembleArr: function() {
        for (let player of this.players){
            for (let answer of this.Answers){
                if (player.playerId == answer.playerId){
                    this.playerWansArr.push({playerId: player.playerId, name:player.name, avatar: player.avatar[0].image, answer: answer.answer})
                }
            }
        }
        let myPlayersAnswersClone = structuredClone(this.playerWansArr);
        this.shuffleAnswer = myPlayersAnswersClone.sort(() => Math.random() - 0.5);
        this.draw();
        this.assembled=true;
    },


   /* draw: function (startx,starty,endx,endy) {
       
const canvas = document.querySelector('canvas');
if (canvas.getContext) {
          const ctx = canvas.getContext("2d");

          ctx.fillStyle = "rgb(200, 0, 0)";
          ctx.fillRect(10, 10, 50, 50);

          ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
          ctx.fillRect(30, 30, 50, 50);

          ctx.beginPath();
ctx.moveTo(startx, starty);
ctx.lineTo(endx, endy);
ctx.stroke();
        }
    },*/

    draw: function () {
        //var shuffle = document.querySelector(".shuffledNumbers");
       //get DPI
    let dpi = window.devicePixelRatio;
       var canvas = document.querySelector('canvas');
       var ctx = canvas.getContext("2d");
       let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
       let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
       canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);

      
      
       if (canvas.getContext) {
                
                var colors = ["red",   "yellow",   "blue",   "orange",   "purple","pink","brown","aquamarine","black","white"];
                 for(let i = 0; i < this.playerWansArr.length; i++){
                    //const randomColor = Math.floor(Math.random()*16777215).toString(16);
                   let endIndex;
                   for(let j = 0; j < this.shuffleAnswer.length; j++){
                    if(this.playerWansArr[i].answer == this.shuffleAnswer[j].answer && this.playerWansArr[i].name == this.shuffleAnswer[j].name){
                        endIndex = j;
                    }
                  
                   }
                let startX = 0;
                let startY = ((canvas.height)/(this.playerWansArr.length-1)*(i));
                let endY = (canvas.height)/(this.playerWansArr.length-1)*(endIndex);
                let endX = canvas.width;
                if(i==0){
                    startY = 20;
                }
                else if(i == this.playerWansArr.length){
                    startY = canvas.height-20;
                }
                else{
                    startY = ((canvas.height)/(this.playerWansArr.length-1)*(i));
                } 
             
                
                if(endIndex == 0){
                    endY = 20;
                }
                else if(endIndex == this.playerWansArr.length-1){
                    endY = canvas.height-20;
                }
                else {
                    endY = (canvas.height)/(this.playerWansArr.length-1)*(endIndex);
                } 
                var amount = 0;
                var playlen = this.playerWansArr.length;
              setInterval(function (){

                amount += 0.001*(1-0.1*(playlen-1));

                ctx.beginPath();
                ctx.strokeStyle = colors[i];
                ctx.lineWidth =10;  
                ctx.stroke.lineCap = "round";
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX + (endX - startX)*amount, startY + (endY - startY)*amount);
                ctx.stroke();
              });
                   
  

 
               
            }
            
        
        }
           }
},




}
</script>

<style scoped>

body {
  background-color: #24a07b;
   overflow: hidden;
  width: 100vw;
  min-height: 100vh;
  
}

.avatarImage {

    width: 40px;

}
#correctAnswers{
  color:black;
}

h3 {
    margin-top: 1em;
    margin-bottom: 0em;
    font-family: Righteous;
    font-size: 3.5em;
    color: white;
}

.questionResultPage {
    height: 100%;
    display:flex;
   padding-top: 2em;
}

.resultList {

    text-align: left;
    width: 100%;
    height: 100%;
    font-family: Righteous;
    font-weight: 100;
    font-size: 3em;
    padding-top: 0;
    /*overflow: hidden;*/
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
   /* border: 1px solid black;*/

}

.participants {

    /*height: 8em;*/
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: righteous;
    font-weight: bold;
    margin-right: 1em;
}
.shuffledNumbers {
    /*height: 8em;*/
    display: flex;
    margin-left: 1em;
    flex-direction: column;
    justify-content: space-between;
}

/*@keyframes example {
  from {visibility:hidden}
  to {visibility:visible}
}*/



canvas {
    
  width: 12em;
  height: 90%;
  /*border: 1px solid red;*/
  display: block;
  margin-top: 0.5em;
}

#canvasContainer {
/*height: 100%;*/
width: 12em;
display:flex;
justify-content: center;
/*border: 1px solid blue;*/

}

#nextButtonContainer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

#nextButton {
margin-right: 5em;
margin-bottom: 5em;
margin-top: -7em;
padding: 2em;
background-color: #046B79;
border-radius: 5em;
border: 1px solid;
transition: 0.2s;
box-shadow: 0px 5px 4px #046B79;
}

#nextButton:hover {
    background-color: #00acae;
    transition: 0.2s;
    cursor: pointer;
}
#arrowIcon {
height: 3em;
width: 3em;
}
</style>