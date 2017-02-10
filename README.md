## Setup and Getting the Questions
  - Initialize your angular app and bind it to the html. We'll need a controller as well, bound to the body. Create a service and inject it into your controller.
  - We need to get some trivia questions! In your controller, write a function called getQuestions that initiates a corresponding function in your service, which will make a ```GET``` request to ```https://devmountain.com/trivia/questions```. Set the results to $scope.questions and invoke the function. Try displaying the questions on the page!
  - Add an ng-click to the All Questions button to run this function.

## The Question Directive
  - In order to do a bit more with our question data, let's make a directive.
   - Restrict the directive to only be an element. The templateUrl should be ```/question.html```, already provided for you.
   - Give your directive an isolate scope, with a two-way bound connection to the ```question``` attribute.
   - In question.html, let's fill in the question and difficulty from $scope.question (marked by comments);
   - For the options, let's add ng-repeat to the li element. This should ng-repeat over the properties of question.options.
    - To ng-repeat over an object, the syntax is ```(key, value) in array```. The label should have the text (or value) from the option inside it.
    - Add your directive to the index.html at the bottom of the article element.
    - Let's give it an ng-repeat so we can show all the questions on scope.
    - Pass in each question's data through the question attribute on the question element.
    - Let's add functionality to these radio buttons - ng-repeats create their own child scope, so we'll need to access the parent (our directive's) scope. Add the following attributes to the input: ```id="{{$parent.question._id}}{{value}}" name="{{$parent.question._id}}"```Add this attribute to the label: ```for="{{$parent.question._id}}{{value}}"```
    This will keep the directives' ids and names from running into each other.
      - Give the input an ng-value (a starting angularized value) equal to the option key. Give it also ng-model to ```$parent.chosen_answer```.
    - Having a number for difficulty isn't very user-friendly. Let's add a controller to our directive, and a variable on its scope - ```$scope.difficulty```. Write some ifs (or a switch statement!) to make ```$scope.difficulty``` to equal 'Easy' when the question's difficulty is 1, 'Medium' when it's 2, and 'Hard' when it's hard. Update your html to show this new variable instead.
    - Add an ng-class that will add the class green when the question is easy, yellow when it's medium, and red when it's hard.
    - How will you know when you get the answer right? This ng-class is a bit more tricky because of the ng-repeat. Add it to the li element: ```ng-class="{green: key == $parent.chosen_answer && key == $parent.question.correct_answer,
        red: key == chosen_answer && key != question.correct_answer}"```

##Search/Difficulty
  - Phew! All that detail is rough, but it sure has made our question directive powerful.
  - Use ng-click and ng-hide to make the search bar only show up after the search button is clicked.
  - Use an angular filter to use this bar to search by animal.
  - Add an ng-click with a function called getByDifficulty. This will initiate an API call. To get questions by difficulty, make a get request to ```https://devmountain.com/trivia/questions/difficulty/ + difficulty```. Change $scope.questions to reflect the response.

## Adding a Question
  - We want to add more questions! Copy paste the following html into your index.html, below the article tag:
  ```html
   <div class="modal">
    <form>
      <h4 class="close" >X</h4>
      <span>Question</span><input type="text" ng-model="<!-- Question -->">
      <span>Animal it's about</span><input type="text" ng-model="<!-- Animal -->">
      <span>Difficulty</span>
      <div class="range">
        <input type="range" min="1" max="3"
       ng-model="<!-- Difficulty -->">

        <h5>{{newQuestion.difficulty}}</h5>
      </div>
        <h4>Options</h4>
        <div>
          <input type="radio" ng-model="" value="1">
          <input type="text" ng-model="">
        </div>
        <div>
          <input type="radio" ng-model="" value="2">
          <input type="text" ng-model="">
        </div>
        <div>
          <input type="radio" ng-model="" value="3">
          <input type="text" ng-model="">
        </div>
        <div>
          <input type="radio" ng-model="" value="4">
          <input type="text" ng-model="">
        </div>
      <div class="buttons">
        <button class="green" >Save Question</button>
        <button >Cancel</button>
      </div>

    </form>
  </div>
  ```
  - Fill in the ng-models to create an object on scope called newQuestion. The radios should relate to a property called correct_answer and the texts beside them to a different numbered option (ie ```newQuestion.options[1]```).
  - Add a function in the controller that will take in the newQuestion data and initiate a POST request in your service to ```https://devmountain.com/trivia/questions```. The newQuestion data should be the body.
  - In the .then, set $scope.questions to the response, and reset $scope.newQuestion to an empty object.
  - Add an ng-click to the Save Question button to run the function.
  - We don't want this modal open all the time! Add an ng-show to the entire modal equal to a variable on scope called modalOpen. Add ng-clicks to the cancel button and the addQuestion buttons to change this variable and show/hide the modal. Also, in the .then of the addQuestion function in your controller, reset modalOpen to false.

## Update/Delete Question
  - Paste the following into your question.html:
```html
<div class="modal" >
    <form>
      <h4 class="close">X</h4>
      <span>Question</span><input type="text" ng-model="update.question" ng-value="question.question">
      <span>Animal it's about</span><input type="text" ng-model="update.animal" ng-value="question.animal">
      <span>Difficulty</span>
      <div class="range">
        <input type="range" min="1" max="3" ng-model="update.difficulty" value="question.difficulty">
        <h5>{{update.difficulty}}</h5>
      </div>
        <h4>Options</h4>
        <div ng-repeat="(key, value) in question.options">
          <input type="radio" ng-model="update.correct_answer" ng-value="key">
          <input type="text" ng-model="update.options[key]" ng-value="value">
        </div>
        <div class="buttons">
      <button class="red">Delete Question</button>
      <button class="green">Save Changes</button>
      <button>Cancel</button>
    </div>
    </form>
  </div>
  ```
  - Add ng-clicks and ng-shows to make this modal work. The opening click should be on each question's gear. Updating a question requires a PUT request to ```https://devmountain.com/trivia/questions/ + questionId``` and deleting a question requires a DELETE request to the same URL. Remember, from the directive's controller, you'll need to access its parent's scope to access getQuestions (which you might want to put in the .then).


##Pagination
  - We're only getting the first ten results! The API is set up to allow us to use a query to select different pages. By default, it sends back the first page (page 0).
    - To make pagination work, let's create a variable on scope called ```page``` and set it to 0.
    - In index.html, we'll need two elements at the bottom inside our article - one that says ```< Prev Page``` and one that says ```Next Page >```.
    - In your controller, you'll need a function that changes pages. This function will need to initiate a call to the API and change the questions on scope based on the response. Remember to add a corresponding function in your service.
    - Going back to index.html, add the functionality to your buttons with ng-click.
    - Use ng-hide to make the ```< Prev Page``` button hidden if the page is 0 and ```Next Page >``` hidden if the number of questions on the page is less than 10.
    - Let's add to our getQuestions function to reset $scope.page to 0 whenever it runs (because it gets the first page by default).
    - For styling, give them both class ```change-page``` and give class ```left``` to ```< Prev Page``` and ```right``` to ```Next Page >```.

## Black Diamond
  - Right now, you're using a filter to get only questions about a certain animal. However, it only works with the results on the page. There is another endpoint on the api for searching by animal: ```'GET' /trivia/questions?animal=elephant``` Hit it instead when clicking on the search by animals button.
  - If you really want a challenge, add NgAnimate to your project and use it to add animations to the modals.
