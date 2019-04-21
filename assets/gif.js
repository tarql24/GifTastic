var topics = [
  "birds",
  "cat",
  "dog",
  "Snake",
  "lion",
  "tiger",
  "bear",
  "frog",
  "hawk",
  "zibra",
  "seal",
  "killer whale"
];
$("#buttons-view").text(topics);
console.log(topics);

// Generic function for capturing the movie name from the data-attribute
// function alertMovieName() {
//   var movieName = $(this).attr("data-name");

//   alert(movieName);
// }

// Function for displaying movie data
function renderButtons() {
  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie to our button
    a.addClass("btn btn-primary animal");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function(event) {
  // Preventing the buttons default behavior when clicked (which is submitting a form)
  event.preventDefault();
  // This line grabs the input from the textbox
  var newTopic = $("#animal-input")
    .val()
    .trim();

  // Adding the movie from the textbox to our array
  topics.push(newTopic);
  console.log(topics);
  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Function for displaying the movie info
// We're adding a click event listener to all elements with the class "movie"
// We're adding the event listener to the document because it will work for dynamically generated elements
// $(".movies").on("click") will only add listeners to elements that are on the page at that time
// $(document).on("click", ".movie", alertMovieName);

// Calling the renderButtons function to display the intial buttons
renderButtons();

// Adding click event listen listener to all buttons
$(".animal").on("click", function() {
  $("#animal-pic").empty();
  // Grabbing and storing the data-animal property value from the button
  var animal = $(this).attr("data-name");

  // Constructing a queryURL using the animal name
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animal +
    "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {
        // Creating and storing a div tag
        var animalDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<div>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var animalImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        animalImage.attr("src", results[i].images.fixed_height.url);
        animalImage.attr(
          "data-still",
          results[i].images.fixed_height_still.url
        );
        animalImage.attr("data-animate", results[i].images.fixed_height.url);
        animalImage.attr("class", "gif");
        animalImage.attr("data-state", "still");

        // Appending the paragraph and image tag to the animalDiv
        animalDiv.append(animalImage);
        animalDiv.append(p);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div

        $("#animal-pic").prepend(animalDiv);
      }
      //   $("#animal-pic").empty();
    });
});

$(".gif").on("click", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
