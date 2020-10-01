//#region Variable Declaration
var curDay = $("#currentDay");
var timeContainer = $(".container");
// finds reference to storedTasks, if non exists, create empty array
// var tasksToDo = JSON.parse(localStorage.getItem("storedTasks")) || [];

var tasks = {
    time: 0,
    task: ""
};
//#endregion

//#region Functioon Definitions
// gets current day on page ready
function getCurDay() {
    curDay.text(moment().format("dddd, MMMM Do"));
    // displays as "Day, Month D#"
};

// will display hour blocks for standard business hours (9am-5pm)
// total of 9 blocks(?)
function displayHours() {
    var color = 0;
    for (var i = 0; i < 9; i++) {
        // variable delcarations
        // creates new row for each time
        var saveIcon = $('<svg width="75%" height="75%" viewBox="0 0 16 16" class="bi bi-text-center" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>')
        var newRow = $('<div class="row border">');
        newRow.attr("id", (i + 9));
        // creates variable to store current time ID, if it doesn't exist already
        tasks.time = JSON.parse(localStorage.getItem("taskID"));
        // console.log(tasks.time);
        // console.log(newRow.attr("id"));

        // left column to display business hours
        var leftCol = $('<div class="col-lg-1 border text-right p-1 hour">');
        // mid column for text entry of task
        // color coded based on if time has passed, is currently, or in future
        var midCol = $('<textarea class="col-lg-10 border p-1 timeColor">');
        // button with save icon to save current(?)/all text fields
        var rightCol = $('<div class="col-lg-1 border d-flex align-items-stretch p-1 saveBtn">');

        // base text adding
        if (newRow.attr("id") < 12)
            leftCol.text((i + 9) + " AM");
        else if (newRow.attr("id") == 12)
            leftCol.text((i + 9) + " PM");
        else
            leftCol.text((i + 9) - 12 + " PM");
        midCol.attr("placeholder", "Enter Text Here...");
        // rightCol.text("Save Button");

        // appending elements to proper locations
        timeContainer.append(newRow);
        newRow.append(leftCol);
        newRow.append(midCol);
        newRow.append(rightCol);
        rightCol.append(saveIcon);
    };

    // color coding
    function updateTime() {
        var currentTime = moment().hours();
        // console.log("Moment Time: " + currentTime);
        $(".timeColor").each(function () {
            var curHour = parseInt($(this).parent().attr("id"));
            // console.log("Row Time: " + curHour);

            if (curHour > currentTime)
                $(this).addClass("future");
            else if (curHour == currentTime)
                $(this).addClass("present");
            else
                $(this).addClass("past ");
        })

    };

    $(".saveBtn").click(function () {
        // console.log("Button clicked.");
        // console.log($(this));
        saveTasks();
    });

    // save button psuedo
    // ANY button clicked, checks if inputField value is > 0
    // if yes: save ALL of those fields into local storage
    // possibly redraw/refresh window after saving?
    function saveTasks() {
        $("textarea").each(function () {
            tasks.time = $(this).parent().attr("id");
            console.log(tasks.time);
            tasks.task = $(this).val();
            console.log(tasks.task);
            localStorage.setItem("taskID", JSON.stringify(tasks));
        })
        // tasks.time = $(this).parent().attr("id");
        // console.log(tasks.time);
        // tasks.task = $(this).val();
        // console.log(tasks.task);
        // tasksToDo.push(tasks);
        // localStorage.setItem("storedTasks", JSON.stringify(tasksToDo));
    };
    updateTime();
};



//#endregion

//#region Event Listeners
$(document).ready(getCurDay);
$(document).ready(displayHours);

//#endregion