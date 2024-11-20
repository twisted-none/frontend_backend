document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    console.log('Menu toggle:', menuToggle);
    console.log('Main nav:', mainNav);
    
    if (menuToggle && mainNav) {
        console.log('Adding click event listener to menu toggle');
        menuToggle.addEventListener('click', function() {
            console.log('Menu toggle clicked');
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

});

document.addEventListener('DOMContentLoaded', function() {
    // Обработка таблиц посещаемости
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        table.addEventListener('click', function(e) {
            if (e.target.classList.contains('attendance') || e.target.classList.contains('completion')) {
                e.target.textContent = e.target.textContent === '✓' ? '' : '✓';
            }
        });
    });

    // Инициализация Яндекс карты
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(init);
        function init(){
            var myMap = new ymaps.Map("map", {
                center: [55.669984, 37.479318], // Coordinates for РТУ МИРЭА
                zoom: 15
            });
            
            var myPlacemark = new ymaps.Placemark([55.669984, 37.479318], {
                hintContent: 'РТУ МИРЭА',
                balloonContent: 'РТУ МИРЭА, проспект Вернадского, д. 78'
            });
            
            myMap.geoObjects.add(myPlacemark);
        }
    }

    // Добавляем обработчики событий для кнопок "Заказать"
    const orderButtons = document.querySelectorAll('.service-item button');
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.closest('.service-item').querySelector('h3').textContent.toLowerCase();
            openModal(serviceType);
        });
    });

    const myModal = new bootstrap.Modal(document.getElementById('modal'));

    // Функция открытия модального окна
    window.openModal = function(serviceType) {
        const modalTitle = document.querySelector(".modal-title");
        const serviceInput = document.getElementById("serviceType");
    
        let serviceName;
        switch (serviceType) {
            case 'сайт-визитка':
                serviceName = 'сайта-визитки';
                break;
            case 'корпоративный сайт':
                serviceName = 'корпоративного сайта';
                break;
            case 'интернет-магазин':
                serviceName = 'интернет-магазина';
                break;
            default:
                serviceName = '';
        }
    
        modalTitle.textContent = `Заказать разработку ${serviceName}`;
        serviceInput.value = serviceType;
        myModal.show();
    }

    // Функция закрытия модального окна
    window.closeModal = function() {
        myModal.hide();
    }

    // Закрытие модального окна при клике вне его
    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target == modal) {
            closeModal();
        }
    }

    // Валидация формы
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let name = document.getElementById('name').value;
            let email = document.getElementById('email').value;
            let phone = document.getElementById('phone').value;
            let country = document.getElementById('country').value;
            let date = document.getElementById('date').value;
            let comment = document.getElementById('comment').value;

            if (name && email && phone && country && date) {
                alert('Форма успешно отправлена!');
                closeModal();
                this.reset();
            } else {
                alert('Пожалуйста, заполните все обязательные поля.');
            }
        });
    }

    // Маска для номера телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : '+' + x[1] + ' (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Задание 1: Приветствие
    function task1() {
        let name = prompt('Введите ваше имя:');
        let age = prompt('Введите ваш возраст:');
        
        alert(`Привет, ${name}! Вам ${age} лет.`);
        console.log(`Задание 1 - Имя: ${name}, Возраст: ${age}`);
    }

    // Задание 2: Проверка возраста
    function task2() {
        let name = prompt('Введите ваше имя:');
        let age = Number(prompt('Введите ваш возраст:'));
        
        if (age >= 18) {
            alert('Вы совершеннолетний');
            console.log(`Задание 2 - ${name}, вы совершеннолетний`);
        } else {
            alert('Вы несовершеннолетний');
            console.log(`Задание 2 - ${name}, вы несовершеннолетний`);
        }
    }

    // Задание 3: Угадай число
    function task3() {
        const secretNumber = Math.floor(Math.random() * 10) + 1;
        const userGuess = Number(prompt('Угадайте число от 1 до 10:'));
        
        if (userGuess === secretNumber) {
            alert('Поздравляем! Вы угадали число!');
        } else if (userGuess < secretNumber) {
            alert('Загаданное число больше');
        } else {
            alert('Загаданное число меньше');
        }
        
        console.log(`Задание 3 - Секретное число: ${secretNumber}, Ваше число: ${userGuess}`);
    }

    // Задание 4: Проверка пароля
    function task4() {
        const correctPassword = "12345";
        const userPassword = prompt('Введите пароль:');
        
        if (userPassword && userPassword === correctPassword) {
            alert('Доступ разрешен');
            console.log('Задание 4 - Вход выполнен успешно');
        } else {
            alert('Доступ запрещен');
            console.log('Задание 4 - Неверный пароль');
        }
    }

    // Задание 5: Простой калькулятор
    function task5() {
        const num1 = Number(prompt('Введите первое число:'));
        const num2 = Number(prompt('Введите второе число:'));
        const operator = prompt('Введите оператор (+, -, *, /):');
        
        let result;
        switch(operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num2 !== 0 ? num1 / num2 : 'Нельзя делить на ноль';
                break;
            default:
                result = 'Неверный оператор';
        }
        
        alert(`Результат: ${result}`);
        console.log(`Задание 5 - Операция: ${num1} ${operator} ${num2} = ${result}`);
    }

    // Привязка кнопок к функциям
    document.getElementById('task1Btn').addEventListener('click', task1);
    document.getElementById('task2Btn').addEventListener('click', task2);
    document.getElementById('task3Btn').addEventListener('click', task3);
    document.getElementById('task4Btn').addEventListener('click', task4);
    document.getElementById('task5Btn').addEventListener('click', task5);
});

