$(document).ready(function() {
  // handle time
  var clock = $('.time').text(moment().format("h:mm:ss a"));

  setInterval(function() {
    clock =  $('.time').text(moment().format("h:mm:ss a"));
  }, 1000)


  // handle date
  $('.date').text(moment().format("dddd, MMMM Do YYYY"));


  // handle schedule
  var hours = ['9AM', '10AM', '11AM', 'Noon', '1PM', '2PM', '3PM', '4PM', '5PM'];

  var savedTask = '';

  hours.forEach(function(hour, index) {
    savedTask = localStorage.getItem(hour); // get task corresponding to the time

    if (!savedTask) {
      savedTask = ''; // if saved task = null, dont show anything
    }

    // generate an li element for each hour
    $('ul').append("<li index='"+index+"'><p class='hour'>"+hour+"</p><input class='task-input' value='"+savedTask+"'></input><button class='save-button'>Save</button></li>")
  });

  $('.save-button').click(function() {
    var userInput = $(this).siblings('input').val(); // get user input
    var hour = $(this).siblings('p').text(); // get at what time the user is changing the input

    localStorage.setItem(hour, userInput) // save task with the corresponding hour
  });
});
