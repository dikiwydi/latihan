$('.search-button').on('click',function(){
    
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=643e3303&s=' + $('.input-keyword').val(),
        success: result =>{
            const movies = result.Search;
            let cards = '' ;
            movies.forEach(m => {
                cards += showCard(m);
            });
    
            $('.movie-container').html(cards);
    
            // ketika di klik
            $('.modal-detail-button').on('click',function(){
                $.ajax({
                    url : 'http://www.omdbapi.com/?apikey=643e3303&i=' + $(this).data('imdbid'),
                    success : m =>{
                        const movieDetail = showMovies(m)
                        $('.modal-body').html(movieDetail)
                    },
                    error: e => {
                        console.log(e);
                    }
                })
            })
        }, 
        error: e => {
            console.log(e);
        }
    });

});





function showCard(m){
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" >
                    <div class="card-body">
                     <h5 class="card-title">${m.Title} </h5>
                     <p class="card-text">${m.Year}</p>
                     <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid='${m.imdbID}' >show detail</a>
                </div>
              </div>
            </div>`;
};

function showMovies(m){
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
         <img src="${m.Poster} " class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                <li class="list-group-item"><strong>director:</strong>${m.Director} </li>
                <li class="list-group-item"><strong>actor:</strong> ${m.Actors}</li>
                <li class="list-group-item"><strong>writer:</strong> ${m.Writer}</li>
                <li class="list-group-item"><strong>plot:</strong><br>${m.Plot} </li>
            </ul>  
        </div>
    </div>
</div>`;
}