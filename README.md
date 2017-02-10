## Trending Trivia

### Summary

Today we want you to write a trivia application!  
We have created a back-end that you can hit to store and share data.
You'll be sharing the back-end so don't put anything inappropriate or offensive in there.

### Live example

You can find a live working copy of what you will be building here :

https://practiceapi.devmountain.com/trendingTrivia/

### Requirements

This app is all about trivia questions. 


#### 1. You will need to get trivia questions from the server and show them on the screen.

You will get the data in pages. `Remember: a page of data, is a small slice of all the questions on the server. IE - you will only get 10 at a time`

1b. You will need to let the user click next page to get the next 10 question, and previous page to get the previous 10 questions.

![Image of Project](https://github.com/DevMountain/trendingTrivia/blob/master/screenshot/screenshot1.jpg)


#### 2. All questions are multiple choice.

When the user selects an answer show right or wrong highlight their selected answer:
- Red for incorrect
- Green for correct 

![Image of Higlighting](https://github.com/DevMountain/trendingTrivia/blob/master/screenshot/screenshot3.jpg)


#### 3. Filters

The user should be able to filter by:
* all questions
* easy, medium and hard diffuculty
* by animal

Make the `Search by Animal` button change whether or not the animal name input box is visible.

Make the input box it filter all questions on the screen, and only the questions on the screen. 


![Image of Filters](https://github.com/DevMountain/trendingTrivia/blob/master/screenshot/screenshot4.jpg)


#### 4. Edit & Delete

Add a gear to every question. The icon is found in the `styes/assets` folder.

When the gear is clicked for a question, it needs to open the edit modal, and populate the modal with that questions data.

The modal will allow users to edit and delete questions.

in main.css search for `ALERTDELETEME` and remove the line it is on.  This will make the modal appear.

The edit modal is already in the index.html file.  You will need to use ng-show or ng-hide to make it appear when the user clicks the gear icon.

The edit modal should only show the `edit & delete question buttons` at the bottom, and should hide the `add question buttons`.  These two button groups are labeled in the index.html file.

Editing a question will PUT that question to the server.

Deleting a question will DELETE that question from the server.


![Image of Modal](https://github.com/DevMountain/trendingTrivia/blob/master/screenshot/screenshot2.jpg)

#### 5. Add question

Add question will use the same modal as the edit.

The `add question buttons` need to be visible, and the `edit & delete question buttons` need to be hidden.

Add a question will post it to the server.

#### 6. Styling

We have put styles for everything in the styles folder, but you can make your own or use those.  Just make it look the same.

There some effects when hovering over a question, and over the gear.  Try to get those as well.

#### 7. Black diamond

Remember the users answers on local storage.


### References

#### Data Structure

The data structure of a trivia question looks like this

```
{
  _id: {type: String}, (The API will add this for you, do not send it to the server)
  question: {type: String},
  animal: {type: String},
  difficulty: {type: Number},
  options: {
    1: {type: String},
    2: {type: String},
    3: {type: String},
    4: {type: String}
  },
  correct_answer: {type: Number},
  date_entered: {type: Date, default:new Date()}
}
```

#### API Reference

You can find the API documentation for all the endpoints here :

https://practiceapi.devmountain.com/