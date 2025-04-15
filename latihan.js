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
        cards = ''
        movies.forEach(m => {
            cards += `<div class="col-md-4 my-3">
                        <div class="card" style="width: 18rem;">
                            <img src="${m.Poster}" class="card-img-top" alt="logo">
                            <div class="card-body">
                            <h5 class="card-title">${m.Title}</h5>
                            <p class="card-text">${m.Year}</p>
                            <a href="#" class="btn btn-primary movie-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">show details</a>
                            </div>
                        </div>
                    </div>`;
        });
        $('.row-movies').html(cards)
        $('.movie-detail-button').on('click',function(){
            $.ajax({
                url: `https://www.omdbapi.com/?apikey=e87fada5&i=` + $(this).data('imdbid')
            })
        }) 
    },
    error : (e) => {
        console.log(e.responseText);
    
    }
    })
}) 

