// Product data
const products = [
  {
    id: 1,
    name: 'Gaming Headphones',
    price: '$129.99',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Mechanical Mouse',
    price: '$79.99',
    image: 'https://media.s-bol.com/NJ1WEGQpzGoz/P1oEEVl/550x485.jpg'
  },
  {
    id: 3,
    name: 'Ergonomic Chair',
    price: '$349.99',
    image: 'https://tse3.mm.bing.net/th/id/OIP.kNm24ee63u-potrblD4RigHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    id: 4,
    name: '4K Gaming Monitor',
    price: '$599.99',
    image: 'https://tse2.mm.bing.net/th/id/OIP.6BwYSH6cXImvPZH6z49SRwHaFG?rs=1&pid=ImgDetMain&o=7&rm=3'
  }
];

// Function to get URL parameter
function getUrlParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Handle product detail page
if (document.querySelector('.product-detail')) {
  const productId = getUrlParam('id');
  const product = products.find(p => p.id == productId);

  if (product) {
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = product.price;
  } else {
    document.querySelector('.product-detail').innerHTML = `
      <h2>Product Not Found</h2>
      <p>We couldn't find the product you're looking for.</p>
      <a href="index.html" class="back-link">← Back to Store</a>
    `;
  }
}

// Handle navigation to product detail
document.querySelectorAll('.view-btn').forEach(button => {
  button.addEventListener('click', function() {
    const productId = this.closest('.product-card').dataset.id;
    window.location.href = `product.html?id=${productId}`;
  });
});

// AI Chat functionality
const askBtn = document.getElementById('ask-btn');
const questionInput = document.getElementById('user-question');
const responseContainer = document.getElementById('ai-response');

if (askBtn) {
  askBtn.addEventListener('click', async () => {
    const question = questionInput.value.trim();
    if (!question) {
      responseContainer.textContent = 'Please enter a question';
      return;
    }

    responseContainer.textContent = 'Thinking...';
    try {
      const response = await fetch('https://smeytdmsgiaygwvrtxbt.supabase.co/functions/v1/openrouter-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtZXl0ZG1zZ2lheWd3dnJ0eGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDI5NTgsImV4cCI6MjA5NjE3ODk1OH0.RYiS1EqdqgyRKLFBsrOWOtHnUaAfFzUGF2e8vbnm8pM'
        },
        body: JSON.stringify({ question })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      responseContainer.textContent = data.answer;
    } catch (error) {
      responseContainer.textContent = `Error: ${error.message}`;
      console.error('Chat error:', error);
    }
  });
}

// Handle checkout button
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', function() {
    alert('Payment processed! Thank you for your purchase.');
  });
}