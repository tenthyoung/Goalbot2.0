// Get references to page elements
var $goal = $("#goal");
var $endDate = $("#end-date");
var $ms1 = $("#ms1");
var $ms2 = $("#ms2");
var $ms3 = $("#ms3");
var $ms4 = $("#ms4");
var $ms5 = $("#ms5");
var $submitBtn = $("#submit");
var $goalList = $("#goal-list");
var $checkbox = $(".checkbox");
var $experiencePoints = $('#experiencePoints');
var $level = $('#level');

//=======================================//
// Make sure these match the first page, or else the demo won't work
//=======================================//
// We need to track the experience
// FUTURE EDIT NEEDED: But later on if you can make a database this is preferable
// INSTRUCTIONS: Always make sure this is the same as what the styling says on index.handlebars for id=experiencePoints
var experiencePercent = 0;
var currentLevel = parseInt($level.text());


// The API object contains methods for each kind of request we'll make
var API = {
  saveGoal: function (newGoal) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/goals",
      data: JSON.stringify(newGoal)
    });
  },
  getGoals: function () {
    return $.ajax({
      url: "api/goals",
      type: "GET"
    });
  },
  deleteGoal: function (id) {
    return $.ajax({
      url: "api/goals/" + id,
      type: "DELETE"
    });
  }
};


// refreshGoals gets new Goals from the db and repopulates the list
var refreshGoals = function () {
  API.getGoals().then(function (data) {
    var $goals = data.map(function (goal) {
      var $a = $("<a>")
        .text(goal.goal)
        .attr("href", "/Goal/" + goal.id).attr("class", "collapsible-header");

      var $li = $("<li>")
        .attr({
          class: "collapsible-header",
          "data-id": goal.id
        })
        .append($a);

      var $deleteButton = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      // var $completeButton = $("<button>")
      // .addClass("btn btn-danger float-right complete") 
      // .text("check")

      $li.append($deleteButton);
      // $li.append($completeButton);

      return $li;
    });

    $goalList.empty();
    $goalList.append($goals);
  });
};

// handleFormSubmit is called whenever we submit a new Goal
// Save the new Goal to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var goalInfo = {
    goal: $goal.val().trim(),
    completetionDate: $endDate.val().trim(),
    ms1: $ms1.val().trim(),
    ms2: $ms2.val().trim(),
    ms3: $ms3.val().trim(),
    ms4: $ms4.val().trim(),
    ms5: $ms5.val().trim()
  };

  if (!(goalInfo.goal && goalInfo.completetionDate)) {
    alert("You must enter a Goal and 5 milestones!");
    return;
  }

  API.saveGoal(goalInfo).then(function () {
    refreshGoals();
  });

  $goal.val("");
  $endDate.val("");
  $ms1.val("");
  $ms2.val("");
  $ms3.val("");
  $ms4.val("");
  $ms5.val("");
};

// handleDeleteBtnClick is called when a Goal's delete button is clicked
// Remove the Goal from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteGoal(idToDelete).then(function () {
    refreshGoals();
  });
};



// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$goalList.on("click", ".delete", handleDeleteBtnClick);


$(document).ready(() => {


  // This will initiliaze all of the Materialize JS Animations
  M.AutoInit();



  //================================================================================================================================||
  // Creating a New To Do
  //================================================================================================================================||

  // Event Listener for Adding Subtasks within "To Do Creation Modal"
  $('#add-subtask').click(() => {
    let input = $("#create-subtask-input").val().trim();
    $('#new-subtasks').append(
      `<li class="collection-item">
              <div>${input}
                  <a href="#!" class="secondary-content">
                      <i class="material-icons red-text delete-subtask">delete</i>
                  </a>
              </div>
          </li>`
    )

    $('#create-subtask-input').val('');
  });

  //  Event Listener for Deleting Subtasks within "To Do Creation Modal"
  $('#todo-creation-modal').on('click', '.delete-subtask', () => {
    $(this).remove();
  });

  // Event Listener to render the To Do Item to the App
  $('#todo-creation-modal').on('click', '#create-new-todo-btn', () => {
    let newTask = $('#task-title').val().trim();
    console.log(newTask)
    $('#to-do-list').append(
      `<li class="collection-item">
              <div>${newTask}
                  <a href="#!" class="secondary-content">
                      <i class="material-icons red-text">send</i>
                  </a>
              </div>
          </li>`
    )
  });

  //================================================================================================================================||
  // Load up Avatar Image
  //================================================================================================================================||
  // Why are you changing the image source in javascript?
  // -- When I try to set the image source within index.handlebars, the image source cannot access the images in public for some reason
  $("#avatar").attr("src", "../images/robotsmall.png");


  //================================================================================================================================||
  // Checkbox Event Listeners
  //================================================================================================================================||
  // We need the User to gain experience everytime they complete a milestone
  $(document).on("click", ".checkbox", () => {
    $("#avatar").addClass("animated tada 2s");

    setTimeout(() => {
      $("#avatar").removeClass("animated tada 1s");
    }, 1000);

    // Gain experience after completing a task
    experiencePercent += 10;

    // We need to convert the experiencePercent to a string or else we can't change the Experience Progress Bar with CSS
    experiencePercentToString = `${experiencePercent.toString()}%`
    $experiencePoints.css({ width: experiencePercentToString })

    console.table(experiencePercent)
    console.table($experiencePoints)

    // We need to check if the width is 100% to trigger a level up
    if (experiencePercent >= 100) {
      currentLevel++;

      // Update the DOM
      $level.text(currentLevel);
      experiencePercent = 0;
      experiencePercentToString = `${experiencePercent.toString()}%`
      $experiencePoints.css({ width: experiencePercentToString })

      // Show the Level Up Modal
      $('#levelUpModal').modal('open')


    }

  });


  //================================================================================================================================||
  // Checkbox Event Listeners
  //================================================================================================================================||
  $(document).on("click", "#upgradeModalTrigger", () => {
    $("#upgradeModal").modal('open');

    $("#avatar").attr("src", "../images/robotmedium.png");
    $("#levelUpImage").attr("src", "../images/robotmedium.png");

  })


  //================================================================================================================================||
  // Home page to App
  // //================================================================================================================================||
  // $(document).on('click', '#getStartedBtn', () => {
  //   $('#home').addClass('hide');

  //   $('#appContainer').removeClass('hide');
  //   $('#floatingActionButton').removeClass('hide');

  //   // $('#signUpContainer').removeClass('hide');
  // });

  // $(document).on('click', '#logInBtn', () => {
  //   $('#signUpContainer').addClass('hide');

  // });


})
