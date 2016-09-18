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

//initialize database========================
database.ref().on('child_added',function(childSnapshot){
	console.log(childSnapshot.val().trainsName);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().firstTrain);
	console.log(childSnapshot.val().frequency);

	$('#trainTable').append(
		"<tr>" +
            "<td> " + childSnapshot.val().trainsName + " </td>" +
            "<td> " + childSnapshot.val().destination + " </td>" +
            "<td> " + childSnapshot.val().firstTrain + " </td>" +
            "<td></td>"+
            "<td> " + childSnapshot.val().frequency + " </td>" +
            "<td></td>"+
            
        "<tr>"
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
		frequency: trainFreq
	});

	$('#trainName').val('');
	$('#trainDest').val('');
	$('#trainFirst').val('');
	$('#trainFreq').val('');

	return false;
});









})
