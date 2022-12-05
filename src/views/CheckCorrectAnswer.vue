<template>
    <body v-on:click="compareArrays(this.players,this.answers)">
        <div>
            <h1 class="title">ScoreBoard</h1> 
        </div>

    <div class = "oneplayer">
        <div v-for="player in players"
            v-bind:player= "player"
            v-bind:key= "player">
            {{player.answerednumber}}
            {{player.name}}
        </div>   
    </div>

    <div class= "answer">
        <div v-for= "answer in answers"
            v-bind:answer= "answer"
            v-bind:key= "answer">
            {{answer.correctnumber}}
            {{answer.name}}
        </div>
    </div> 

    
        
    </body>

</template>

<script>



function Names (id, num) {
    this.name= id;
    this.answerednumber= num;
}

let name1 = new Names(1233, 12);

let thename= [name1];

function theanswer (id, nb) {
    this.name= id;
    this.correctnumber= nb;
    
}

let answer1= new theanswer(1233,12);

let correctanswer= [answer1];

export default {
  name: "CheckCorrectAnswer",
  components: {},
  data: function () {
    return {
        players: thename, 
        answers: correctanswer,       
    }
},
    methods: {
    compareArrays: function (players,answers) {
        console.log(players,answers);
    if(players.length!=answers.length){
        console.log("hej");
        return false;
    }
    else {
        // check every element of the two arrays
       for(var i=0;i<answers.length;i++){
           if(answers[i].correctnumber!=players[i].answerednumber){
                console.log("hej2");
               return false;}
               else {
                console.log(true);
           return true;
        }
        }
       }
        
        }
    }
}


</script>