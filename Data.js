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

Data.prototype.addParticipant = function(pollId, playerId) {
  const poll = this.polls[pollId];
  if (typeof poll !== "undefined") {
    let participant = {};
      participant.playerId = playerId;
      poll.participants.push(participant);
      console.log('skriv poll',poll);
  }
}

Data.prototype.editParticipant = function(pollId, nm,av,playerID) {
  const poll = this.polls[pollId];
  if(typeof poll !== 'undefined'){
  let participantEdit = {};
  participantEdit.playerId = playerID;
  participantEdit.name = nm;
  participantEdit.avatar = av;
  participantEdit.points = 0;
  for(let i = 0; i < poll.participants.length; i++){
    console.log(poll.participants[i].playerId);
    if(poll.participants[i].playerId == participantEdit.playerId){
      poll.participants[i] = participantEdit;
    }
  }
  //console.log('poll',poll);
  
  console.log('poll', poll.participants);
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

Data.prototype.submitAnswer = function(pollId, answer) {
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
}

Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}
module.exports = Data;



