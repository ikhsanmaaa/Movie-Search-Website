$('.input-keyword').keypress(function(event) {
    if (event.which === 13) { 
      event.preventDefault(); 
      $('.search-button').click(); 
    }
  })
$('.search-button').on('click',function(){
    
    $.ajax({
        url : `https://www.omdbapi.com/?apikey=e87fada5&s=` + $('.input-keyword').val(),
        success : result => {
        const movies = result.Search;
        let cards = '';
        movies.forEach(m => {
            cards += showCards(m);
        });
        $('.row-movies').html(cards)
        $('.movie-detail-button').on('click',function(){
            $.ajax({
                url: `https://www.omdbapi.com/?apikey=e87fada5&i=` + $(this).data('imdbid'),
                success : m => {
                const details = showDetails(m)
                
                $('.container-list-group').html(details) 
                }
            })
        }) 
    },
    error : (e) => {
        console.log(e.responseText);
    }
    })
}) 

function showCards(m) {
  return `<div class="col-md-4 my-3">
            <div class="card" style="width: 18rem;">
                <img src="${m.Poster}" class="card-img-top" alt="logo">
                <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <p class="card-text">${m.Year}</p>
                <a href="#" class="btn btn-primary movie-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">show details</a>
                </div>
            </div>
        </div>`;
}

function showDetails(m) {
    return `<div class="row">
            <div class="col-md-3">
                <img src="${m.Poster}" class="img-fluid">
            </div>
            <div class="col-md">
                <ul class="list-group">
                    <li class="list-group-item active" aria-current="true"> <h4>${m.Title} (${m.Year})</h4> </li>
                    <li class="list-group-item"><strong>Director:</strong> ${m.Director} </li>
                    <li class="list-group-item"><strong>Actors:</strong> ${m.Actors}</li>
                    <li class="list-group-item"><strong>Plot: </strong> ${m.Plot}</li>
                </ul>
            </div>
        </div>
    </div>`;
}