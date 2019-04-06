var characters = ["Tyrion Lannister", "Lord Varys", "Bran Stark", "Thoros", "The Hound"];

function genButtons(){
    $("#btn-view").empty();
    for (var i = 0; i < characters.length; i++) {
        var b = $("<button>");
        b.addClass("char-btn btn-dark text-center");
        b.attr("data-name", characters[i]);
        b.text(characters[i]);
        b.appendTo("#btn-view");
    }
    console.log(characters);
}
$("#new-button").on("click", function (event) {
    event.preventDefault();
    var newBtn = $("#char-search").val().trim();
    characters.push(newBtn);
    genButtons();
    
})


$(document).on("click", ".char-btn", function () {
    var character = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=A37MnA26KQDjAUmr1dOT3AEcnBEPBqOR&q=" + character + "&limit=5";
    
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass("newGifs" );
            var rate = $("<p>").text("Rated: " + results[i].rating);
            gifDiv.append(rate);
            var charImg = $("<img>");
            charImg.addClass("gif");
            charImg.attr("alt", "character image");
            charImg.attr("src", results[i].images.fixed_height_still.url);
            charImg.attr("data-state", "still");
            charImg.attr("data-still", results[i].images.fixed_height_still.url);
            charImg.attr("data-animate", results[i].images.fixed_height.url);
            gifDiv.append(charImg);
            $("#gifs").prepend(gifDiv);

        }
        
    
    })
})

$(".gif").on("click", function (){
var state = $(this).attr("datat-state");
if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
} else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");

}
}
)

genButtons();
