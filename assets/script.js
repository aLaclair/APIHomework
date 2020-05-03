$(document).ready(function() {
    let topics = ['horror', 'dinosaur', 'science', 'chris evans', 'disney', 'universal']
        createButtons()
        function createButtons() {
        for (let i = 0; i < topics.length; i++) {
            let button = $('<button>')
            button.attr('value', topics[i])
            button.attr('class', 'btn')
            button.text(topics[i])
            $('.button-area').append(button)
        }}
        run()
        function run(){
        $('.btn').click(function() {
            $('.display-area').empty()
            let query = $(this).val()
            queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=9uTuBGWIbt09JwxExjzQL9NLv51Kzr7o&limit=10&rating=pg-13'
            $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .then(function(response){
                console.log(response)
                let results = response.data

                for (let j = 0; j < results.length; j++) {
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
                $('.display-area').prepend(display)
                
                }
                $('.display_image').click(function() {
                    if ($(this).attr('data-state') === 'still') {
                        $(this).attr('data-state', 'animate')
                        $(this).attr('src', $(this).attr('data-animate'))
                    }
                    else {
                        $(this).attr('data-state', 'still')
                        $(this).attr('src', $(this).attr('data-still'))
                    }
                })
            })
        })
    }
    $('#submit-button').click(function() {
        let newButton = $('#search-bar').val()
        topics.push(newButton)
        $('.button-area').empty()
        createButtons()
        run()
        $('#search-bar').val('')
    })
})