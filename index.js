const button = document.getElementById('drawButton');
const message = document.getElementById('message');
const loader = document.getElementById('loader');
const modal = document.getElementById('myModal');
const modalText = document.getElementById('modalText');
const closeModal = document.querySelector('.close');

button.addEventListener('click', () => {
  // Показать загрузочную анимацию
  loader.style.display = 'block';
  button.disabled = true;
  message.style.display = 'none';

  // Симуляция задержки для имитации загрузки (например, ожидание ответа сервера)
  setTimeout(async () => {
    // Запрос к серверу
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbyMRnFhwAVclqONM3ENUI3GVgw3NByWBV-5dEM6Kx9bb6_ZfXP9UzzbGxlsfBsjAXo2/exec'
      );

      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
      const data = await response.json();

      // Остановить анимацию загрузки
      loader.style.display = 'none';
      button.disabled = false;

      // Показать сообщение с выигрышем в модальном окне
      if (data.prize) {
        modalText.innerHTML = `🎉 Շնորհավորում ենք, դուք ստանում եք ${data.prize}`;
        modal.style.display = 'block';
      } else {
        message.textContent = 'Ափսոս, բոլոր նվերներն արդեն ստացել են։';
        message.style.display = 'block';
      }
    } catch (error) {
      console.error('Ошибка:', error);
      loader.style.display = 'none';
      button.disabled = false;
      message.textContent = 'Произошла ошибка при попытке получить данные.';
      message.style.display = 'block';
    }
  }, 2000); // Задержка в 2 секунды для имитации загрузки
});

// Закрытие модального окна
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});
