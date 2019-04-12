
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAAgIHjLlwCa4OjAsVU2EjGp84dsUifULg",
  authDomain: "trains-d944b.firebaseapp.com",
  databaseURL: "https://trains-d944b.firebaseio.com",
  projectId: "trains-d944b",
  storageBucket: "trains-d944b.appspot.com",
  messagingSenderId: "24634207288"
};
firebase.initializeApp(config);

var database = firebase.database();

var firstTrain;

$(document).ready(function () {

  $("#submit").on("click", function (event) {
    event.preventDefault();
    console.log(this);

    var trainName = $("#name-input").val();
    var destination = $("#destination-input").val();
    var firstTrain = $("#time-input").val();
    var freq = $("#freq-input").val();
 
  

   var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      freq: freq,
    }



    database.ref().push(newTrain);

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");

  })

  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var sv = childSnapshot.val();
    
  
    var newName = sv.name;
    var newDestination = sv.destination;
    var firstTrainNew = moment(sv.firstTrain, "hh:mm").subtract(1, "years");
    var newFreq = sv.freq;
    var diffTime = moment().diff(moment(firstTrainNew), "minutes");
    var remainder = diffTime % sv.newFreq;
    var minAway = sv.newFreq - remainder;
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    var newRow = $("<tr>");
    newRow.append("<td>" + newName + "</td>");
    newRow.append("<td>" + newDestination + "</td>");
    newRow.append("<td>" + newFreq + "</td>");
    newRow.append("<td>" + nextTrain + "</td>");
    newRow.append("<td>" + minAway + "</td>");
    console.log(newRow);


    $("tbody").append(newRow);

  })
})