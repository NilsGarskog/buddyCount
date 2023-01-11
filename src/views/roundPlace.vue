<template>
  <body id="body">
  <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
    <div id="fullPage">
   <!--  <div v-if="first===show">
    <ConfettiExplosion /> 
    </div>-->
  <div class="firstPlace" v-if="first===show">
    <div v-if="over===false">
    <h1>{{uiLabels.firstPlace}}</h1>
    <h2> {{uiLabels.firstPLaceText}}</h2>
    </div>
    <div v-if="over===true">
    <h1>{{uiLabels.firstPlaceEnd}}</h1>
    <h2> {{uiLabels.firstPlaceEndText}}</h2>
    </div>
  </div>
  <div class="lastPlace" v-if="last===show">
    <div v-if="over===false">
    <h1>{{uiLabels.lastPLace}}</h1>
    <h2> {{uiLabels.lastPLaceText}}</h2>
    </div>
    <div v-if="over===true">
    <h1>{{uiLabels.lastPlaceEnd}}</h1>
    <h2> {{uiLabels.lastPlaceEndText}}</h2>
    </div>
  </div>
  <div class="mediokerPlace" v-if="medioker===show">
    <div v-if="over===false">
    <h1>{{uiLabels.mediocrePlace}}</h1>
    <h2> {{uiLabels.mediocrePLaceText}}</h2>
    </div>
    <div v-if="over===true">
    <h1>{{uiLabels.mediocrePLaceEnd}}</h1>
    <h2> {{uiLabels.mediocrePLaceEndText}}</h2>
    </div>
  </div>
</div>
  </body>
</template>

<script>
import io from 'socket.io-client';

  //import ConfettiExplosion from "vue-confetti-explosion";
  import JSConfetti from 'js-confetti'


 
const socket = io();
export default {
  components: {
    //ConfettiExplosion,

  },

  data: function () {
    return {
      show: '',
      first: 'FP',
      last: 'LP',
      medioker:'MP',
      placement: "",
      players:[],
      confettiDone: false,
      lang:"en",
      uiLabels: {},
      over: false
      

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
    socket.on("goToNextRound", () => {
      this.$router.push('/guessQuestion/' + this.lang+'/'+this.pollId+'/'+this.playerId);
    }),
    socket.on("ItIsOver", () => {
      this.over=true;
    })
    socket.on("sendPlayers", (players) => {
      this.players = players
      this.players.sort((a,b) => a.points - b.points);
      this.players.reverse()
      for(let i=0; i<this.players.length; i++){
        if (this.players[i].playerId == this.playerId){
          console.log("inside if loop, i =",i)
          this.placement = i;
          this.checkPlace()
          if(this.confettiDone == false){
          this.confetti()
          this.confettiDone = true;
        }
      }
      }
      
    })
    socket.emit("isItOver", this.pollId)
    socket.emit("getPlayers", this.pollId)
    
  },

 

  methods: {
      checkPlace: function(){
        if(this.placement==0){
          this.show = 'FP';
        }
        else if(this.placement==this.players.length-1){
          this.show = 'LP';
        }
        else{
          this.show = 'MP';
        }
      },

      confetti: function(){
        console.log('confetti',this.show)

  const jsConfetti = new JSConfetti()
  if(this.first===this.show){
    jsConfetti.addConfetti()
  }
  else if(this.medioker===this.show){
    document.getElementById('body').style.background="#e7f5ab"
    let emojiarray = [['🥛','🧃'],['🥛','🤷']]
    const randomElement = emojiarray[Math.floor(Math.random() * emojiarray.length)];
jsConfetti.addConfetti({
   emojis: randomElement,
   emojiSize: 200,
})}
else if(this.last===this.show){
  document.getElementById('body').style.background="#e87da8"
  let emojiarray = [['💩','🚽'],['💩','❌']]
    const randomElement = emojiarray[Math.floor(Math.random() * emojiarray.length)];
  jsConfetti.addConfetti({
   emojis: randomElement,
   emojiSize: 200,
})}}
  }

}





</script>

<style scoped>
body {
  position:absolute;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
}

h1,h2{
  font-family: Righteous;
}
button{
  width:100px;
  height: 100px;
}

@media (max-width:450px) {

  html {
    height: -webkit-fill-available; /* We have to fix html height */
}

  .firstPlace, .lastPlace, .mediokerPlace {
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 630px;
    align-content: center;
  }

  h1 {
    font-size: 1.8em;
    margin-bottom:0px;
    margin-left:15px;
    margin-right:15px;
  }

  #fullPage {
    min-height: 100%
  }
}
@supports(padding:max(0px)) {
    body, header, footer {
        padding-left: min(0vmin, env(safe-area-inset-left));
        padding-right: min(0vmin, env(safe-area-inset-right));
        padding-top: min(0vmin, env(safe-area-inset-top));
        padding-bottom: min(0vmin, env(safe-area-inset-bottom));
    }
}

</style>