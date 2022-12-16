<template>
        <link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
  <body>
<h1>Answer the questions!</h1>
</body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {


created: function () {

    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang;
    socket.emit('joinPoll', this.pollId)
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
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
}

h1{
  font-family: Righteous;
}

</style>