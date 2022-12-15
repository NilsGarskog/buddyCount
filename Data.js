'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
}

/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}

Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;  
    poll.questions = [];
    poll.answers = [];
    poll.participants = [];
    poll.guesses = [];
    poll.currentQuestion = 0;
    poll.playersAnswered = 0;
    poll.playerGuessed = 0;   
    poll.currentRound = 0;
    poll.playerPoints =[];           
    this.polls[pollId] = poll;
  }
  return this.polls[pollId];
}

Data.prototype.editParticipant = function(pollId, nm,av,playerID) {
  const poll = this.polls[pollId];
  if(typeof poll !== 'undefined'){
  let participant = {};
  if (poll.participants.length === 0){
    participant.playerId = 1;
  }else{
    participant.playerId = playerID;
  }
  participant.name = nm;
  participant.avatar = av;
  participant.points = 0;
  participant.currentAnswer = [];
  participant.currentGuess = [];
  poll.participants.push(participant);
  }

}


Data.prototype.removeParticipant = function(pollId, playerID) {
  const poll = this.polls[pollId];
  if(typeof poll !== 'undefined'){
    for(let i = 0; i < poll.participants.length; i++){
      if(poll.participants[i].playerId == playerID){
        poll.participants.splice(i,1);
      }
    }
}}

Data.prototype.getAllParticipants = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined'){
    return poll.participants;

  }
  return []
}

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}
Data.prototype.delQuestion = function(pollId, questionId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    for(let index=0; index< poll.questions.length;index++){
      if(poll.questions[index].i == questionId){
        poll.questions.splice(index,1)
     
      }
    }
  }
}

Data.prototype.editQuestion = function(pollId, index, newQuestion) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions[index] = newQuestion;
  }
}

Data.prototype.getQuestion = function(pollId, qId=null) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}

Data.prototype.getAllQuestions = function(pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined'){
    return poll.questions;

  }
  return []
}


Data.prototype.playerAnswer=function(pollId, playerAObject){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    for(let i = 0; i <poll.participants.length; i++){
      if(poll.participants[i].playerId == playerAObject.playerId){
        poll.participants[i].currentAnswer = playerAObject.answerObject;

      }
    }
  }

  
}

/*Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}*/

Data.prototype.getAnswers = function(pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined'){
    for(let i=0; i<poll.participants.length; i++){
      poll.answers[i] = { playerId: poll.participants[i].playerId, answerObject: poll.participants[i].currentAnswer}
    }
    return poll.answers;
  }
  
  return []
}

Data.prototype.getAnswersforResult = function(pollId){
  const poll = this.polls[pollId];
  let arrayofAnswers = [];
  if (typeof poll !== 'undefined'){
   
    for(let i =0; i < poll.answers.length; i++){
      let currentAnswers = {playerId: poll.answers[i].playerId, answer: poll.answers[i].answerObject[poll.currentRound].a};
    arrayofAnswers.push(currentAnswers)

    }

    return arrayofAnswers
  }
  return []

}

Data.prototype.getAllAnswers = function(pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined'){
    return poll.answers;

  }
  return []
}
Data.prototype.getCurrentQnA = function(pollId){
  const poll = this.polls[pollId];
  let returnArray=[]
  if (typeof poll !== 'undefined'){
    let questionWid = poll.questions[poll.currentRound];
    let question = questionWid.q
    let Qid = questionWid.i
    for(let i=0; i<poll.participants.length; i++){
      let Pid = poll.answers[i].playerId
      let answer= poll.answers[i].answerObject[poll.currentRound].a
      let obj = {playerId: Pid, answer: answer}
      returnArray.push(obj)
      }
      return {question: question, answersArray: returnArray}
    }
  }

Data.prototype.answerSubmit = function(pollId, thePlayer) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
  }

}
Data.prototype.checkAmountAnswered = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.playersAnswered +=1;
      if(poll.playersAnswered === poll.participants.length){
        return true
      }else{
        return false
      }
  }
}

Data.prototype.checkAmountguessed = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.playerGuessed +=1;
      if(poll.playerGuessed === poll.participants.length){
        poll.playerGuessed = 0;
        return true
      }else{
        return false
      }
  }
}

Data.prototype.guessSubmit = function(pollId, GuessObj) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    for(let i = 0; i <poll.participants.length; i++){
      if(poll.participants[i].playerId == GuessObj.playerId){
        poll.participants[i].currentGuess = GuessObj.guess
  }
}
}
}

Data.prototype.getGuesses = function(pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined'){
    for(let i=0; i<poll.participants.length; i++){
      poll.guesses[i] = { playerId: poll.participants[i].playerId, guessObject: poll.participants[i].currentGuess}
    }
    return poll.guesses;
  }
  
  return[]
}
Data.prototype.submitPoints=function(pollId, pid, newPoints){

  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined'){
    for(let i = 0; i<poll.participants.length; i++){
      if(poll.participants[i].playerId == pid){
        poll.participants[i].points = poll.participants[i].points + newPoints
      }
    }
  }
  return []
}

Data.prototype.getPoints = function(pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined'){
    for(let i=0; i<poll.participants.length; i++){
      poll.playerPoints[i] = { playerId: poll.participants[i].playerId, points: poll.participants[i].points}
    }
    console.log("Spelar poängen är: ",poll.playerPoints)
    return poll.playerPoints;
  }
  
  return[]
}

Data.prototype.roundCounterAddition = function(pollId){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined'){
    poll.currentRound +=1;
  }
}

module.exports = Data;



