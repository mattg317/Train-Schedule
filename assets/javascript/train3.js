$(document).ready(function(){

console.log("live");

//initialize Firebase=================
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAUPKg5WsTwWYdREMs0BudgxypF6ZB57dY",
    authDomain: "train-schedule-54443.firebaseapp.com",
    databaseURL: "https://train-schedule-54443.firebaseio.com",
    storageBucket: "train-schedule-54443.appspot.com",
    messagingSenderId: "394939120183"
  };
  firebase.initializeApp(config);
//Variable========
  var database = firebase.database();

//intiialize variables===============
var trainInitial = 0;
var trainNumber = trainInitial;

//Git hub auth==================
// var ref = new Firebase("https://train-schedule-54443.firebaseio.com");
var auth = firebase.auth()
auth.authWithOAuthPopup('github', function(error, authData){
	if(error){
		console.log("login Failed!", erro);
	} else{
		console.log("Authenticated successfully with payload:", authData);
	}
})

//initialize database========================
database.ref().on('child_added',function(childSnapshot){
	console.log(childSnapshot.val().trainsName);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().firstTrain);
	console.log(childSnapshot.val().frequency);
	console.log(childSnapshot.val().timeAdded);


//Time conversion=============== take 
	var time = moment(new Date(childSnapshot.val().timeAdded));
	var freq = childSnapshot.val().frequency 
	var start = parseInt(childSnapshot.val().firstTrain);
//===============

	start =moment(start, 'HHmm')
	var timeDiff = time.diff(start, 'minutes')
//============

	// time = time.format("hh mm A");
	// var timeDiff = time.diff(start, 'minutes')
	timeDiff=parseInt(timeDiff);
	var minAway = freq - (timeDiff % freq);
	var nextTrain =moment(time).add(minAway, 'minutes') 
	nextTrain = nextTrain.format("hh:mm A")
	// nextTrain= moment(nextTrain, "HHmm")

	// nextTrain= moment(nextTrain, 'HHmm').format('hh:mm A')

	console.log(time);
	console.log(start);
	console.log(timeDiff)
	console.log("till next "+minAway)

	console.log("next train " + nextTrain)

//Append train==================
$('#trainTable').append(
		"<tr>" +
            "<td> " + childSnapshot.val().trainsName + " </td>" +
            "<td> " + childSnapshot.val().destination + " </td>" +
            "<td> " + childSnapshot.val().frequency + " </td>" +
            "<td>"+ nextTrain+ "</td>"+
            "<td>"+minAway+"</td>" +
            "<td></td>"+
            
        "</tr>"
		)


});

//register on click events
$("#submitTrain").on('click', function(){

	trainNumber++;
	var trainName = $('#trainName').val().trim();
	var trainDest = $('#trainDest').val().trim();
	var trainFirst = $('#trainFirst').val().trim();
	var trainFreq = $('#trainFreq').val().trim();
	//will be move aboced


	console.log(trainName);
	console.log(trainDest);
	console.log(trainFirst);
	console.log(trainFreq);

	database.ref().push({
		trainsName: trainName,
		destination: trainDest,
		firstTrain: trainFirst,
		frequency: trainFreq,
		timeAdded: firebase.database.ServerValue.TIMESTAMP,
	});

	$('#trainName').val('');
	$('#trainDest').val('');
	$('#trainFirst').val('');
	$('#trainFreq').val('');

	return false;
});









})
