import router from './router.ts';
import InputValidator from './services/validator';
import './style.css';

router();
// Создаем экземпляр класса при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const inputValidator = new InputValidator();
  console.log(inputValidator);
});
