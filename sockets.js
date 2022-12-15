function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  /*
  socket.on('addQuestion', function(d) {         //Bortkommenterad pga ny addQuestion, se nedan!
    data.addQuestion(d.pollId, {q: d.q, a: d.a});
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });
  */

  socket.on('editQuestion', function(d) {
    data.editQuestion(d.pollId, d.index, {q: d.q, a: d.a});
    socket.emit('questionEdited', data.getAllQuestions(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });

  socket.on('runQuestion', function(d) {           //oklart om denna behövs?
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });


  socket.on('submitAnswer', function(d){ //tror inte vi använder denna längre
    data.submitAnswer(d.pollId ,{player: d.p, answer: d.a});
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId))
  });

  socket.on('playerAnswer',function(d){
    data.playerAnswer(d.pollId, {playerId: d.player, answerObject: d.answers});
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId))
    if (data.checkAmountAnswered(d.pollId) === true){     //kikar om alla har svart på frågorna
      io.to(d.pollId).emit('goToNextPage')
    }
  });
  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  });

  socket.on('addQuestion',function(d) {       //Funktion för att lägga till frågor och skicka ut alla frågor som finns / Nils
    data.addQuestion(d.pollId, {q: d.q, i: d.i});
    io.to(d.pollId).emit('questionUpdate', data.getAllQuestions(d.pollId));
  });


  socket.on('delQuestion',function(d){
    data.delQuestion(d.pollId, d.i);
    io.to(d.pollId).emit('questionUpdate', data.getAllQuestions(d.pollId));
  });

  // socket.on('addParticipant', function(d) {
  //   data.addParticipant(d.pollId, d.playerId);
  //   io.to(d.pollId).emit('playerAdded', data.getAllParticipants(d.pollId));
  // });

  socket.on('editParticipant', function(d) {
    data.editParticipant(d.pollId, d.nm, d.av, d.playerId);
    io.to(d.pollId).emit('playerEdited', data.getAllParticipants(d.pollId));
    socket.emit('isFirst',data.getAllParticipants(d.pollId))
  });

  socket.on('removeParticipant', function(d) {
    data.removeParticipant(d.pollId, d.playerId);
    io.to(d.pollId).emit('playerEdited', data.getAllParticipants(d.pollId));
  });

  socket.on('getPlayers', function(pollId) {
    io.to(pollId).emit('sendPlayers', data.getAllParticipants(pollId));
  });

  socket.on('getQuestions', function(pollId) {
    socket.emit('allQuestions', data.getAllQuestions(pollId));
  });

  socket.on('getAnswers', function(pollId){
    socket.emit('allAnswers', data.getAllAnswers(pollId))
  });

  socket.on('goToNextPage', function(pollId) {
    io.to(pollId).emit('goToNextPage');
  });
  socket.on('goToShowQResult', function(d) {
    //io.to(pollId).emit('goToShowQResults');
    data.answerSubmit(d.pollId ,d.playerId);
    io.to(d.pollId).emit('goToShowQResults', data.answerSubmit(d.pollId))
  });
  socket.on('goToShowQResultatet', function(pollId) {
    io.to(pollId).emit('goToShowQResultss');

  });
  socket.on('getCurrentQuestion', function(pollId) {
    io.to(pollId).emit('currentQuestion', data.getCurrentQnA(pollId));
  });
  socket.on("PlayerGuessAnswer", function(obj) {
    data.guessSubmit(obj.pollId ,obj.guessObj);
    if (data.checkAmountguessed(obj.pollId) === true){     //kikar om alla har svart på frågorna
      io.to(obj.pollId).emit('goToResultPage')
    }
    console.log("the playerId is", obj.guessObj.playerId)
    io.to(obj.pollId).emit('playerDoneGuess', obj.guessObj.playerId)

  });
  socket.on('goToResult', function(pollId) {
    io.to(pollId).emit('goToResultPage');
  });

  socket.on("getCurrentGuess", function(pollId) {
    socket.emit("CurrentGuesses", data.getGuesses(pollId));
  });

  socket.on("getAnswerForResult", function(pollId){
    socket.emit("AnswersForResult", data.getAnswersforResult(pollId))
  });
  socket.on('goToNextRound', function(pollId) {
    io.to(pollId).emit('goToNextRound');
  });
  socket.on('goToScoreBoard', function(pollId) {
    io.to(pollId).emit('goToScoreBoard');
  });
  socket.on('goToPlaceDisplay', function(pollId) {
    io.to(pollId).emit('goToPlaceDisplay');
  });
  socket.on('goToNextQuestion', function(pollId) {
    io.to(pollId).emit('goToNextQuestion');
  });
 
}

module.exports = sockets;