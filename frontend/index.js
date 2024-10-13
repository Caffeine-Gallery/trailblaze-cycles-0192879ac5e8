import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const bikeList = document.getElementById('bike-list');

  async function loadBikes() {
    try {
      const bikes = await backend.getAllBikes();
      bikeList.innerHTML = '';
      bikes.forEach(bike => {
        const bikeElement = document.createElement('div');
        bikeElement.className = 'bike-item';
        bikeElement.innerHTML = `
          <h2>${bike.name}</h2>
          <p>${bike.description}</p>
          <p>Price: $${bike.price}</p>
          <p>In stock: ${bike.stock}</p>
          <button onclick="purchaseBike(${bike.id})">Purchase</button>
        `;
        bikeList.appendChild(bikeElement);
      });
    } catch (error) {
      console.error('Error loading bikes:', error);
    }
  }

  window.purchaseBike = async (id) => {
    try {
      const success = await backend.purchaseBike(id);
      if (success) {
        alert('Bike purchased successfully!');
        loadBikes();
      } else {
        alert('Failed to purchase bike. It might be out of stock.');
      }
    } catch (error) {
      console.error('Error purchasing bike:', error);
      alert('An error occurred while purchasing the bike.');
    }
  };

  // Initial load
  loadBikes();
});
