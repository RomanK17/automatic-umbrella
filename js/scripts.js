'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const tabsContent = document.querySelectorAll('.tabcontent'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabsParent = document.querySelector('.tabheader__items');


    function hideTabsContent() {
        tabsContent.forEach(tabContent => {
            tabContent.style.display = 'none';
        })
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    hideTabsContent();

    function showTabContent(tabNumber = 0) {
        tabsContent[tabNumber].style.display = 'block';
        tabs[tabNumber].classList.add('tabheader__item_active');

    }

    showTabContent();

    tabsParent.addEventListener('click', (event) => {

        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, tabNumber) => {
                if (target == tab) {
                    hideTabsContent();
                    showTabContent(tabNumber);
                }
            });
        }
    })

});
