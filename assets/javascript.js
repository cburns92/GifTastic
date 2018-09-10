var topics = ["cats","dogs","birds","koalas","kangaroos","mice","alligators","sloths"];

$( document ).ready(function() {
    console.log( "ready!" );
    for(var i = 0; i < topics.length;i++){
        var newButton = $("<button>").text(topics[i]).attr("topic",topics[i]).attr("class","topic-button")
        $("#topics").append(newButton)
    }

    //click event for topic buttons
    $("#topics").on("click",".topic-button",function(){
        console.log("click registered")
        var searchTopic = $(this).attr("topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cfjaRztarqRBCb8UGeabx0k28mgGLpyi&limit=10&rating=pg-13&q="+ searchTopic;
        $("#gifs").empty()

        //begin ajax
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response){
            console.log(response)
            for(var i = 0; i < response.data.length; i++){
                var stillURL = response.data[i].images.original_still.url;
                var animatedURL = response.data[i].images.original.url;
                var rating = response.data[i].rating

                var gifItem = $("<div>").attr("class","gifItem")  
                var gifRating = $("<p>").text("Rating: " + rating)              
                var gif = $("<img>").attr("still-url",stillURL).attr("animated-url",animatedURL).attr("class","gif").attr("class","image-responsive").attr("src",stillURL).attr("data-state","still")
                 

                gifItem.append(gifRating).append(gif)
                $("#gifs").append(gifItem)
            }                   
        })
        //ajax complete
    
    })
    
    $("#gifs").on("click",".gifItem",function(){
        
        if($(this).children("img").attr("data-state") === "still"){
            var animatedURL = $(this).children("img").attr("animated-url")
            $(this).children("img").attr("src", animatedURL)
            $(this).children("img").attr("data-state", "animated")
        }
        else{
            var stillURL = $(this).children("img").attr("still-url")
            $(this).children("img").attr("src", stillURL)
            $(this).children("img").attr("data-state", "still")
        }
    })

    $("#inputArea").on("click","#input-button",function(){
        console.log("it worked")
        var topic = $("#input").val()
        var newButton = $("<button>").text(topic).attr("topic",topic).attr("class","topic-button")
        $("#topics").append(newButton)
    })
});





