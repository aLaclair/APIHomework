$(document).ready(function() {
    //Topics Array, when submit button is clicked, pushes text to this array
    let topics = ['Horror', 'Chris Evans', 'Universal']
    let movies = ['Interstellar', 'Jigsaw', 'Poltergeist']
    let cities = ['London', 'New York', 'Paris']
    //creating the buttons that are in  the array when the page loads    
    createButtons()
    function createButtons() {
        for (let i = 0; i < topics.length; i++) {
            let button = $('<button>')
            button.attr('value', topics[i])
            button.attr('class', 'btn')
            button.text(topics[i])
            let closeButton = $('<button>').text('X').attr('class', 'close')
            button.append(closeButton)
            $('.button-area').append(button)
        }
        for (let i = 0; i < movies.length; i++) {
            let movieButton = $('<button>')
            movieButton.attr('value', movies[i])
            movieButton.attr('class', 'btn2')
            movieButton.text(movies[i])
            let closeButton = $('<button>').text('X').attr('class', 'close')
            movieButton.append(closeButton)
            $('.button-area').append(movieButton)
        }
        for (let i = 0; i < cities.length; i++) {
            let cityButton = $('<button>')
            cityButton.attr('value', cities[i])
            cityButton.attr('class', 'btn3')
            cityButton.text(cities[i])
            let closeButton = $('<button>').text('X').attr('class', 'close')
            cityButton.append(closeButton)
            $('.button-area').append(cityButton)
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
        weatherClick()
        close()
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
        weatherClick()
        close()
        $('#search-bar-m').val('')
    })
    $('#submit-button-a').click(function() {
        let weather = $('#search-bar-a').val().trim()
        event.preventDefault()
        cities.push(weather)
        $('.button-area').empty()
        createButtons()
        run()
        movieclick()
        weatherClick()
        close()
        $('#search-bar-a').val('')
    })
    
    //Movie functionality
    $('.btn2').click(movieclick())
    function movieclick() {
    $('.btn2').click(function(){
        $('.load-more').remove()
        $('.display-area').empty()
        let query = $(this).val().trim()
        let queryURl = 'https://www.omdbapi.com/?apikey=f614f73a&t=' + query + ''
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
        
    })}
    
    $('.btn3').click(weatherClick())
    function weatherClick() {
    $('.btn3').click(function(){
        $('.load-more').remove()
        $('.display-area').empty()
        let query = $(this).val().trim()
        let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=imperial&appid=0ac369af40b8b8078463977591973dee'
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .then(function(response){
            console.log(response)
            let weatherDiv = $('<div>')
            weatherDiv.attr('class', 'weather-display')

            let city = $('<h1>').text(response.name)
            let temp = $('<p>').text('Temperature: ' + Math.round(response.main.temp) + '°F')
            let feel = $('<p>').text('Feels like: ' + Math.round(response.main.feels_like)+ '°F')
            let humidity = $('<p>').text('Humidity: ' + response.main.humidity + '%')
            let maxTemp = $('<p>').text('Max Temperature: ' + Math.round(response.main.temp_max)+ '°F')
            let minTemp = $('<p>').text('Minimum Temperature: ' + Math.round(response.main.temp_min)+ '°F')
            let weath = $('<p>').text('Weather: ' + response.weather[0].main)
            let country = $('<p>').text('Country: ' + response.sys.country)
            
            
            let loadmore = $('<button>').text('Load More')
            loadmore.attr('class', 'load')

            weatherDiv.append(city).append(temp).append(feel).append(humidity).append(loadmore)

            $('.display-area').append(weatherDiv)

            $('.load').click(function() {
                weatherDiv.empty()
                weatherDiv.append(city).append(country).append(temp).append(feel).append(maxTemp).append(minTemp)
                weatherDiv.append(humidity).append(weath)
            })
        })
    })}
    close()
    function close() {
    $('.close').click(function() {
        $(this).parent().remove()
        for (let i = 0; i < topics.length; i++) {
            if (topics[i] === $(this).parent().val()) {
                topics.splice(i, 1)
            }
        }
        for (let i = 0; i < movies.length; i++) {
            if (movies[i] === $(this).parent().val()) {
                movies.splice(i, 1)
            }
        }
        for (let i = 0; i < cities.length; i++) {
            if (cities[i] === $(this).parent().val()) {
                cities.splice(i, 1)
            }
        }
    })}
})