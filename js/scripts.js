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

    const deadline = '2023-04-12';

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
});

