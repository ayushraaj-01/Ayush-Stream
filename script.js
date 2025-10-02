// Data and Rendering Logic
const movies = [
    {id: 1, title: "Breaking Bad", year: 2008, rating: 9.5, genre: "Thriller", img: "https://m.media-amazon.com/images/I/81d+ctRGhcL._UF894,1000_QL80_.jpg", desc: "A chemistry teacher turns to a life of crime to secure his family's future."},
    {id: 2, title: "Game of Thrones", year: 2011, rating: 9.2, genre: "Fantasy", img: "https://m.media-amazon.com/images/M/MV5BMDJmNDg0ODYtZjQ1OC00MTc2LThiODMtNmM5MGUxZWJhMjJkXkEyXkFqcGc@._V1_.jpg", desc: "Noble families vie for control of the Iron Throne in a brutal fantasy world."},
    {id: 3, title: "Attack on Titan", year: 2013, rating: 9.0, genre: "Animation", img: "https://static.toiimg.com/thumb/msid-120763006,width-1280,height-720,imgsize-139146,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg", desc: "Humans fight for survival against giant humanoid Titans."},
    {id: 4, title: "Death Note", year: 2006, rating: 9.0, genre: "Animation", img: "https://i.scdn.co/image/ab67616d0000b273d4cafdffd73a6d7bdb4a1439", desc: "A high school student discovers a notebook that can kill anyone."},
    {id: 5, title: "The Dark Knight", year: 2008, rating: 9.0, genre: "Action", img: "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_FMjpg_UX1000_.jpg", desc: "Batman faces his toughest challenge against the Joker."},
    {id: 6, title: "One Piece", year: 1999, rating: 8.8, genre: "Animation", img: "https://m.media-amazon.com/images/M/MV5BMTNjNGU4NTUtYmVjMy00YjRiLTkxMWUtNzZkMDNiYjZhNmViXkEyXkFqcGc@._V1_.jpg", desc: "Monkey D. Luffy sails to become the Pirate King with his crew."},
    {id: 7, title: "Inception", year: 2010, rating: 8.8, genre: "Sci-Fi", img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRyuWmayVBvqjd1MxTKpRgauq2cCtUzb7Q9QvaFTkAuxAU_EYMoCE3wBuJeftxIzf0grreIw", desc: "A thief infiltrates dreams to steal secrets and plant ideas."},
    {id: 8, title: "Demon Slayer", year: 2019, rating: 8.7, genre: "Animation", img: "https://upload.wikimedia.org/wikipedia/en/a/ae/Kimetsu_No_Yaiba_Mugen_Jyo-hen_theatrical_poster.jpg", desc: "A boy fights demons to save his sister from a curse."},
    {id: 9, title: "The Matrix", year: 1999, rating: 8.7, genre: "Sci-Fi", img: "https://m.media-amazon.com/images/I/613ypTLZHsL.jpg", desc: "A hacker discovers reality is a simulated world controlled by machines."},
    {id: 10, title: "Stranger Things", year: 2016, rating: 8.7, genre: "Sci-Fi", img: "https://m.media-amazon.com/images/M/MV5BMjg2NmM0MTEtYWY2Yy00NmFlLTllNTMtMjVkZjEwMGVlNzdjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", desc: "Kids uncover secret experiments and supernatural mysteries in their town."},
    {id: 11, title: "Spirited Away", year: 2001, rating: 8.6, genre: "Animation", img: "https://www.tallengestore.com/cdn/shop/files/SpiritedAway-HayaoMiyazaki-StudioGhibli-JapaneseAnimationMoviePoster_d1532f87-1ab6-4b2d-bdaa-7e33addf7ed9.jpg?v=1733380932", desc: "A girl navigates a magical world to save her parents."},
    {id: 12, title: "Interstellar", year: 2014, rating: 8.6, genre: "Sci-Fi", img: "https://resizing.flixster.com/47rDB5jGZrHWyRMRYMZKenbTcHU=/fit-in/705x460/v2/https://resizing.flixster.com/Y_sqtbGDcspx4oob3nD-lojSLjc=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2YyMWZjZTQ2LWQwZGItNGRhMi1hZjg3LWFhZDQ1YWU1OTQ2NC53ZWJw", desc: "Explorers travel through a wormhole to find a new home for humanity."},
    {id: 13, title: "Mad Max: Fury Road", year: 2015, rating: 8.1, genre: "Action", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPqhs0Q1QPWmWpBfqH32YBtxUhae_sa4xTXQ&s", desc: "In a post-apocalyptic world, Max helps a rebel escape a tyrant."},
    {id: 14, title: "Parasite", year: 2019, rating: 8.5, genre: "Thriller", img: "https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_.jpg", desc: "A poor family infiltrates a wealthy household with unexpected consequences."},
    {id: 15, title: "Pulp Fiction", year: 1994, rating: 8.9, genre: "Thriller", img: "https://www.tallengestore.com/cdn/shop/products/PulpFiction-JohnTravoltaAndSamuelLJackson-MovieStill1_e45cd25a-1957-4847-8b88-d2939a633e1d.jpg?v=1684129890", desc: "Interwoven stories of crime, love, and redemption in LA."},
];


let currentPage = 1;
const itemsPerPage = 8;

function renderMovies(list) {
    const grid = document.getElementById("movieGrid");
    grid.innerHTML = "";

    const genre = document.getElementById('genreFilter').value;
    const sortOrder = document.getElementById('sortRating').value;
    
    let filteredList = list.filter(m => genre === 'all' || m.genre === genre);

    filteredList.sort((a, b) => {
        return sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedList = filteredList.slice(startIndex, endIndex);

    paginatedList.forEach(m => {
        grid.innerHTML += `
            <div class="card">
                <span class="fav">♡</span>
                <img src="${m.img}" alt="${m.title}">
                <div class="card-content">
                    <h4 class="primary-gradient">${m.title}</h4>
                    <p>Release: ${m.year}</p>
                </div>
                <div class="rating">⭐ ${m.rating}</div>
            </div>`;
    });
    
    updatePaginationControls(filteredList.length);
}

function updatePaginationControls(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalItems === 0;
}

function changePage(direction) {
    const genre = document.getElementById('genreFilter').value;
    const sortOrder = document.getElementById('sortRating').value;

    let filteredList = movies.filter(m => genre === 'all' || m.genre === genre);
    
    filteredList.sort((a, b) => sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating);

    const totalPages = Math.ceil(filteredList.length / itemsPerPage);
    currentPage = Math.min(Math.max(1, currentPage + direction), totalPages);

    renderMovies(filteredList);
}


// Event Listeners
document.getElementById('genreFilter').addEventListener('change', () => {
    currentPage = 1;
    renderMovies(movies);
});
document.getElementById('sortRating').addEventListener('change', () => {
    renderMovies(movies);
});
document.getElementById('prevBtn').addEventListener('click', () => changePage(-1));
document.getElementById('nextBtn').addEventListener('click', () => changePage(1));


renderMovies(movies);


function addFavListeners() {
    const favButtons = document.querySelectorAll('.fav');
    favButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            
        });
    });
}



