<template>
<body>
<h1>Code: {{pollId}}</h1>
<h2>Questions:</h2>
{{question}}

</body>

</template>


<script>
import io from 'socket.io-client';
const socket = io();
export default {
  name: 'CreateQHostView',
  data: function () {
    return {
      lang: "",
      pollId: "",
      question: "",
      questions: [], /* la till en tom array*/
      data: {},
      uiLabels: {},
    }
  },
    created: function () {
    this.pollId = this.$route.params.id
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    })
  },
    methods: {
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
    },

    hideQuestion: function(){
      if(this.hide){
        this.hide=false
        this.hidePic=require('../Icons/eyeOpen.png')
      }
      else{
      this.hide = true
      this.hidePic = require('../Icons/eyeClosed.png')
      }
      
      
    }
},
}

</script>


<style>
body{
  position: fixed;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
}
</style>