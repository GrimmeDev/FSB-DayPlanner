//#region Variable Declaration
// Stores current day ID in HTML
var curDay = $("#currentDay");
// stores container to display Hour, Task Field, and Save Button
var timeContainer = $(".container");
// Empty variable used later to store user input tasks
var task = "";

//#region Functioon Definitions
// gets current day on page ready
function getCurDay() {
    curDay.text(moment().format("dddd, MMMM Do"));
    // displays as "Day, Month Day#"
};

// will display hour blocks for standard business hours (9am-5pm)
function displayHours() {
    for (var i = 0; i < 9; i++) {
        // variable delcarations
        // creates new row for each time
        // Uses Bootstrap Icon of Text-Center as save button Icon
        var saveIcon = $('<svg width="75%" height="75%" viewBox="0 0 16 16" class="bi bi-text-center" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>')
        // creates an empty row with some bootstrap styling
        var newRow = $('<div class="row border">');
        // sets the row to have an attribute of ID based on military time starting at 9
        // ends at at 17
        newRow.attr("id", (i + 9));
        // stores the ID attribute to variable used later to compare if localStorage
        // key and value already exists
        var timeID = newRow.attr("id");

        // left column to display business hours
        var leftCol = $('<div class="col-lg-1 border text-right p-1 hour">');
        // mid column for text entry of task
        // color coded based on if time has passed, is currently, or in future
        var midCol = $('<textarea class="col-lg-10 border p-1 timeColor">');
        // button with save icon to save all text fields
        var rightCol = $('<div class="col-lg-1 border d-flex align-items-stretch p-1 saveBtn">');

        // base text adding for hour display
        if (newRow.attr("id") < 12)
            leftCol.text((i + 9) + " AM");
        else if (newRow.attr("id") == 12)
            leftCol.text((i + 9) + " PM");
        else
            leftCol.text((i + 9) - 12 + " PM");
        // checks if localStorage key:value is empty
        if (localStorage.getItem(timeID) != "") {
            // loads previously saved text
            console.log(localStorage.getItem(timeID));
            midCol.text(localStorage.getItem(timeID));
        }
        else
            // Should create placeholder text if no ID has been found with a value
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
    // changes class to auto-style based on if the hour has passed, is current, or future
    function updateTime() {
        var currentTime = moment().hours();
        // console.log("Moment Time: " + currentTime);
        $(".timeColor").each(function () {
            var curHour = parseInt($(this).parent().attr("id"));
            // console.log("Row Time: " + curHour);

            // if the hour of the row is ahead of the current time
            if (curHour > currentTime)
                $(this).addClass("future");
            // if the hour of the row is equal to the current time
            else if (curHour == currentTime)
                $(this).addClass("present");
            // if the hour of the row is behind the current time
            else
                $(this).addClass("past ");
        })

    };

    // Sets ALL saveButton classes to perform the same function
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
            task = $(this).val();
            console.log(task);
            // tasks.time is the localStorage reference
            // push only tasks.task to localStorage based on the reference
            localStorage.setItem($(this).parent().attr("id"), task);
        })
    };

    // Once script loads automatically displays the Day and Month at the top of the screen
    updateTime();
};

//#endregion

//#region Event Listeners
$(document).ready(getCurDay);
$(document).ready(displayHours);

//#endregion