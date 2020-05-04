$(document).ready(function() {
    //Topics Array, when submit button is clicked, pushes text to this array
    let topics = ['horror', 'dinosaur', 'science', 'chris evans', 'disney', 'universal']
    //creating the buttons that are in  the array when the page loads    
    createButtons()
    function createButtons() {
        for (let i = 0; i < topics.length; i++) {
            let button = $('<button>')
            button.attr('value', topics[i])
            button.attr('class', 'btn')
            button.text(topics[i])
            $('.button-area').append(button)
        }}
        
        // ********************************* MAIN FUNCTIONALITY ************************************
        
        run()
        function run(){
        $('.btn').click(function() {    //adding onclick event to the buttons on the page
            $('.display-area').empty() 
            let query = $(this).val()   //creating a dynamic url by getting buttons value
            queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=9uTuBGWIbt09JwxExjzQL9NLv51Kzr7o&limit=100&rating=pg-13'
            $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .then(function(response){
                let results = response.data
                let start = 0               //declaring some variables for the function
                let end = 10

                displayGif()
                function displayGif() {
                    $('.display_image').click(function() {  //toggle functionality for any additional gifs added
                    if ($(this).attr('data-state') === 'still') {
                        $(this).attr('data-state', 'animate')
                        $(this).attr('src', $(this).attr('data-animate'))
                    }
                    else {
                        $(this).attr('data-state', 'still')
                        $(this).attr('src', $(this).attr('data-still'))
                    }
                })
                    for (let j = start; j < end; j++) { //making a div with the rating and gif images
                    let display = $('<div>')
                    display.attr('class', 'display')

                    let rating = $('<p>').text('Rating: ' + results[j].rating.toUpperCase())
                    rating.attr('class', 'rating')

                    let image = $('<img>')
                    image.attr('src', results[j].images.fixed_height_still.url)
                    image.attr('class', 'display_image')
                    image.attr('data-still', results[j].images.fixed_height_still.url)
                    image.attr('data-animate', results[j].images.fixed_height.url)
                    image.attr('data-state', 'still')

                    display.append(rating)
                    display.append(image)
                    $('.display-area').append(display) //appending the created div to the page
                }
                $('.display_image').click(function() { //toggle functionailty for first 10 gifs added
                    if ($(this).attr('data-state') === 'still') {
                        $(this).attr('data-state', 'animate')
                        $(this).attr('src', $(this).attr('data-animate'))
                    }
                    else {
                        $(this).attr('data-state', 'still')
                        $(this).attr('src', $(this).attr('data-still'))
                    }
                })
                }
                if ($('.load-more').parents('.right').length === 1) {} //checks if load more button is already displayed
                else {
                let more = $('<button>').text('Load More') //if it isnt already displayed then display load more button
                more.attr('class', 'load-more')
                $('.right').append(more)
                
                $('.load-more').click(function () { //when load more button is clicked, add 10 more gifs to the page
                    start += 10
                    end += 10
                    if(end < results.length) { // if there are no more gifs to be displayed, remove button
                        displayGif()
                    }
                    else {
                        $('.load-more').remove()
                    }
                })}
            })
        })
        
        //********************************************************************************************************/
    }

    $('#submit-button').click(function() { // pushes text to topics array, creates new button, and runs function again
        let newButton = $('#search-bar').val()
        topics.push(newButton)
        $('.button-area').empty()
        createButtons()
        run()
        $('#search-bar').val('')
    })
})