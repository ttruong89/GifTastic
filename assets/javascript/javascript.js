$( document ).ready(function() {
	// Array of topics that we be placed into buttons.
	var topics = ["Cats", "Kanye", "Dancing", "Baby", "Angry", "Beyonce"];
	// Function will display the topics as buttons.
	function displayGifsButtons() {
		$("#gifButtons").empty();
		for(var i = 0; i < topics.length; i++){
			var gifButton = $("<button>");
			gifButton.addClass("topic");
			gifButton.addClass("btn btn-primary");
			gifButton.attr("data-name", topics[i]);
			gifButton.text(topics[i]);
			$("#gifButtons").append(gifButton);
		};
	};
	// Function to add a new topic button.
	function addNewButton() {
		$("#searchGif").on("click", function() {
			var topic = $("#topic-input").val().trim();
			if (topic == "") {
				return false; // Prevents user from adding false button.
			}
			topics.push(topic);

			displayGifsButtons();
			return false;
		});
	};
	// Function that displays all of the gifs from API.
	function displayGifs() {
		var topic = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
		console.log(queryURL); 
		$.ajax({
			url: queryURL,
			method: 'GET'
		})
		.done(function(response) {
			console.log(response);
			$("#gifResults").empty(); // Clears out gifs from previous searches from this div.
			var results = response.data // Results of gifs.
			if (results == "") {
				alert("Sorry, no such memes for this button.");
			}
			for (var i=0; i<results.length; i++) {

				var gifDiv = $("<div>"); // Created div for gifs to go into.
				gifDiv.addClass("gifDiv");
				// Rating of Gifs.
				var gifRating = $("<p>").text("Rating: " + results[i].rating);
				gifDiv.append(gifRating);
				// Pulling Gifs.
				var gifImage = $("<img>");
				gifImage.attr("src", results[i].images.fixed_height_small_still.url); // Still images stored into src of image.
				gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); // Still image.
				gifImage.attr("data-animate", results[i].images.fixed_height_small.url) // Animated images.
				gifImage.attr("data-state", "still"); // Set image state.
				gifImage.addClass("image");
				gifDiv.append(gifImage); // Appending images to the gifDiv.
				// Pulling still image of gif.
				// Adding the dynamic gifs to the gifResults div.
				$("#gifResults").prepend(gifDiv);
			};
		});
	};
	// Call functions here.
	displayGifsButtons(); // Display the topics buttons.
	addNewButton(); // User added buttons function.
	// Event Listeners.
	$(document).on("click", ".topic", displayGifs);
	$(document).on("click", ".image", function(){
		var state = $(this).attr('data-state');
		if (state == 'still') {
			$(this).attr('src', $(this).data('animate'));
			$(this).attr('data-state', 'animate');
		}
		else {
			$(this).attr('src', $(this).data('still'));
			$(this).attr('data-state', 'still');
		};
	});
});