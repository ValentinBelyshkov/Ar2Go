mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJnb3R1ciIsImEiOiJjbHRjdDl4MXkwaWNhMmxudHdoanRld2FjIn0.G79J2Kjd8l2jrEQnc1EdyA";

var myMap = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [37.622093, 55.753994],
  zoom: 10,
});

// Получаем текущее местоположение пользователя
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

// Функция, вызываемая при успешном получении местоположения пользователя
function successLocation(position) {
  var userLocation = [position.coords.longitude, position.coords.latitude]; // координаты пользователя

  // Создаем маркеры на карте
  var point1 = createMarker([37.618423, 55.751244], "Точка 1");
  var point2 = createMarker([37.6177, 55.808488], "Точка 2");
  var point3 = createMarker([37.365014, 55.749667], "Точка 3");
  var point4 = createMarker([37.785242, 55.730298], "Точка 4");
  var point5 = createMarker([19.828523, 45.263292], "Точка 5");
  var point6 = createMarker([20.459849, 44.817047], "Точка 6");
  var point7 = createMarker([59.941408, 30.352682], "Точка 7");

  // Функция для создания маркера
  function createMarker(coordinates, hintContent) {
    var marker = new mapboxgl.Marker() // создаем маркер
      .setLngLat(coordinates) // устанавливаем координаты маркера
      .setPopup(new mapboxgl.Popup().setHTML(hintContent)) // добавляем подсказку
      .addTo(myMap); // добавляем маркер на карту

    // Добавляем обработчик клика на маркер
    marker.getElement().addEventListener("click", function () {
      var markerLngLat = marker.getLngLat().toArray(); // Получаем координаты маркера
      var distance = turf.distance(userLocation, markerLngLat); // Вычисляем расстояние
      alert("Расстояние от вас до маркера: " + distance.toFixed(2) + " метров");
    });

    return marker;
  }

  // Функция для рассчета расстояния и проверки расстояния в режиме реального времени
  function checkDistanceRealTime(userLngLat) {
    var closestDistance = Infinity; // Инициализируем расстояние как бесконечность
    var closestPoint = null; // Инициализируем ближайшую точку как null

    // Массив всех точек
    var points = [point1, point2, point3, point4, point5, point6, point7];

    // Проходим по всем точкам, чтобы найти ближайшую
    points.forEach(function (point) {
      var pointLngLat = point.getLngLat().toArray(); // Преобразуем координаты маркера в формат массива чисел
      var distance = turf.distance(userLngLat, pointLngLat); // Расстояние между пользователем и маркером
      if (distance < closestDistance) {
        closestDistance = distance; // Обновляем ближайшее расстояние
        closestPoint = point; // Обновляем ближайшую точку
      }
    });

    // Если ближайшее расстояние меньше или равно 100 метрам, показываем кнопку "Забрать приз"
    if (closestDistance <= 100) {
      var claimPrizeBtn = document.getElementById("claimPrizeBtn");
      claimPrizeBtn.style.display = "block"; // Показываем кнопку
      claimPrizeBtn.addEventListener("click", function () {
        alert("Поймай героя!");
      });
    } else {
      var claimPrizeBtn = document.getElementById("claimPrizeBtn");
      claimPrizeBtn.style.display = "none"; // Скрываем кнопку
    }

    alert("Ближайшее расстояние до точки: " + closestDistance + " метров");
  }

  // Функция, вызываемая при изменении местоположения пользователя
  function updateLocation(position) {
    var userLngLat = [position.coords.longitude, position.coords.latitude]; // Преобразуем координаты пользователя в формат массива чисел
    checkDistanceRealTime(userLngLat); // Вызываем функцию для рассчета расстояния в режиме реального времени
  }

  // Обновляем местоположение пользователя в реальном времени
  navigator.geolocation.watchPosition(updateLocation, errorLocation, {
    enableHighAccuracy: true,
  });

  // Функция для создания маркера для текущего местоположения пользователя с аватаркой
  var userMarker = new mapboxgl.Marker({
    element: createAvatarElement(), // Используем функцию для создания элемента с аватаркой
    anchor: "bottom", // Устанавливаем якорь маркера внизу
  })
    .setLngLat(userLocation) // Устанавливаем координаты маркера
    .addTo(myMap); // Добавляем маркер на карту

  // Функция для создания элемента с аватаркой
  function createAvatarElement() {
    var element = document.createElement("div");
    element.style.backgroundImage =
      'url("https://cdn.glitch.global/6d050929-c504-46d6-a7e8-4452a7970304/avatar.png?v=1710146209174")';
    element.style.backgroundSize = "cover";
    element.style.width = "40px";
    element.style.height = "40px";
    return element;
  }
}

// Функция, вызываемая при ошибке получения местоположения пользователя
function errorLocation() {
  console.error("Unable to retrieve your location");
}

document.getElementById("claimPrizeBtn").addEventListener("click", function () {
  // Перенаправляем пользователя на страницу с дополненной реальностью
  window.location.href = "views.html";
});
