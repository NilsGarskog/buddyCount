<template>
  <body>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
  

    <Particles id="tsparticles" :particlesInit="particlesInit" :options="particlesOptions" />
    
    <div class="bigContainer">
<h1>{{uiLabels.atQ}}</h1>
<h2>{{uiLabels.beHonest}}</h2>
<lottie-player src="https://assets2.lottiefiles.com/packages/lf20_3RIxZt.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
</div>
</body>
</template>

<script>
import io from 'socket.io-client';
import LottiePlayer from '@lottiefiles/lottie-player';
const socket = io();




export default {
  
  components: {
    LottiePlayer,
  },
  data: function() {
    return{
      uiLabels: {},
    }
  },

created: function () {

    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang;
    socket.emit("switchLanguage", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.emit('joinPoll', this.pollId)
    socket.emit("pageLoaded", this.lang);
    socket.on("goToNextPage", () => {
    this.$router.push('/QuestionLobby/' + this.lang+'/'+this.pollId);
    })
},
methods: {

}
}
</script>

<style scoped>
body {
  position: fixed;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;

    touch-action: none;

}

h1{
  font-family: Righteous;
  margin-bottom:4em;
  margin-top:0em;
  font-size:4em;
  cursor: default;
}

h2 {
  font-family: Righteous;
  font-size: 2em;
  margin-top:-7em;
  margin-bottom:-1em;
  cursor:default;
}

.bigContainer {
  height:100vh;
  
display:flex;
flex-direction: column;
  align-items: center;
  justify-content: center;
}

.toolbar {
  display: none;
}
   
</style>