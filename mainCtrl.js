angular.module('triviaTrend')
  .controller('mainCtrl', function($scope, dataService) {
    $scope.page = 0;


    function addDifficulty(array) {
      array.map(function (el) {
        switch (el.difficulty) {
          case 1:
            el.labelDifficulty = 'Easy';
            break;
          case 2:
            el.labelDifficulty = 'Medium';
            break;
          case 3:
            el.labelDifficulty = 'Hard';
            break;
        }
      })
    }

    $scope.toggleSearch = function() {
      $scope.searchOpen = !$scope.searchOpen;
      $scope.search = {};
    }



    $scope.getQuestions = function() {
      dataService.getQuestions().then(function(response) {
        $scope.questions = response.data;

        addDifficulty($scope.questions);

        $scope.page = 0;
      })
    }

    $scope.getQuestions();


    $scope.addQuestion = function(question) {
      dataService.postQuestion(question).then(function(response) {
        $scope.newQuestion = {};
        $scope.questions = response;
        $scope.closeModal()
      })
    }

    $scope.updateQuestion = function (update) {
      dataService.updateQuestion(update).then(function (response) {
        $scope.getQuestions();
        $scope.closeModal();
      })
    }


    $scope.deleteQuestion = function(id) {
      dataService.deleteQuestion(id).then(function (response) {
        $scope.getQuestions()
      });

    }

    $scope.getByDifficulty = function(difficulty) {
      dataService.getByDifficulty(difficulty).then(function(response) {
        $scope.questions = response;
        addDifficulty($scope.questions);
      })
    }

    $scope.changePage = function(page, i) {
      dataService.changePage(page + i).then(function(response) {
        $scope.questions = response;
        addDifficulty($scope.questions);
      })
      $scope.page = page + i;
    }

    $scope.checkAnswer = function(questionId, chosenAnswer) {
      var question;
      for (var i = 0; i < $scope.questions.length; i++) {
        if ($scope.questions[i]._id == questionId) {
          question = $scope.questions[i];
          break;
        }
      }
      question.chosenAnswer = chosenAnswer;
    }

    $scope.openModal = function (question) {
      $scope.currentQuestion = question;
      if (question) {
        $scope.editing = true;
      } else {
        $scope.addingNew = true;
      }
      $scope.modalOpen = true;
    }

    $scope.closeModal = function () {
      $scope.editing = false;
      $scope.addingNew = false;
      $scope.modalOpen = false;
    }


  })
