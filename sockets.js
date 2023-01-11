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


  socket.on('editQuestion', function(d) {
    data.editQuestion(d.pollId, d.index, {q: d.q, a: d.a});
    socket.emit('questionEdited', data.getAllQuestions(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
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

  socket.on('getCurrentQuestion', function(pollId) {
    io.to(pollId).emit('currentQuestion', data.getCurrentQnA(pollId));
  });
  socket.on("PlayerGuessAnswer", function(obj) {
    data.guessSubmit(obj.pollId ,obj.guessObj);
    // if (data.checkAmountguessed(obj.pollId) === true){     //kikar om alla har gissat på frågorna
    //   io.to(obj.pollId).emit('goToResultPage')
    // }
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
    currentRound = data.getCurrentRound(pollId);
    amountOfQuestions = data.getAmountOfQ(pollId);
    if (currentRound != (amountOfQuestions - 1)){
      io.to(pollId).emit('goToScoreBoard');
    }else{

      io.to(pollId).emit('goToPodium');
    }
  });

  socket.on('goToNextQuestion', function(pollId) {
    io.to(pollId).emit('goToNextQuestion');
  });
 
  socket.on("submitPoints", function(d){
    data.submitPoints(d.pollId, d.pid, d.points )
  });

  socket.on('getPlayerPoints', function(pollId){
    socket.emit('getPoints', data.getPoints(pollId))
  });
  socket.on('roundOver', function(pollId){
    data.roundCounterAddition(pollId)
  });
  socket.on('isItOver', function(pollId){
    currentRound = data.getCurrentRound(pollId);
    amountOfQuestions = data.getAmountOfQ(pollId);
    if (currentRound == (amountOfQuestions)){
      socket.emit('ItIsOver');
    }
  });
  socket.on('whatRound', function(pollId){
    currentRound = data.getCurrentRound(pollId);
    amountOfQuestions = data.getAmountOfQ(pollId);
    socket.emit('thisRound', {R: currentRound,Q: amountOfQuestions});
  });
}

module.exports = sockets;