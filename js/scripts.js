'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const tabsContent = document.querySelectorAll('.tabcontent'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabsHeader = document.querySelector('.tabheader__items');


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
});
