document.addEventListener("DOMContentLoaded", function() {
    // Food data
    const foodData = [
        {
            "id": 1,
            "title": "Nasi Goreng",
            "description": "Nasi goreng adalah makanan berupa nasi yang digoreng dan diaduk dalam minyak goreng atau margarin.",
            "image": "./assets/nasigoreng.jpg"
        },
        {
            "id": 2,
            "title": "Sate Ayam",
            "description": "Sate ayam adalah makanan yang terbuat dari potongan daging ayam yang ditusuk dan dibakar.",
            "image": "./assets/sate.jpeg"
        },
        {
            "id": 3,
            "title": "Gado-Gado",
            "description": "Gado-gado adalah makanan berupa sayur-sayuran yang direbus dan dicampur jadi satu dengan bumbu kacang.",
            "image": "./assets/gadogado.jpeg"
        },
        {
            "id": 4,
            "title": "Rendang",
            "description": "Rendang adalah masakan daging bercita rasa pedas yang menggunakan campuran dari berbagai bumbu dan rempah-rempah.",
            "image": "./assets/rendang.jpg"
        },
        {
            "id": 5,
            "title": "Bakso",
            "description": "Bakso adalah jenis bola daging yang lazim ditemukan pada masakan Indonesia.",
            "image": "./assets/bakso.jpg"
        },
        {
            "id": 6,
            "title": "Soto",
            "description": "Soto adalah makanan khas Indonesia yang berupa sejenis sup yang terbuat dari kaldu daging dan sayuran.",
            "image": "./assets/soto.jpg"
        },
        {
            "id": 7,
            "title": "Nasi Uduk",
            "description": "Nasi uduk adalah makanan yang terbuat dari nasi yang diaron dan dikukus dengan santan kelapa.",
            "image": "./assets/nasiuduk.jpe"
        },
        {
            "id": 8,
            "title": "Pempek",
            "description": "Pempek adalah makanan khas Palembang yang terbuat dari ikan dan sagu.",
            "image": "./assets/pempek.jpg"
        },
        {
            "id": 9,
            "title": "Gudeg",
            "description": "Gudeg adalah makanan khas Yogyakarta yang terbuat dari nangka muda yang dimasak dengan santan.",
            "image": "./assets/gudeg.jpg"
        }
    ];

    // Load wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Filter out any invalid items from the wishlist
    wishlist = wishlist.filter(item => item && item.id);

    // Save the cleaned wishlist back to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Load food data
    const foodContainer = document.querySelector('.food-container');
    if (foodContainer) {
        foodData.forEach(food => {
            const foodCard = document.createElement('div');
            foodCard.classList.add('col-md-4');
            foodCard.innerHTML = `
                <div class="card mb-4 card-custom">
                    <img src="${food.image}" class="card-img-top" alt="Food Image">
                    <div class="card-body">
                        <h5 class="card-title">${food.title}</h5>
                        <p class="card-text">${food.description}</p>
                        <a href="#" class="btn btn-outline-danger add-to-wishlist" data-id="${food.id}"><i class="fas fa-heart"></i></a>
                    </div>
                </div>
            `;
            foodContainer.appendChild(foodCard);
        });
    }

    // Add to wishlist
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('fa-heart') || event.target.classList.contains('add-to-wishlist')) {
            event.preventDefault();
            const foodId = event.target.closest('.add-to-wishlist').getAttribute('data-id');
            const foodItem = foodData.find(item => item.id == foodId);
            if (foodItem && !wishlist.some(item => item.id == foodId)) {
                wishlist.push(foodItem);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                updateWishlist();

                Swal.fire({
                    title: 'Berhasil!',
                    text: `${foodItem.title} telah ditambahkan ke wishlist.`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        }
    });

    // Delete from wishlist
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-wishlist')) {
            event.preventDefault();
            const foodId = event.target.getAttribute('data-id');

            Swal.fire({
                title: 'Apakah Anda yakin?',
                text: "Item ini akan dihapus dari wishlist Anda!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    wishlist = wishlist.filter(item => item.id != foodId);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    updateWishlist();

                    Swal.fire(
                        'Dihapus!',
                        'Item telah dihapus dari wishlist Anda.',
                        'success'
                    );
                }
            });
        }
    });

    // Update wishlist display
    function updateWishlist() {
        const wishlistContainer = document.getElementById('wishlist-container');
        if (wishlistContainer) {
            wishlistContainer.innerHTML = '';
            wishlist.forEach(food => {
                const wishlistItem = document.createElement('div');
                wishlistItem.classList.add('col-md-4');
                wishlistItem.innerHTML = `
                    <div class="card mb-4 card-custom">
                        <img src="${food.image}" class="card-img-top" alt="Food Image">
                        <div class="card-body">
                            <h5 class="card-title">${food.title}</h5>
                            <p class="card-text">${food.description}</p>
                            <a href="#" class="btn btn-outline-danger delete-wishlist" data-id="${food.id}">Delete</a>
                        </div>
                    </div>
                `;
                wishlistContainer.appendChild(wishlistItem);
            });
        }
    }

    // Initial load of wishlist
    updateWishlist();

    // Search functionality
    const searchInput = document.querySelector('.form-control[type="search"]');
    const searchResults = document.createElement('div');
    searchResults.classList.add('search-results');
    searchInput.parentNode.appendChild(searchResults);

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = '';

        if (query) {
            const filteredFoods = foodData.filter(food => food.title.toLowerCase().includes(query));
            filteredFoods.sort((a, b) => a.title.localeCompare(b.title));

            if (filteredFoods.length > 0) {
                searchResults.style.display = 'block';
                filteredFoods.forEach(food => {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('search-result-item');
                    resultItem.textContent = food.title;
                    searchResults.appendChild(resultItem);
                });
            } else {
                searchResults.style.display = 'none';
            }
        } else {
            searchResults.style.display = 'none';
        }
    });
});