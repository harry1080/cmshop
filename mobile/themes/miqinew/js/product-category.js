Utils.pkg("ecWap.category");
$(".bottom-area").css("bottom", "-20em");
ecWap.category.cagetoryInfoMap = {};
ecWap.category.initCagetoryInfo = function (a) {
    $.each(a, function (b, c) {
        ecWap.category.cagetoryInfoMap[c.id] = c
    })
};
ecWap.category.changeCagetoryInfoTab = function (b) {
    $(b).parent().closest("ul").find("a").removeClass("current");
    $(".category-right").hide().removeClass("current");
    var a = $(b).addClass("current").attr("data");
    $("#category-" + a).show().addClass("current");
    $(".category-right").scrollTop(0)
};
ecWap.category.initSwiper = function () {
    var a = new Swiper(".swiper-container", {
        pagination: ".swiper-pagination",
        slidesPerView: 3.35,
        paginationClickable: true,
        freeMode: true,
        watchSlidesProgress: true
    })
};
