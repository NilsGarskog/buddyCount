<template>
<body>
<link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet'>
<div class="questions">
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

<div class="timeLeft">
  <h1>
    Time left:
  </h1>
  <div class="timer">
    <span>30</span>
    <span>29</span>
    <span>28</span>
    <span>27</span>
    <span>26</span>
    <span>25</span>
    <span>24</span>
    <span>23</span>
    <span>22</span>
    <span>21</span>
    <span>20</span>
    <span>19</span>
    <span>18</span>
    <span>17</span>
    <span>16</span>
    <span>15</span>
    <span>14</span>
    <span>13</span>
    <span>12</span>
    <span>11</span>
    <span>10</span>
    <span>9</span>
    <span>8</span>
    <span>7</span>
    <span>6</span>
    <span>5</span>
    <span>4</span>
    <span>3</span>
    <span>2</span>
    <span>1</span>
    <span id="endQuestionLobby">0</span>
  </div>
</div>
<div id="Timer"></div>
</body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();
export default {
  name: "QuestionLobby",
  data: function () {
    return {
      lang: "",
      pollId: "",
      questionObject: "",
      questions: "", /* la till en tom array*/
      data: {},
      uiLabels: {},
    }
  },


  created: function () {
    this.pollId = this.$route.params.id
    this.lang = this.$route.params.lang
    socket.emit('joinPoll', this.pollId)
    socket.on("dataUpdate", (update) => {          //oklart om denna behvövs?
      this.data = update.a;
      this.question = update.q;
    });
    socket.on("questionUpdate", (update) => {       //Funktion för att hämta fråge-array /Nils
      this.questions = update;
    });
    socket.on("newQuestion", update => {          //oklart om denna behövs?
      this.question = update.q;
      this.data = {};
    });
  },
  methods:{

  }

}
var timeLeft = 30;

var timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == 0) {
    clearTimeout(timerId);
    console.log("slut")
    
  } else {
    console.log(timeLeft)
    timeLeft--;
  }
}
</script>

<style scoped>

body{
  position: absolute;
  background-color: #24a07b;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  color:black;
  font-family: righteous;
}
.questions{
  margin-top:2vh;
  font-weight: 700;
  font-size:3em;
}
#endQuestionLobby{

}
.timeLeft{
  position: absolute;
  text-align: left;
  bottom: 0vh;
  display: flex;
  flex-direction: row;
  justify-content: center;

}
.timer{
  margin-left: 15em;
}

span {
  color: black;
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  line-height: 1;
  filter: blur(0.2rem);
  display: block;
  transition: all 1.5s ease;
  opacity: 0;
  filter: blur(0.6rem);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}


span:nth-child(1) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 0s;
 }
span:nth-child(2) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 1s;
 }
span:nth-child(3) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 2s;
 }
span:nth-child(4) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 3s;
 }
span:nth-child(5) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 4s;
 }
span:nth-child(6) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 5s;
 }
span:nth-child(7) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 6s;
 }
span:nth-child(8) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 7s;
 }
span:nth-child(9) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 8s;
 }
span:nth-child(10) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 9s;
 }
span:nth-child(11) {
   animation: letteranim 31s  infinite ease;
   animation-delay: 10s;
 }
span:nth-child(12) {
  animation: letteranim 31s infinite ease;
  animation-delay: 11s;
}
span:nth-child(13) {
  animation: letteranim 31s infinite ease;
  animation-delay: 12s;
}
span:nth-child(14) {
  animation: letteranim 31s infinite ease;
  animation-delay: 13s;
}
span:nth-child(15) {
  animation: letteranim 31s infinite ease;
  animation-delay: 14s;
}
span:nth-child(16) {
  animation: letteranim 31s infinite ease;
  animation-delay: 15s;
}
span:nth-child(17) {
  animation: letteranim 31s infinite ease;
  animation-delay: 16s;
}
span:nth-child(18) {
  animation: letteranim 31s infinite ease;
  animation-delay: 17s;
}
span:nth-child(19) {
  animation: letteranim 31s infinite ease;
  animation-delay: 18s;
}
span:nth-child(20) {
  animation: letteranim 31s infinite ease;
  animation-delay: 19s;
}
span:nth-child(21) {
  animation: letteranim 31s infinite ease;
  animation-delay: 20s;
}
span:nth-child(22) {
  animation: letteranim 31s infinite ease;
  animation-delay: 21s;
}
span:nth-child(23) {
  animation: letteranim 31s infinite ease;
  animation-delay: 22s;
}
span:nth-child(24) {
  animation: letteranim 31s infinite ease;
  animation-delay: 23s;
}
span:nth-child(25) {
  animation: letteranim 31s infinite ease;
  animation-delay: 24s;
}
span:nth-child(26) {
  animation: letteranim 31s infinite ease;
  animation-delay: 25s;
}
span:nth-child(27) {
  animation: letteranim 31s infinite ease;
  animation-delay: 26s;
}
span:nth-child(28) {
  animation: letteranim 31s infinite ease;
  animation-delay: 27s;
}
span:nth-child(29) {
  animation: letteranim 31s infinite ease;
  animation-delay: 28s;
}
span:nth-child(30) {
  animation: letteranim 31s infinite ease;
  animation-delay: 29s;
}
span:nth-child(31) {
  animation: letteranim 31s infinite ease;
  animation-delay: 30s;
}


@keyframes letteranim {
  0% {
    opacity: 0;
    filter: blur(0.3rem);
  }
  1.78% {
    opacity: 1;
    filter: blur(0rem);
  }
  3.56% {
    opacity: 1;
    filter: blur(0rem);
  }
  7.1% {
    opacity: 0;
    filter: blur(0.3rem);
  }
  100% {
    opacity: 0;
    filter: blur(0.3rem);
  }
}
</style>