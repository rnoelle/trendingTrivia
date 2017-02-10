angular.module('triviaTrend', [])
  .controller('mainCtrl', function ($scope, dataService) {
    $scope.page = 0;
    $scope.toggleSearch = function() {
      $scope.searchOpen = !$scope.searchOpen;
      $scope.search = {};
    }

    $scope.getQuestions = function () {
      dataService.getQuestions().then(function (response) {
        $scope.questions = response.data;
        $scope.page = 0;
    })
  }

    $scope.getQuestions();

    $scope.addQuestion = function (question) {
      dataService.postQuestion(question).then(function (response) {
        $scope.newQuestion = {};
        $scope.questions = response;
        $scope.modalOpen = false;
      })
    }

    $scope.getByDifficulty = function (difficulty) {
      dataService.getByDifficulty(difficulty).then(function (response) {
        $scope.questions = response;
      })
    }

    $scope.changePage = function (page, i) {
      dataService.changePage(page + i).then(function (response) {
        $scope.questions = response;
      })
      $scope.page = page + i;
    }

  })
  .directive('question', function (dataService) {
    return {
      restrict: 'E',
      templateUrl: 'question.html',
      link: function (scope, element, attr) {

      },
      scope: {
        question: '='
      },
      controller: function ($scope, dataService) {
        switch ($scope.question.difficulty) {
          case 1:
            $scope.difficulty = 'Easy';
            break;
          case 2:
            $scope.difficulty = 'Medium';
            break;
          case 3:
            $scope.difficulty = 'Hard';
            break;
        }

        $scope.deleteQuestion = function(id) {
          dataService.deleteQuestion(id).then(function (response) {
            $scope.$parent.getQuestions()
          });

        }
        $scope.updateQuestion = function (update) {
          dataService.updateQuestion($scope.question._id, update).then(function (response) {
            $scope.$parent.getQuestions();
          })
        }
      }
    }
  })
  .service('dataService', function ($http) {
    this.getQuestions = function () {
      return $http({
        method: 'GET',
        url: 'https://practiceapi.devmountain.com/trivia/questions'
      })
    }
    this.getByDifficulty = function (difficulty) {
      return $http({
        method: 'GET',
        url: 'https://practiceapi.devmountain.com/trivia/questions/difficulty/' + difficulty
      }).then(function (response) {
        return response.data;
      })
    }
    this.changePage = function (page) {
      return $http({
        method: 'GET',
        url: 'https://practiceapi.devmountain.com/trivia/questions?page='+ page
      }).then(function (response) {
        return response.data;
      })
    }
    this.postQuestion = function (question) {
      return $http({
        method: 'POST',
        url: 'https://practiceapi.devmountain.com/trivia/questions',
        data: question
      }).then(function (response) {
        return response.data;
      })
    }
    this.updateQuestion = function (id, update) {
      return $http({
        method: 'PUT',
        url: 'https://practiceapi.devmountain.com/trivia/questions/' + id,
        data: update
      }).then(function (response) {
        return response.data;
      })
    }
    this.deleteQuestion = function (id) {
      return $http({
        method: 'DELETE',
        url: 'https://practiceapi.devmountain.com/trivia/questions/' + id
      }).then(function (response) {
        return response
      })
    }
  })
