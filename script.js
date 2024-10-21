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

    // Функция открытия модального окна
    window.openModal = function(serviceType) {
        const modal = document.getElementById("modal");
        const modalTitle = modal.querySelector("h2");
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
        serviceInput.value = serviceName;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";  // Предотвращаем прокрутку страницы
    }

    // Функция закрытия модального окна
    window.closeModal = function() {
        const modal = document.getElementById("modal");
        modal.style.display = "none";
        document.body.style.overflow = "";  // Возвращаем прокрутку страницы
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