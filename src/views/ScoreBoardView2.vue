<template>
    <body>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet' type='text/css'>

    <div>
        <h1 class="title">ScoreBoard</h1> 
    </div>

    <div class="topfive">
    <div class="playerList">
    <div v-for="name in names"
      v-bind:name="name"
      v-bind:key="name">
      <img class="avatarImage" v-bind:src = "name.avatar" />
      {{name.message}}
    </div>
    </div>

    <div class="amountofpoints">
    <div v-for="point in points"
      v-bind:point="point"
      v-bind:key="point.amount">
      {{ point.amount }}  
    </div>
    </div>
</div>
</body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

function ScoreBoardNames (nm, av) {
    this.message= nm;
    this.avatar=av;
    
}

let name1= new ScoreBoardNames('Linnea', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/smiling-face-with-heart-eyes_1f60d.png');
let name2= new ScoreBoardNames('Hanna', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/smiling-face-with-heart-eyes_1f60d.png');
let name3= new ScoreBoardNames('Samuel', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/smiling-face-with-heart-eyes_1f60d.png');
let name4= new ScoreBoardNames('Isak', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/smiling-face-with-heart-eyes_1f60d.png');
let name5= new ScoreBoardNames('Nils', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/smiling-face-with-heart-eyes_1f60d.png');

let mynames= [name1, name2, name3, name4, name5];


console.log(mynames);

function ScoreBoardPoints(po) {
    this.amount=po;
}

let point1= new ScoreBoardPoints(12);
let point2= new ScoreBoardPoints(14);
let point3= new ScoreBoardPoints(16);
let point4= new ScoreBoardPoints(20);
let point5= new ScoreBoardPoints(22);


let mypoints= [point1, point2, point3, point4, point5];



export default {
  name: "ScoreBoardView2",
  components: {},
  data: function () {
    return {
        names: mynames,
        points: mypoints,
        lang: "",
        pollId: "",
        timerId: setInterval(this.timer, 1000),
        timeLeft: 10,
        sendTimer: false,
    }


},
  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang
    socket.emit('joinPoll', this.pollId);
    socket.emit("pageLoaded", this.lang);

    socket.on("goToNextRound", () => {
      this.$router.push('/QuestionLobby/' + this.lang+'/'+this.pollId);
    });
  },
  methods:{
    timer: function(timerId){
      if (this.timeLeft == 0) {
        if(!this.sendTimer)
        {
          console.log("slut")
          socket.emit("goToNextRound",this.pollId)

          clearTimeout(timerId);
          timerId = null;
          this.sendTimer = true;
        }

      } else {
        console.log(this.timeLeft)
        return this.timeLeft--;
      }
    }
  }
}
</script>
<style>

body {
    background-color: #24a07b;
    font-family:Righteous ;
  
}
.title {
font-family: monoton;
font-size: 4em;
margin-top: 0em;
font-weight: 300;
}

.avatarImage {
    width: 40px;
}

.playerList {
 font-size: 3em;
 text-align: left;
 margin-left: 7em;
}

.amountofpoints {
font-size: 3em;
 text-align: right;
 margin-right: 7em;
 margin-top: -6.1em;
}

</style>
