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
    poll.currentQuestion = 0;              
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
  }
  return this.polls[pollId];
}

// Data.prototype.addParticipant = function(pollId, playerId) {
//   const poll = this.polls[pollId];
//   if (typeof poll !== "undefined") {
//     let participant = {};
//       participant.playerId = playerId;
//       poll.participants.push(participant);
//       console.log('skriv poll',poll);
//   }
// }

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
  console.log("all participants requested for ", pollId);
  if (typeof poll !== 'undefined'){
    console.log("the participants in poll", pollId, "are", poll.participants)
    return poll.participants;

  }
  return []
}

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  console.log("question added to", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}
Data.prototype.delQuestion = function(pollId, questionId) {
  const poll = this.polls[pollId];
  console.log("question deleted from", pollId, questionId);
  if (typeof poll !== 'undefined') {
    for(let index=0; index< poll.questions.length;index++){
      if(poll.questions[index].i == questionId){
        console.log("jag har hittat frågan på plats ", index)
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
  console.log("question requested for ", pollId, qId);
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
  console.log("all question requested for ", pollId);
  if (typeof poll !== 'undefined'){
    console.log("the questions in poll", pollId, "is", poll.questions)
    return poll.questions;

  }
  return []
}

/*Data.prototype.submitAnswer = function(pollId, answer) { //Skriver en egen sån här
  const poll = this.polls[pollId];
  console.log("answer submitted for ", pollId, answer);
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);
  }
}*/
Data.prototype.submitAnswer = function(pollID, aObject){ // tror inte vi använder denna längre
  const poll = this.polls[pollID];
  console.log("ansers submitted for ", pollID, aObject);
  console.log("jag har id: ", aObject.player, "och har svarat ", aObject.answer)
  if (typeof poll !== 'undefined') {
  for(let i = 0; i <poll.participants.length; i++){
    if(poll.participants[i].playerId == aObject.player){
      poll.participants[i].currentAnswer = aObject.answer;
    }
  }
}
console.log(poll.participants)
}

Data.prototype.playerAnswer=function(pollId, playerAObject){
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    for(let i = 0; i <poll.participants.length; i++){
      if(poll.participants[i].playerId == playerAObject.playerId){
        poll.participants[i].currentAnswer = playerAObject.answerObject;
        console.log("Spelar ID: ", playerAObject.playerId, "Svar: ", playerAObject.answerObject)
      }
    }
  }
  console.log("Deltagare: ",poll.participants, "skriv ut object", poll.participants[0].currentAnswer  )
  
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

  }
  return[]
}

module.exports = Data;



