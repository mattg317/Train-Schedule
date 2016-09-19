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
	console.log(childSnapshot.val().timeAdded);

trainNumber=childSnapshot.val().trainsNumber;
console.log('loaded train '+ trainNumber);

//Time conversion===============
	var time = moment(new Date(childSnapshot.val().timeAdded));
	var freq = childSnapshot.val().frequency 
	var start = parseInt(childSnapshot.val().firstTrain);
	time = parseInt(time.format("HHmm"));
	var timeDiff = time - start;
	var minAway = freq - (timeDiff % freq);
	var nextTrain = (time + minAway).toString();

	nextTrain= moment(nextTrain, 'HHmm').format('hh:mm A')

	console.log(time);
	console.log(start);
	console.log(timeDiff)
	console.log("till next "+minAway)

	console.log("next train " + nextTrain)

//Append train==================
$('#trainTable').append(
		"<tr id='"+childSnapshot.val().trainsName +"'>" +
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

	database.ref("train"+trainNumber).set({
		trainsName: trainName,
		destination: trainDest,
		firstTrain: trainFirst,
		frequency: trainFreq,
		timeAdded: firebase.database.ServerValue.TIMESTAMP,
		trainsNumber: trainNumber
	});

	$('#trainName').val('');
	$('#trainDest').val('');
	$('#trainFirst').val('');
	$('#trainFreq').val('');

console.log(trainNumber)
	return false;
});

// console.log("--------------");
// console.log(database.ref('train1').val());
console.log("-----------");

// var myRef = new Firebase("https://train-schedule-54443.firebaseio.com")

$('#deleteTrain').on('click', function(){
	console.log('click')
var trainName = $('#trainName').val().trim();
console.log(childSnapshot.val(trainName));




	return false;
});
// database.once("value",function(snapshot){
// 	snapshot.forEach(function(childSnapshot){
// 		console.log(childSnapshot.key());
// 		console.log(childSnapshot.val());
// 	})
// })





})
