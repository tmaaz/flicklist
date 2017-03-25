

var model =
    {
        watchlistItems: [],
        browseItems: []
    }


var api =
    {
        root: "https://api.themoviedb.org/3",
        token: "29b8dc890b2a89171bcb484d1f1f77e1"
    }


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback)
    {
    	$.ajax(
            {
    		    url: api.root + "/discover/movie",
    		    data:
                    {
    			        api_key: api.token,
    		        },
    		    success: function(response)
                    {
                        model.browseItems = response.results;

    			        // invoke the callback function that was passed in.
    			        callback();
    		        }
	       });
    }


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render()
    {
        // flush everything for new data
        $('#section-watchlist ul').empty();
        $('#section-browse ul').empty();

        // set up our watch list section
        model.watchlistItems.forEach(function(movie)
            {
                var watchTitle = $("<h5 style='margin: 10px 0 10px 0;'></h5>").text(movie.original_title);
                var watchThis = $("<li style='list-style: none;'></li>").append(watchTitle);
                $("#section-watchlist ul").append(watchThis);
            });

        // for each movie on the current browse list
        model.browseItems.forEach(function(movie)
            {
                var thisTitle = $("<h5 style='margin: 20px 0 3px 0;'></h5>").text(movie.original_title);
                var movieTitle = $("<li style='list-style: none;'></li>").append(thisTitle);
                $("#section-browse ul").append(movieTitle);

                // set up the button for each movie, and push that data to the watchList when clicked
                var thisButton = $("<button></button>").text("Add to Watchlist").click(function()
                    {
			            model.watchlistItems.push(movie);
			            render();
		            });
		        movieTitle.append(thisButton);
            });
    }


// When the HTML document is ready, we call the discoverMovies function, and pass the render function as its callback
$(document).ready(function()
    {
        discoverMovies(render);
    });
