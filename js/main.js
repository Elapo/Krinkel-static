$( document ).ready(function(){
    $(".button-collapse").sideNav();
    $('.carousel').carousel();
    checkBrowser();
});

function checkBrowser() {
    let isChromium = window.chrome,
        winNav = window.navigator,
        vendorName = winNav.vendor,
        isOpera = winNav.userAgent.indexOf("OPR") > -1,
        isIEedge = winNav.userAgent.indexOf("Edge") > -1,
        isIOSChrome = winNav.userAgent.match("CriOS");

    let parallaxHome = document.getElementById('parallaxHome');
    let parallaxOver = document.getElementById('parallaxOver');
    let parallaxFaq = document.getElementById('parallaxFaq');

    if (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
        // is Google Chrome
        if (!!parallaxHome) {
            parallaxHome.style.backgroundAttachment = 'fixed';
            parallaxHome.style.backgroundPosition = '50% 25%';
        } else if (!!parallaxOver) {
            parallaxOver.style.backgroundAttachment = 'fixed';
            parallaxOver.style.backgroundPosition = '50% 60%';
        }
        else if(!!parallaxFaq){
            parallaxFaq.style.backgroundAttachment = 'fixed';
            parallaxFaq.style.backgroundPosition = '50% 60%';
        }

    }
    let browser = navigator.userAgent.toLowerCase();
    if (browser.indexOf('firefox') > -1) {
        if (!!parallaxHome) {
            parallaxHome.style.backgroundAttachment = 'fixed';
            parallaxHome.style.backgroundPosition = '50% 25%';
        } else if (!!parallaxOver) {
            parallaxOver.style.backgroundAttachment = 'fixed';
            parallaxOver.style.backgroundPosition = '50% 60%';
        }
        else if(!!parallaxFaq){
            parallaxFaq.style.backgroundAttachment = 'fixed';
            parallaxFaq.style.backgroundPosition = '50% 60%';
        }
    }
}

$('.carousel.carousel-slider').carousel({full_width: true});

$('#landingPageMainImageScrollButtonAction').on('click', function(){
    $('html, body').animate({
        scrollTop: $('#landingPageInfoWrapper').offset().top - 40
    }, 1000); //tijd in ms
});
