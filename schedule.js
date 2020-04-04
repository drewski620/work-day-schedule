// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours
// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future
// WHEN I click into a timeblock
// THEN I can enter an event
// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist
$("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));

var startOfDay = moment().hour(9).startOf('hour');
var endOfDay = moment().hour(17).startOf('hour');





while(startOfDay <= endOfDay){
    //we'll check the tasks for the current day
    //if they match the current date, we'll display them in the textarea
    var currentDay = moment();
    var task = JSON.parse(localStorage.getItem(`task-${startOfDay.format('HH')}`));
    var taskInputValue = '';


    if (task !== null) {
        
        if (currentDay.isSame(task.date, 'day')) {
            taskInputValue = task.task;
            console.log(task)
        }
    }
    //add the html for the hours here
    var html =  `
    <div>
        <label>${startOfDay.format('hh a')}</label>
        <textarea name="task-${startOfDay.format('HH')}">${taskInputValue}</textarea>
        <button type="button" value="${startOfDay.format('HH')}">Save</button>
    </div>
    `;
    $("#schedule").append(html)
    startOfDay.add(1, 'hour')
}
$('button').on('click', function(event){
    var buttonValue = event.target.value;
    var taskValue = $(`textarea[name ="task-${buttonValue}"]`).val();

    localStorage.setItem(`task-${buttonValue}`, JSON.stringify ({
        task: taskValue,
        date: moment().format('MM/DD/YYYY')
    }));
});

// console.log(moment().hour(10))