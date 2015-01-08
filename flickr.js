var flickr_api_key = '';
var flickr_api_url = 'https://api.flickr.com/services/rest';
var flickr_photo_url = 'https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_m.jpg';

var photos_container;
var flickr_api_input;

$(function () {
    photos_container = $('#photos-container');
    flickr_api_input = $('#api-input');
    
    $('#search-form').submit(handle_search_submit);
});

function handle_search_submit() {
    clear_pictures();
    var search_value = $('#search-input').val();
    search(search_value);
    
    return false;
}

function clear_pictures() {
    $.Velocity.animate(photos_container.find('figure'), 
        {
            left: $(window).width() + 500,
            duration: 200,

        }, "ease-in").then(function(element) {
            $(element).destroy();
        });
}

function search(search_value) {
    
    var params = {
        method: "flickr.photos.search",
        api_key: flickr_api_input.val(),
        tags: search_value,
        per_page: 50,
        format: "json",
        nojsoncallback: 1
    }

    $.getJSON(flickr_api_url, params,
        function (response) {
            var photos = response.photos.photo;
            //console.log(photos);
            for (var i = 0; i < photos.length; i++) {
                var url = flickr_photo_url
                    .replace('{farm-id}', photos[i].farm)
                    .replace('{server-id}', photos[i].server)
                    .replace('{id}', photos[i].id)
                    .replace('{secret}', photos[i].secret);

                //console.log(url);
                var figure = $('<figure>').addClass('start');
                var img = $('<img>').attr('src', url).appendTo(figure);
                photos_container.append(figure);
                
                var position = random_position();
                
                figure.delay(50*i).velocity({
                    rotateZ: random_degrees() + "deg",
                    duration: 500,
                    left: position.x,
                    top: position.y,
                    opacity: 1
                });
            }
        }
    );
}

function random_position() {
    return {
        x: Math.floor(Math.random() * $(window).width()),
        y: Math.floor(Math.random() * $(window).height())
    }
}

function random_degrees() {
    return Math.floor(Math.random() * 720);
}