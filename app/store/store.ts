// Создаем переменную для хранения текущего тура
let currentTour: string = "";

// Массив функций-подписчиков
const subscribers: (() => void)[] = [];

// Функция для обновления значения тура
export const setTour = (tourName: string) => {
  currentTour = tourName;
  // Уведомляем всех подписчиков об изменении
  subscribers.forEach((callback) => callback());
};

// Функция для получения текущего значения тура
export const getTour = () => currentTour;

// Функция для подписки на изменения
export const subscribeTourChange = (callback: () => void) => {
  subscribers.push(callback);
  // Возвращаем функцию для отписки
  return () => {
    const index = subscribers.indexOf(callback);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
};
