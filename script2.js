
// // fecth
// const searchButton = document.querySelector('.search-button')
// const inputKeyword = document.querySelector('.input-keyword')
// searchButton.addEventListener('click',function(){
//     fetch('http://www.omdbapi.com/?apikey=643e3303&s=' + inputKeyword.value)
//     .then(response =>response.json())
//     .then(response=> {
//         const movies = response.Search;
//         let cards = ""
//         movies.forEach(m => cards += showCard(m))
//         const moviesContainer = document.querySelector('.movie-container')
//         moviesContainer.innerHTML = cards;

//         // ketika tombol di klik
//         const modalDetailButton = document.querySelectorAll('.modal-detail-button');
//         modalDetailButton.forEach(btn=> {
//             btn.addEventListener('click',function(){
//                 const imdbid = this.dataset.imdbid;
//                 fetch('http://www.omdbapi.com/?apikey=643e3303&i=' + imdbid)
//                 .then(response => response.json())
//                 .then(m =>{
//                     const movieDetail = showMovies(m);
//                     const modalBody = document.querySelector('.modal-body')
//                     modalBody.innerHTML = movieDetail;
//                 })
//             })
//         })
//     })
// });


const searchButton = document.querySelector('.search-button')
searchButton.addEventListener('click', async function () {
    const inputKeyword = document.querySelector('.input-keyword')
    const movies = await getMovies(inputKeyword.value)
    updateUI(movies)
});


// event binding 
document.addEventListener('click', async function(e){
    if(e.target.classList.contains('.modal-detail-button')){
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMoviesDetail(imdbid);
        updateUIDetail(movieDetail);
    }
});

function getMoviesDetail(imdbid){
    return fetch('http://www.omdbapi.com/?apikey=643e3303&i=' + imdbid)
                .then(response => response.json())
                .then(m => m)
}

function updateUIDetail(m){
    const movieDetail = showMovies(m);
    const modalBody = document.querySelector('.modal-body')
    modalBody.innerHTML = movieDetail;
}





function  getMovies(keyword){
    return fetch('http://www.omdbapi.com/?apikey=643e3303&s=' + keyword)
    .then(response => response.json())
    .then(response => response.Search)
}

function updateUI(movies){
    // karna tidak mengembalikan nilai, hanya menjalankan, jadi tidak pakek return
    let cards = '';
     movies.forEach(m => cards += showCard(m))
     const moviesContainer = document.querySelector('.movie-container')
     moviesContainer.innerHTML = cards;
}

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