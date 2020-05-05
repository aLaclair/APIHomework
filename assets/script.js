$(document).ready(function() {
    //Topics Array, when submit button is clicked, pushes text to this array
    let topics = ['Horror', 'Chris Evans', 'Universal']
    let movies = ['Interstellar', 'Jigsaw', 'Poltergeist']
    //creating the buttons that are in  the array when the page loads    
    createButtons()
    function createButtons() {
        for (let i = 0; i < topics.length; i++) {
            let button = $('<button>')
            button.attr('value', topics[i])
            button.attr('class', 'btn')
            button.text(topics[i])
            $('.button-area').append(button)
        }
        for (let i = 0; i < movies.length; i++) {
            let movieButton = $('<button>')
            movieButton.attr('value', movies[i])
            movieButton.attr('class', 'btn2')
            movieButton.text(movies[i])
            $('.button-area').append(movieButton)
        }    
    }
        
        // ********************************* MAIN FUNCTIONALITY ************************************
        
        $('.btn').click(run())
        function run(){ 
        $('.btn').click(function() {    //adding onclick event to the buttons on the page
            $('.display-area').empty() 
            let query = $(this).val()   //creating a dynamic url by getting buttons value
            queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=9uTuBGWIbt09JwxExjzQL9NLv51Kzr7o&limit=100&rating=pg-13'
            $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .then(function(response){
                let results = response.data
                let start = 0               //declaring some variables for the function
                let end = 10

                $('.load-more').unbind('click')

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
                let more = $('<button>').text('Load More') //display load more button, if new button is clicked, display new load more button
                more.attr('class', 'load-more')
                $('.load-more').remove()
                $('.right').append(more)
                
                $('.load-more').bind('click',function () { //when load more button is clicked, add 10 more gifs to the page
                    
                    if(end < results.length) { // if there are no more gifs to be displayed, remove button
                        start += 10
                        end += 10
                        displayGif()
                    }
                    else {
                        $('.load-more').remove()
                    }
                })
            })
        })

        //********************************************************************************************************/
    }

    $('#submit-button').click(function() { // pushes text to topics array, creates new button, and runs function again
        let newButton = $('#search-bar').val().trim()
        event.preventDefault()
        topics.push(newButton)
        $('.button-area').empty()
        createButtons()
        run()
        movieclick()
        $('#search-bar').val('')
    })
    $('#submit-button-m').click(function() {
        let newMovie = $('#search-bar-m').val().trim()
        event.preventDefault()
        movies.push(newMovie)
        $('.button-area').empty()
        createButtons()
        run()
        movieclick()
        $('#search-bar-m').val('')
    })
    
    //Movie functionality
    $('.btn2').click(movieclick())
    function movieclick() {
    $('.btn2').click(function(){
        $('.load-more').remove()
        $('.display-area').empty()
        let query = $(this).val().trim()
        let queryURl = 'https://www.omdbapi.com/?apikey=f614f73a&t=' + query + ' '
        $.ajax({
            url: queryURl,
            method: 'GET'
        })
        .then(function(response){
            let movieDisplay = $('<div>')
            movieDisplay.attr('class', 'movie-display')

            let title = $('<h1>').text(response.Title)
            let director = $('<h3>').text('Director: ' + response.Director)
            let rated = $('<p>').text('Rated: ' + response.Rated)
            let image = $('<img>')
            image.attr('src', response.Poster)
            let plot = $('<p>').text(response.Plot)
            let rating = $('<p>').text('IMDB Rating: ' + response.imdbRating)

            movieDisplay.append(title).append(director).append(rated).append(image).append(plot).append(rating)

            $('.display-area').append(movieDisplay)
        })
    }) 
    }
    
})