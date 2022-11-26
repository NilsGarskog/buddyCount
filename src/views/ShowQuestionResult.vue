<template>
<body>
    <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
    <h3>De rätta svaren är:</h3>
   <div class="questionResultPage">
    <div class="resultList">
        <div class="participants">
        <div v-for="playerans in PlayersWithAnswers"
        v-bind:player="playerans"
        v-bind:key="playerans.name">
        <img class ="avatarImage" v-bind:src = "playerans.avatar" /> {{playerans.name}} 
        </div>
        </div>
        <div><canvas v-on:click="draw()" id="linesBetweenAnswers"></canvas></div>
        <div class="shuffledNumbers">
        <div v-for="playerans in ShuffledAnswers"
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



function PlayerWithAnswer (nm, av, ans){
    this.name = nm;
    this.avatar = av;
    this.answer = ans;
}



let playerans1 = new PlayerWithAnswer('Nils', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/smiling-face-with-heart-eyes_1f60d.png', Math.floor((Math.random()*100)));
let playerans2 = new PlayerWithAnswer('Samuel', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/cold-face_1f976.png', Math.floor((Math.random()*100)));
let playerans3 = new PlayerWithAnswer('Isak', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/clown-face_1f921.png', Math.floor((Math.random()*100)));
let playerans4 = new PlayerWithAnswer('Linnea', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/front-facing-baby-chick_1f425.png', Math.floor((Math.random()*100)));
let playerans5 = new PlayerWithAnswer('Hanna', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/eagle_1f985.png', Math.floor((Math.random()*100)));
/*let player6 = new PlayerWithAnswer('Jonas', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/top-hat_1f3a9.png',Math.floor((Math.random()*100)));
let player7 = new PlayerWithAnswer('Ali', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/grinning-cat-with-smiling-eyes_1f638.png',Math.floor((Math.random()*100)));
let player8 = new PlayerWithAnswer('Elsa', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/santa-claus_1f385.png',Math.floor((Math.random()*100)));
let player9 = new PlayerWithAnswer('Fido', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/dog-face_1f436.png',Math.floor((Math.random()*100)));
let player10 = new PlayerWithAnswer('Hans', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/man-vampire_1f9db-200d-2642-fe0f.png',Math.floor((Math.random()*100)));
*/

let myPlayersAnswers = [playerans1,playerans2,playerans3,playerans4,playerans5];
let myPlayersAnswersClone = structuredClone(myPlayersAnswers);
let shuffleAnswer = myPlayersAnswersClone.sort(() => Math.random() - 0.5);

console.log(myPlayersAnswers);
console.log(shuffleAnswer);


export default {

data: function () {
    return {
        
        PlayersWithAnswers: myPlayersAnswers,
        ShuffledAnswers: shuffleAnswer,
        
    }
}, 

/*created: function () {
    this.draw();
},*/

methods: {
    ShuffleAnswers: function () {
        var currentIndex = this.PlayersWithAnswers.length;
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
        this.ShuffledAnswers = myRandomizedList;

        console.log(this.ShuffledAnswers);

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
        
       //get DPI
    let dpi = window.devicePixelRatio;
       var canvas = document.querySelector('canvas');
       var ctx = canvas.getContext("2d");
       let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
       let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
       canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);

      
      
       if (canvas.getContext) {
                
        //var colors = ["#75EB00",   "#53BBF4",   "#FF85CB",   "#FF432E",   "#FFAC00",];
                 for(let i = 0; i < this.PlayersWithAnswers.length; i++){
                    const randomColor = Math.floor(Math.random()*16777215).toString(16);
                    console.log(this.PlayersWithAnswers[i]);
                   let endIndex;
                   for(let j = 0; j < this.ShuffledAnswers.length; j++){
                    if(this.PlayersWithAnswers[i].answer == this.ShuffledAnswers[j].answer && this.PlayersWithAnswers[i].name == this.ShuffledAnswers[j].name){
                        endIndex = j;
                    }
                  
                   }
                let startX = 0;
                let startY = ((canvas.height)/(this.PlayersWithAnswers.length)*(i+1))-70;
                let endX = canvas.width;
                let endY = (canvas.height)/(this.PlayersWithAnswers.length)*(endIndex+1)-70;
                var amount = 0;
                
              setInterval(function (){
                amount += 0.0005;
                ctx.beginPath();
                ctx.strokeStyle = "#"+randomColor+"";
                ctx.lineWidth =10;  
                ctx.stroke.lineCap = "round";
                ctx.moveTo(startX, startY);
                ctx.lineTo(startX + (endX - startX)*amount, startY + (endY - startY)*amount);
                ctx.stroke();
              });
                   
  

 
               
            }
            
        
        }
           }
}



}
</script>

<style>

body {
    background-color: #24a07b;
  
}

.avatarImage {

    width: 40px;

}

h3 {
    margin-top: 2.5em;
    font-family: Righteous;
    font-size: 3.5em;
    color: white;
}

.questionResultPage {
    height: auto;
    display:flex;
   padding-top: 2em;
}

.resultList {

    text-align: left;
    width: 100%;
    height: 8em;
    font-family: Righteous;
    font-weight: 100;
    font-size: 3em;
    padding-top: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;

}

.participants {

    height: 8em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-family: righteous;
    font-weight: bold;
}
.shuffledNumbers {
    height: 8em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

/*@keyframes example {
  from {visibility:hidden}
  to {visibility:visible}
}*/



canvas {
   margin-right:0.5em;
   margin-left:0.5em;
    height:8em;
    width: 12em;
    animation-name: example;
  animation-duration: 4s;
    /*right:100%;
    /*animation-name: example;
    animation-duration: 5s;*/
    

    
}
</style>