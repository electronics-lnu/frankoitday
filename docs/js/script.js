import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'

window.addEventListener('load', () => {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
})

window.addEventListener('DOMContentLoaded', () => {

    if (window.innerWidth < 992) {
        document.querySelector('#schedule-link').setAttribute('href', '#Schedule-mobile')
    }

    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const menuLink = document.querySelectorAll('.menu__link');

    menuLink.forEach(link => {
        link.addEventListener('click', function(){
            menuBtn.classList.remove('menu-active');
            menu.classList.remove('menu-active');
        })
    })

    menuBtn.addEventListener('click', function(){
        menuBtn.classList.toggle('menu-active');
        menu.classList.toggle('menu-active');
    })

    const popup = document.querySelector('.popup');
    const speakerImages = document.querySelectorAll('.speaker__img');
    console.log(popup, speakerImages)
    speakerImages.forEach(speakerImg => {
        speakerImg.addEventListener('click', () => {
            const speakerName = speakerImg.parentElement.querySelector('.speaker__name').textContent;
            const speakerCompany = speakerImg.parentElement.querySelector('.speaker__company').textContent;
            const speakerPost = speakerImg.parentElement.querySelector('.speaker__post').textContent;
            const speakerImgSrc = speakerImg.getAttribute('src');
            const speakerDescription = speakerImg.parentElement.getAttribute('data-description');
            popup.innerHTML = `
            <div class="container">
                    <div class="popup__info">
                        <img src="${speakerImgSrc}" alt="" class="speaker__img">
                        <div class="popup__column">
                            <div class="speaker__name">${speakerName}</div>
                            <div class="speaker__post">${speakerPost}</div>
                            <div class="speaker__company">${speakerCompany}</div>
                        </div>
                    </div>
                    <div class="popup__description">${speakerDescription}</div>
                </div>
                <img src="./img/decor/cross.svg" class="popup__close" alt="">
            `
            const promise = new Promise((resolve) => {
                popup.style.display = 'flex';
                setTimeout(() => {
                    popup.style.opacity = '1';
                    resolve();
                }, 300)
            }).then(() => {
                popup.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
                const popupCloseButton = document.querySelector('.popup__close');
                popupCloseButton.addEventListener('click', () => {
                    popup.style.opacity = '0';
                    setTimeout(() => {
                        popup.style.display = 'none';
                    }, 300)
                })
            }).catch(e => {
                console.log(e);
            })
        })
    })

    function youtubeParser(url){
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    }

    function onYouTubeIframeAPIReady() {
        const player1 = new YT.Player('video1', {
            height: '360',
            width: '640',
            videoId: youtubeParser('https://www.youtube.com/watch?v=64zuCXUlrxU&ab_channel=%D0%A4%D0%B0%D0%BA%D1%83%D0%BB%D1%8C%D1%82%D0%B5%D1%82%D0%B5%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%BE%D0%BD%D1%96%D0%BA%D0%B8%D1%82%D0%B0%D0%BA%D0%BE%D0%BC%D0%BF%27%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D0%B8%D1%85%D1%82%D0%B5%D1%85%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D0%B9')
        });
        const player2 = new YT.Player('video2', {
            height: '360',
            width: '640',
            videoId: youtubeParser('https://www.youtube.com/watch?v=8L0NXSBM4UE&ab_channel=%D0%A4%D0%B0%D0%BA%D1%83%D0%BB%D1%8C%D1%82%D0%B5%D1%82%D0%B5%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%BE%D0%BD%D1%96%D0%BA%D0%B8%D1%82%D0%B0%D0%BA%D0%BE%D0%BC%D0%BF%27%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D0%B8%D1%85%D1%82%D0%B5%D1%85%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D0%B9')
        });
    }

    onYouTubeIframeAPIReady();

    AOS.init({
        duration : 700
    });

    const swiper = new Swiper(".swiper", {
        loop: true,
        slidesPerView: 1,
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
        },
    });

    const firstScheduleNavigationButton = document.querySelector('[data-schedule-navigation="1"]')
    const secondScheduleNavigationButton = document.querySelector('[data-schedule-navigation="2"]')
    const firstScheduleLecturesBlock = document.querySelector('[data-schedule-lectures="1"]')
    const secondScheduleLecturesBlock = document.querySelector('[data-schedule-lectures="2"]')

    function onNavigationClick(displayedElement, removedElement) {
        if (removedElement.style.display === 'none') return
        const promise = new Promise((resolve) => {
            removedElement.style.opacity = '0';
            setTimeout(() => {
                removedElement.style.display = 'none';
                resolve()
            }, 300)
        })
        promise.then(() => {
            displayedElement.style.opacity = '1';
            displayedElement.style.display = 'flex';
        })
    }

    firstScheduleNavigationButton.addEventListener('click', () => {
        firstScheduleNavigationButton.classList.add('active');
        secondScheduleNavigationButton.classList.add('sliding-hover');
        secondScheduleNavigationButton.classList.remove('active');
        firstScheduleNavigationButton.classList.remove('sliding-hover');
        onNavigationClick(firstScheduleLecturesBlock, secondScheduleLecturesBlock);
    })

    secondScheduleNavigationButton.addEventListener('click', () => {
        secondScheduleNavigationButton.classList.add('active');
        firstScheduleNavigationButton.classList.add('sliding-hover');
        firstScheduleNavigationButton.classList.remove('active');
        secondScheduleNavigationButton.classList.remove('sliding-hover');
        onNavigationClick(secondScheduleLecturesBlock, firstScheduleLecturesBlock);
    })
})