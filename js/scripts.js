'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsParent = document.querySelector('.tabheader__items'),
        tabsContent = document.querySelectorAll('.tabcontent');

    function hideTabsContent() {
        tabsContent.forEach(tabContent => {
            tabContent.style.display = 'none';
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active')
        });
    }
    hideTabsContent();

    function showTabContent(tabNumber = 0) {
        tabsContent[tabNumber].style.display = 'block';
        tabs[tabNumber].classList.add('tabheader__item_active');
    }

    showTabContent()

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, tabNumber) => {
                if (target == tab) {
                    hideTabsContent();
                    showTabContent(tabNumber)
                }
            })
        }
    });
    // Timer
    // true discount
    // const deadline = '2023-04-11';
    // fake discount
    const deadline = new Date(Date.now() + 10000000);

    function getRemaininngTime(endTime) {
        const remainingTime = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(remainingTime / 86400000),
            hours = Math.floor((remainingTime / 3600000) % 24),
            minutes = Math.floor((remainingTime / 1000 / 60) % 60),
            seconds = Math.floor((remainingTime / 1000) % 60);

        return {
            'totalTime': remainingTime,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function checkForZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setTimer(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timerUpdateInterval = setInterval(updateTimer, 1000);
        updateTimer();




        function updateTimer() {
            const t = getRemaininngTime(endTime);

            days.innerHTML = checkForZero(t.days);
            hours.innerHTML = checkForZero(t.hours);
            minutes.innerHTML = checkForZero(t.minutes);
            seconds.innerHTML = checkForZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timerUpdateInterval)
            }
        }
    }

    setTimer('.timer', deadline);

    // modal window
    const modal = document.querySelector('.modal'),
        modalTrigger = document.querySelectorAll('[data-modal]'),
        closeModalBtn = document.querySelector('[data-closeModal]');

    // const modalTumer = setTimeout(showModal, 10000);

    function showModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', () => {
            showModal();
            clearTimeout(modalTumer);
        })
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'visible';

    }

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    })

    document.addEventListener('keydown', function (event) {
        if (event.code === "Escape" && modal.style.display === 'block') {
            closeModal();
        }
    });

    function showModalWhenScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalWhenScroll);
        }
    }
    window.addEventListener('scroll', showModalWhenScroll);

    // cards for dayMenu

    class MenuCard {
        constructor(imgSrc, alt, title, description, price, parentDiv) {
            this.imgSrc = imgSrc;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentDiv);
            this.currencyRate = 10;
            this.convertCurrency();
        }
        convertCurrency() {
            this.price = this.price * this.currencyRate;
        }
        render() {
            const newElem = document.createElement('div');
            newElem.innerHTML =
                `<div class="menu__item">
                <img src=${this.imgSrc} alt=${this.alt} />
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">
${this.description}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
                </div>`;
            this.parent.append(newElem);
        }

    }

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '[data-containerMenu]'
    ).render();

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        '[data-containerMenu]'
    ).render();

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        '[data-containerMenu]'
    ).render();

});





