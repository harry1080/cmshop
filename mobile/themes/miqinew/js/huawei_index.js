$(function () {
    var a = document.location.pathname;
    if (null == a || "" == a || "/member/exchange" == a) {
        a = "/"
    }
    if ($("#slider-huawei li").length > 1) {
        Swiper("#slider-huawei", {
            pagination: "#sliderNav-huawei",
            paginationClickable: true,
            loop: true,
            centeredSlides: true,
            autoplay: 2000,
            autoplayDisableOnInteraction: false
        })
    } else {
        Swiper("#slider-huawei", {centeredSlides: true,})
    }
    Utils.imagelazy.lazyLoad("img")
});
