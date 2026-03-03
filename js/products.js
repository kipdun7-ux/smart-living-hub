// Load Featured Products
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
});

function loadFeaturedProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products.slice(0, 6);
            container.innerHTML = products.map(product => createProductCard(product)).join('');
        })
        .catch(error => console.error('Error loading products:', error));
}

function createProductCard(product) {
    const stars = '⭐'.repeat(Math.round(product.rating));
    
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.urgency ? `<span class="product-badge">${product.urgency.split(':')[0]}</span>` : ''}
            </div>
            <div class="product-body">
                <h3 class="product-title">${product.name}</h3>
                
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-count">(${product.reviews.toLocaleString()} reviews)</span>
                </div>
                
                <p class="product-description">${product.description}</p>
                
                <ul class="product-benefits">
                    ${product.benefits.slice(0, 2).map(b => `<li>${b}</li>`).join('')}
                </ul>
                
                <div class="product-price">
                    <span class="price-current">$${product.price}</span>
                    ${product.originalPrice ? `<span class="price-original">$${product.originalPrice}</span>` : ''}
                </div>
                
                <a href="${product.affiliateLink}" target="_blank" class="product-cta">
                    Check Price on Amazon →
                </a>
                
                ${product.urgency ? `<p class="product-urgency">⏱️ ${product.urgency}</p>` : ''}
            </div>
        </div>
    `;
}

// Load Products by Category
function loadProductsByCategory(category) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            const filtered = data.products.filter(p => p.category === category);
            container.innerHTML = filtered.map(product => createProductCard(product)).join('');
        })
        .catch(error => console.error('Error loading products:', error));
}
