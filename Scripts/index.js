const CurrentTime = document.getElementById('currentTime');

function showTime()
{
    var currentTime = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var date = currentTime.getDate();
    var month = currentTime.getMonth();
    var meridian = "AM";

	if (hours >= 12)
	{
		meridian = "PM";
	}

	if (hours > 12)
	{
		hours = hours - 12;
	}
 
    if (minutes < 10)
    {
        minutes = "0" + minutes;
    }
 
    if (seconds < 10)
    {
        seconds = "0" + seconds;
    }
 
    var clockTime = date + ' ' + months[month] + ' ' + hours + ':' + minutes + ':' + seconds + " " + meridian + "!";
 
    CurrentTime.innerText = clockTime;
}

showTime();
var interval = setInterval(showTime,1000);

var inputText = document.getElementById('inputText');
var inputDate = document.getElementById('inputDate');
var inputTime = document.getElementById('inputTime');
var addBtn = document.getElementById('submit');
var events = document.getElementById('events');

addEvent = () => 
{
    var eventArray = JSON.parse(localStorage.getItem('eventArray')) || [];
    
    inputText = document.getElementById('inputText').value;
    var text = inputText;
    inputDate = document.getElementById('inputDate').value;
    inputTime = document.getElementById('inputTime').value;
    text = text.trim();

    if(text == "" ||inputDate == "" || inputTime == "")
    {
        alert("Enter valid Data");
        return;
    }

    var endtime = inputDate.concat(" ",inputTime);

    var currentEvent = {
      name : text,
      time : endtime
    };
    document.getElementById('inputText').value = "";
    document.getElementById('inputDate').value = "";
    document.getElementById('inputTime').value = "";
    eventArray.push(currentEvent);
    localStorage.setItem("eventArray",JSON.stringify(eventArray));

}

calculateDiff = time1 => {
    const total = Date.parse(time1) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );

    return {
      total,
      days,
      hours,
      minutes,
      seconds
  };
}

addBtn.addEventListener('click', addEvent);

inputText = document.getElementById('inputText');
inputText.addEventListener("keypress",(e)=> {
    if(e.which === 13)
    {
        addEvent();
    }
})

updateEvent = () => {
    var eventArray = JSON.parse(localStorage.getItem('eventArray')) || [];
    events.innerHTML = " ";

    var index = 0;
    var temp = false;
    var output = [];
    output.push(`<p class = "eventlistHeading">EventName   - Starts in</p>`);

    eventArray.forEach((currentEvent, currentIndex) => 
    {
        var timeDifference = calculateDiff(currentEvent.time);
        if (timeDifference.total <= 1) 
        {
            temp = true;
            index = currentIndex;
        }
        var format = ('0' + timeDifference.days).slice(-2) + " days " + ('0' + timeDifference.hours).slice(-2) + ":" + ('0' + timeDifference.minutes).slice(-2) + ":" + ('0' + timeDifference.seconds).slice(-2);
        output.push(`<p class="eventlist"> ${currentEvent.name}    - ${format}</p>`);
    });
    
    if(temp == true)
    {
       eventArray.splice(index,1);
    }
    
    events.innerHTML = output.join('');
    localStorage.setItem('eventArray',JSON.stringify(eventArray));
}

updateEvent();
setInterval(updateEvent,1000);