function renderMovies(list) {
    const grid = document.getElementById("movieGrid");
    grid.innerHTML = "";

    const genre = document.getElementById('genreFilter').value;
    const sortOrder = document.getElementById('sortRating').value;

    let filteredList = list.filter(m => genre === 'all' || m.genre === genre);

    filteredList.sort((a, b) => {
        return sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedList = filteredList.slice(startIndex, endIndex);

    paginatedList.forEach(m => {
        grid.innerHTML += `
            <div class="card">
                <span class="fav">♡</span>
                <img src="${m.img || 'https://via.placeholder.com/300x450?text=No+Image'}" alt="${m.title}">
                <div class="card-content">
                    <h4 class="primary-gradient">${m.title}</h4>
                    <p>Release: ${m.year}</p>
                </div>
                <div class="rating">⭐ ${m.rating}</div>
            </div>`;
    });

    updatePaginationControls(filteredList.length);
    addFavListeners(); 
}




let watchlist = [];

function addCardClickListeners() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            // Prevent click if heart is clicked
            if(e.target.classList.contains('fav')) return;

            const movie = movies[index + (currentPage-1)*itemsPerPage]; // get correct movie index
            openModal(movie);
        });
    });
}

function openModal(movie) {
    const modal = document.getElementById('movieModal');
    modal.style.display = "block";

    document.getElementById('modalImg').src = movie.img;
    document.getElementById('modalTitle').innerText = movie.title;
    document.getElementById('modalYearRating').innerText = `Year: ${movie.year} | Rating: ⭐ ${movie.rating}`;
    document.getElementById('modalGenre').innerText = `Genre: ${movie.genre}`;
    document.getElementById('modalDesc').innerText = movie.desc;

    const watchBtn = document.getElementById('watchlistBtn');
    watchBtn.innerText = watchlist.includes(movie.id) ? "Remove from Watchlist" : "Add to Watchlist";

    watchBtn.onclick = () => {
        if(watchlist.includes(movie.id)){
            watchlist = watchlist.filter(id => id !== movie.id);
            watchBtn.innerText = "Add to Watchlist";
        } else {
            watchlist.push(movie.id);
            watchBtn.innerText = "Remove from Watchlist";
        }
        console.log("Watchlist IDs:", watchlist);
    }
}

// Close modal
document.querySelector('.modal .close').onclick = () => {
    document.getElementById('movieModal').style.display = "none";
}

// Close modal if clicked outside content
window.onclick = (event) => {
    const modal = document.getElementById('movieModal');
    if(event.target === modal) modal.style.display = "none";
}

// Update renderMovies function to call card click listeners
function renderMovies(list) {
    const grid = document.getElementById("movieGrid");
    grid.innerHTML = "";

    const genre = document.getElementById('genreFilter').value;
    const sortOrder = document.getElementById('sortRating').value;

    let filteredList = list.filter(m => genre === 'all' || m.genre === genre);

    filteredList.sort((a, b) => sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedList = filteredList.slice(startIndex, endIndex);

    paginatedList.forEach(m => {
        grid.innerHTML += `
            <div class="card">
                <span class="fav">♡</span>
                <img src="${m.img || 'https://via.placeholder.com/300x450?text=No+Image'}" alt="${m.title}">
                <div class="card-content">
                    <h4 class="primary-gradient">${m.title}</h4>
                    <p>Release: ${m.year}</p>
                </div>
                <div class="rating">⭐ ${m.rating}</div>
            </div>`;
    });

    updatePaginationControls(filteredList.length);
    addFavListeners(); 
    addCardClickListeners(); // <-- Add this line
}
