<template>
<body>
    <div id="hideQuestions">
  <img class="hideEye" :src="hidePic" v-on:click="hideQuestion" > 
  <h3> Hide questions </h3>
  </div>
    <h1>Code: {{pollId}}</h1>
<h2>Questions:</h2>
<div class="showQuestions">
<div v-if="!hide">
    <div v-for= "question in questions" v-bind:key="question"> <!--En loop över de "fråge objekten""-->
            {{question.q}}
            
  </div>
  </div>
  <div v-else>
    <div v-for="(question,index) in questions"
    v-bind:key="question">
    Question {{index+1}}
  </div>
  </div>
  </div>

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
      questionObject: "",
      questions: "", /* la till en tom array*/
      data: {},
      uiLabels: {},
      hide: false,
      hidePic: require('../Icons/eyeOpen.png')
    }
  },
    created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("questionUpdate", (update) => {       //Funktion för att hämta fråge-array /Nils
      this.questions = update;
    });
    socket.on("newQuestion", update => {
      this.question = update.q;
      this.data = {};
    });
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
#hideQuestions{
  display:flex;
  flex-direction: column;
  align-items:flex-end;
  width: 95%;
  margin-right: 7em;
  margin-top: 2em;
}
.hideEye{
  height:7em;
  width: 7em;
 
}
</style>