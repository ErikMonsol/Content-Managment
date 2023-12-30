// Function to fetch product data by post ID
async function fetchProductData(postId) {
    const apiUrl = `http://blogpost.local/wp-json/wp/v2/posts/${postId}`;
    const response = await fetch(apiUrl);
    const productData = await response.json();
    return productData;
}

// Function to display product details
function displayProductDetails(product, elementId) {
    const productDetailsElement = document.getElementById(elementId);
    productDetailsElement.innerHTML = `
        <h2>${product.title.rendered}</h2>
        <div>${product.content.rendered}</div>
    `;
}

// Function to display product thumbnail
function displayProductThumbnail(product, containerId) {
    const productGrid = document.getElementById(containerId);

    const productThumbnail = document.createElement('div');
    productThumbnail.className = 'productThumbnail';
    productThumbnail.innerHTML = `
        <h3>${product.title.rendered}</h3>
        <p>${product.excerpt.rendered}</p>
    `;

    // Add click event to navigate to product detail page
    productThumbnail.addEventListener('click', () => {
        displayProductDetails(product, 'productDetails');
    });

    productGrid.appendChild(productThumbnail);
}

// Function to get the product ID from URL parameters
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Fetch and display product details based on the URL parameter
const productIdFromUrl = getProductIdFromUrl();
if (productIdFromUrl) {
    fetchProductData(productIdFromUrl)
        .then(productData => {
            // Display product details on the product detail page
            displayProductDetails(productData, 'productDetails');
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
}

// Array of product IDs for the grid
const productIds = [29, 37, 35, 32, 1];

// Fetch and display details for each product in the grid
productIds.forEach(productId => {
    fetchProductData(productId)
        .then(productData => {
            // Display details in the grid
            const productGridContainerId = 'productGrid';
            displayProductThumbnail(productData, productGridContainerId);
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
});