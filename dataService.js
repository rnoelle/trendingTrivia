angular.module('triviaTrend')
  .service('dataService', function($http) {

    this.getQuestions = function() {
      return $http({
        method: 'GET',
        url: 'https://practiceapi.devmountain.com/api/trivia/questions'
      })
    }


    this.getByDifficulty = function(difficulty) {
      return $http({
        method: 'GET',
        url: 'https://practiceapi.devmountain.com/api/trivia/questions/difficulty/' + difficulty
      }).then(function(response) {
        return response.data;
      })
    }


    this.changePage = function(page) {
      return $http({
        method: 'GET',
        url: 'https://practiceapi.devmountain.com/api/trivia/questions?page=' + page
      }).then(function(response) {
        return response.data;
      })
    }


    this.postQuestion = function(question) {
      return $http({
        method: 'POST',
        url: 'https://practiceapi.devmountain.com/api/trivia/questions',
        data: question
      }).then(function(response) {
        return response.data;
      })
    }


    this.updateQuestion = function(update) {
      return $http({
        method: 'PUT',
        url: 'https://practiceapi.devmountain.com/api/trivia/questions/' + update._id,
        data: update
      }).then(function(response) {
        console.log(response);
        return response.data;
      })
    }


    this.deleteQuestion = function(id) {
      return $http({
        method: 'DELETE',
        url: 'https://practiceapi.devmountain.com/api/trivia/questions/' + id
      }).then(function(response) {
        return response;
      })
    }


  });
