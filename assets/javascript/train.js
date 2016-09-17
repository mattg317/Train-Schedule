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

 //  	var time = Firebase.ServerValue.TIMESTAMP;
	// console.log(time);

//intiialize variables===============
var trainInitial = 0;
var trainNumber = trainInitial;

//initialize database========================
database.ref().on('value',function(snapshot){

	trainNumber= trainNumber;
	console.log(trainNumber)
	// trainName = snapshot.val().trainsName;
	console.log("length "+snapshot.numChildren())

	
	for(var i=1, n=snapshot.numChildren(); i<=n;i++){
		trainName = snapshot.child('train'+i).val().trainsName;
		trainDest= snapshot.child('train'+i).val().destination;
		trainFirst =snapshot.child('train'+i).val().firstTrain;
		trainFreq = snapshot.child('train'+i).val().frequency;

		$('#trainTable').append("<tr><td>"+trainName+"</td>"+"<td>"+trainDest+"</td>"+"<td>"+trainFirst+"</td>"+"<td>"+trainFreq+"</td></tr>");
	}
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
		frequency: trainFreq
	});

	$('#trainName').val('');
	$('#trainDest').val('');
	$('#trainFirst').val('');
	$('#trainFreq').val('');

	return false;
});









})
