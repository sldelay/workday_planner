$(function() {

    let hourSlot = [
        
        {
            hour: "9am",
            task: ""
        },
        {
            hour: "10am",
            task: ""
        },
        {
            hour: "11am",
            task: ""
        }, 
        {
            hour: "12pm",
            task: ""
        }, 
        {
            hour: "1pm",
            task: ""
        }, 
        {
            hour: "2pm",
            task: ""
        }, 
        {
            hour: "3pm",
            task: ""
        }, 
        {
            hour: "4pm",
            task: ""
        }, 
        {
            hour: "5pm",
            task: ""
        }, 
        
        
    ]

    let savedTasks;

    let getTasks = function() {
        savedTasks = JSON.parse(localStorage.getItem("storedTasks"));
        if (savedTasks === null) {
            localStorage.setItem("storedTasks", JSON.stringify(hourSlot));
        }
    };
    getTasks()


    let index = 0;
    let firstHour = 9;

    let createHourRows = function() {
        
        hourSlot.forEach(function(obj) {
            let newRow = $("<div>");
            newRow.addClass("row");
            newRow.attr("data-num", firstHour)
            $(".container").append(newRow);
            let newLbl = $("<p>");
            newLbl.text(obj.hour);
            newLbl.addClass("col s1 offset-s1");
            newRow.append(newLbl);
            let newInput = $("<input>");
            newInput.addClass("col s8 input");
            newInput.val(savedTasks[index].task);
            newRow.append(newInput);
            let newIcon = $("<i>");
            newIcon.addClass("material-icons col s1");
            newIcon.text("add_circle_outline");
            newIcon.attr("data-spot", index)
            newRow.append(newIcon);
            firstHour++
            index++
        })

    }
    createHourRows(hourSlot)

    $(".material-icons").on("click", function() {
        let iconSpot = $(this).attr("data-spot");
        let textVal = $(this).siblings("input").val();
        let storedHourSlot = JSON.parse(localStorage.getItem("storedTasks"));
        storedHourSlot[iconSpot].task = textVal;
        localStorage.setItem("storedTasks", JSON.stringify(storedHourSlot));
    })




   

   

   
    
});
