$(document).ready(() => {
	var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew7%3AUS&p=1&t=ns&st=adv",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
		"x-rapidapi-key": "22d95c216dmshd9c7b0d95bb37d4p1dcd6ejsnb496ab819159"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
	let movies = response.ITEMS;
	let output = '';
	$.each(movies, (index, movie) => {
		output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.image}" style="border:5px solid grey">
              <p></p>
              <a onclick="movieSelected('${movie.netflixid}')" class="btn btn-danger" href="#">View Details</a>
            </div>
          </div>
        `;
        //<h6 style="font-family:Courier">${movie.title}</h6>
	});

	 $('#movies').html(output);
});

var settings1 = {
	"async": true,
	"crossDomain": true,
	"url": "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Aexp%3AUS&t=ns&st=adv&p=1",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
		"x-rapidapi-key": "22d95c216dmshd9c7b0d95bb37d4p1dcd6ejsnb496ab819159"
	}
}

$.ajax(settings1).done(function (response) {
	console.log(response);
	let movies1 = response.ITEMS;
	let output1 = '';
	$.each(movies1, (index1, movie1) => {
		output1 += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie1.image}" style="border:5px solid grey">
              <p></p>
              <a onclick="movieSelected('${movie1.netflixid}')" class="btn btn-danger" href="#">View Details</a>
            </div>
          </div>
        `;
	});

	 $('#movies1').html(output1);
	});
	var settings2 = {
	"async": true,
	"crossDomain": true,
	"url": "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Aseasons5%3AUS&p=1&t=ns&st=adv",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
		"x-rapidapi-key": "22d95c216dmshd9c7b0d95bb37d4p1dcd6ejsnb496ab819159"
	}
}

$.ajax(settings2).done(function (response) {
	console.log(response);
	let movies2 = response.ITEMS;
	let output2 = '';
	$.each(movies2, (index2, movie2) => {
		output2 += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie2.image}" style="border:5px solid grey">
              <p></p>
              <a onclick="movieSelected('${movie2.netflixid}')" class="btn btn-danger" href="#">View Details</a>
            </div>
          </div>
        `;
	});

	 $('#movies2').html(output2);
});


	$('#searchForm').on('submit',(e) =>{
		let searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
});

function getMovies(searchText){
	sessionStorage.setItem('searchText1', searchText);
	window.location = 'search.html';
	return false;
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getSearchResults(){
	console.log("Here1");
	let fsearchText = sessionStorage.getItem('searchText1');
	var settings3 = {
	"async": true,
	"crossDomain": true,
	"url": "https://unogsng.p.rapidapi.com/search?query="+fsearchText,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "unogsng.p.rapidapi.com",
		"x-rapidapi-key": "22d95c216dmshd9c7b0d95bb37d4p1dcd6ejsnb496ab819159"
	}
}

$.ajax(settings3).done(function (response) {
	console.log(response);
	let movies3 = response.results;
	let output3 = '';
	$.each(movies3, (index3, movie3) => {
		output3 += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie3.img}" style="border:5px solid grey">
              <p></p>
              <a onclick="movieSelected('${movie3.nfid}')" class="btn btn-danger" href="#">View Details</a>
            </div>
          </div>
        `;
	});

	 $('#movies3').html(output3);

});
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=loadvideo&q="+movieId,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
		"x-rapidapi-key": "22d95c216dmshd9c7b0d95bb37d4p1dcd6ejsnb496ab819159"
	}
}

// Gets the movie details
$.ajax(settings).done(function (response) {
	console.log(response);
	let movie = response.RESULT;
	
	movie.nfinfo.type = movie.nfinfo.type.charAt(0).toUpperCase() + movie.nfinfo.type.slice(1);
	
	if(movie.nfinfo.matlabel === "")
	{
		movie.nfinfo.matlabel = 'N/A';
	}

	if(movie.imdbinfo.rating == "0"){
		movie.imdbinfo.rating = 'N/A';
	}

	if(movie.imdbinfo == "notfound"){
		movie.imdbinfo = {};
		movie.imdbinfo.genre = 'N/A';
		movie.imdbinfo.runtime = 'N/A';
		movie.imdbinfo.language = 'N/A';
		movie.imdbinfo.rating = 'N/A';
		movie.imdbinfo.country = 'N/A';
		movie.imdbinfo.awards = 'N/A';
	}

	console.log(movie);
	let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.nfinfo.image2}" class="thumbnail" style="border:5px solid grey">
          </div>
          <div class="col-md-8">
            <h2>${movie.nfinfo.title}</h2>
            <ul class="list-group">
            <li class="list-group-item"><strong>Type:</strong> ${movie.nfinfo.type}</li>
              <li class="list-group-item"><strong>Genre:</strong> ${movie.imdbinfo.genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.nfinfo.released}</li>
              <li class="list-group-item"><strong>Runtime:</strong> ${movie.imdbinfo.runtime}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbinfo.rating}</li>
              <li class="list-group-item"><strong>Country</strong> ${movie.imdbinfo.country}</li>
              <li class="list-group-item"><strong>Language:</strong> ${movie.imdbinfo.language}</li>
              <li class="list-group-item"><strong>Awards:</strong> ${movie.imdbinfo.awards}</li>
              <li class="list-group-item"><strong>Note:</strong> ${movie.nfinfo.matlabel}</li>
            </ul>
          </div>
        </div>
        <p></p>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.nfinfo.synopsis}
            <hr>
            <a href="https://www.netflix.com/title/${movie.nfinfo.netflixid}" target="_blank" class="btn btn-danger">Watch on Netflix</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;
       $('#movie').html(output);

});

 }