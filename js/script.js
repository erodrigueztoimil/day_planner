$(document).ready(function() {

  // handle scroll animation

  $(window).scroll(function() {
    var pos = $(this).scrollTop();

    $(".hero").css({
    transform: 'translate3d(0, +'+(pos/50)+'%, 0) scale('+(100 - pos/50)/100+')'
  });
  })

  var currentTime;

  handleCurrentTime(); // display static clock
  renderTasks(); // render initial tasks and screen
  renderDoneTask() // handle if the time of the task passed

  function handleCurrentTime() {
    currentTime = moment().format("H"); // current time in military format
    $('.time').text(moment().format("H:mm:ss"));
  } // display current time

  setInterval(function() {
    handleCurrentTime() // render time every second to make clock live
    // renderDoneTask() // handle if the time of the task passed
  }, 1000)

  $('.current-date').text(moment().format("MMMM D, YYYY"));// handle date

  // var currentMonth = moment().format('MMMM').toUpperCase();
  // $('.current-month').html(currentMonth);
  //
  // var currentYear = moment().format('Y');
  // $('.current-year').html(currentYear);


  // when executing the function, generate an schedule screen with choosen hours
  // if saved task display value to corresponding time
  function renderTasks() {
    $('.schedule ul').empty(); // delete all previous tasks
    var hours = ['9AM', '10AM', '11AM', 'Noon', '1PM', '2PM', '3PM', '4PM', '5PM']; // initial schedule
    var savedTask = ''; // default task text

    hours.forEach(function(hour, index) {
      savedTask = localStorage.getItem(hour); // get task corresponding to the time

      if (!savedTask) {
        savedTask = ''; // if not saved task set to default
      }

      mTime = index+9; // change task time to military hour

      // generate an li element for each hour
      $('.schedule ul').append("<li mTime='"+mTime+"'><p class='hour'>"+hour+"</p><input class='task-input' value='"+savedTask+"'></input><button class='save-button'>Save</button></li>")
    });
  }


  // when save button is clicked, get user input and save it to local storage
  $('.save-button').click(function() {
    var userInput = $(this).siblings('input').val(); // get user input
    var hour = $(this).siblings('p').text(); // get at what time the user is changing the input

    // if user typed a value then ...
    if (userInput) {
      localStorage.setItem(hour, userInput) // save task with the corresponding hour
    }

    if (!userInput) {
      localStorage.removeItem(hour); // if the user deletes task, remove it from local storage
    }
  });


  //
  function renderDoneTask() {
    var taskTime;

    $('li').each(function() {
      taskTime = $(this).attr('mTime');
      taskTime = parseInt(taskTime); // convert attribute value to number

      if (taskTime < currentTime) {
        $(this).css('background-color', 'red');
        // renderTasks()
      }
    });
  }
});
