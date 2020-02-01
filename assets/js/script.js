$(function () {
     // this is my array of objects that holds my hour row info
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

    let todaysDate = moment().format("dddd, MMMM Do, YYYY") // setting todays date is the ".todaysDate h2 tag"
    $(".todaysDate").text(todaysDate);

    let index = 0; 

    let createHourRows = function () { // this function dynamically adds the hour rows and sets data attr for some of the elements

        hourSlot.forEach(function (obj) {
            let hour = ["09", "10", "11", "12", "13", "14", "15", "16", "17"]
            let newRow = $("<div>");
            newRow.addClass("row");
            newRow.attr("data-num", hour[index]);
            $(".container").append(newRow);
            let newLbl = $("<p>");
            newLbl.text(obj.hour);
            newLbl.addClass("col s2 m1 offset-m1");
            newRow.append(newLbl);
            let newInput = $("<input>");
            newInput.addClass("col s8 m8 input");
            newInput.attr("data-spot", index)
            newInput.val(" ");
            newRow.append(newInput);
            let newIcon = $("<i>");
            newIcon.addClass("material-icons col s1");
            newIcon.text("add_circle_outline");
            newIcon.attr("data-spot", index)
            newRow.append(newIcon);
            index++
            hour++
        })



    }
    createHourRows(hourSlot)


    let getTasks = function () { // this function sets up local storage format or gets already saved tasks
        savedTasks = JSON.parse(localStorage.getItem("storedTasks")); 
        if (!savedTasks) {
            localStorage.setItem("storedTasks", JSON.stringify(hourSlot));
        }
        $(".input").each(function () {
            let input = $(this).attr("data-spot");
            if (savedTasks === null) {
                return;
            }
            $(this).val(savedTasks[input].task)
        })

    };
    getTasks()


    $(".material-icons").on("click", function () { //this is an event listener for my add icons that saves the input to local storage 
        let iconSpot = $(this).attr("data-spot");
        let textVal = $(this).siblings("input").val();
        let storedHourSlot = JSON.parse(localStorage.getItem("storedTasks"));
        storedHourSlot[iconSpot].task = textVal;
        localStorage.setItem("storedTasks", JSON.stringify(storedHourSlot));
    })

    let colorCode = function () { // this function assigns a class based on whether or not its past, current, or future
        $(".container").children().each(function () {
            let rowHour = $(this).attr("data-num");
            if (rowHour < (moment().format('HH'))) {
                $(this).addClass("past")
            }
            if (rowHour === (moment().format('HH'))) {
                $(this).removeClass("future")
                $(this).removeClass("past")
            }
            if (rowHour > (moment().format('HH'))) {
                $(this).addClass("future")
            }
            if ((moment().format('HH')) > 17) {
                $(".container").children().removeClass("future past");
            }
        })
    }

    colorCode()
    setInterval(colorCode, 10000); // this interval makes sure that the hour rows classes stay current 


















});