document.addEventListener('DOMContentLoaded', function() {
    // Задание 1: Переменные и условные операторы
    function task1() {
        const myName = 'Демьян';
        const myAge = 19;
        
        console.log(`Задание 1:`);
        console.log(`Имя: ${myName}`);
        console.log(`Возраст: ${myAge}`);
        
        if (myAge >= 18) {
            console.log('Вы совершеннолетний');
            alert('Вы совершеннолетний');
        } else {
            console.log('Вы несовершеннолетний');
            alert('Вы несовершеннолетний');
        }
    }

    // Задание 2: Циклы
    function task2() {
        console.log('Задание 2: Циклы');
        
        // Цикл for от 1 до 10
        console.log('Числа от 1 до 10:');
        for (let i = 1; i <= 10; i++) {
            console.log(i);
        }
        
        // Цикл while в обратном порядке
        console.log('Числа от 10 до 1:');
        let j = 10;
        while (j >= 1) {
            console.log(j);
            j--;
        }
    }

    // Задание 3: Работа с массивами
    function task3() {
        console.log('Задание 3: Работа с массивами');
        
        const lectures = ['Тема 1', 'Тема 2', 'Тема 3'];
        const practices = ['Практика 1', 'Практика 2', 'Практика 3'];
        
        // Добавление новых элементов
        lectures.push('Тема 4');
        practices.unshift('Практика 0');
        
        console.log('Темы лекций:');
        lectures.forEach(lecture => console.log(lecture));
        
        console.log('Темы практик:');
        practices.forEach(practice => console.log(practice));
        
        // Функция вывода массива в строку
        function printArrayToString(arr) {
            console.log(arr.join(', '));
        }
        
        console.log('Массивы в строку:');
        printArrayToString(lectures);
        printArrayToString(practices);
    }

    // Задание 4: Манипуляции с массивами
    function task4() {
        console.log('Задание 4: Манипуляции с массивами');
        
        const lectures = ['Основы Java', 'Теория алгоритмов', 'Объектно-ориентированное программирование', 'Операционные системы'];
        
        function filterLecturesStartingWithO(arr) {
            return arr.filter(lecture => lecture.startsWith('О'));
        }
        
        const filteredLectures = filterLecturesStartingWithO(lectures);
        
        console.log('Лекции, начинающиеся с "О":');
        console.log(filteredLectures);
    }

    // Привязка кнопок к функциям
    document.getElementById('task1Btn').addEventListener('click', task1);
    document.getElementById('task2Btn').addEventListener('click', task2);
    document.getElementById('task3Btn').addEventListener('click', task3);
    document.getElementById('task4Btn').addEventListener('click', task4);
});