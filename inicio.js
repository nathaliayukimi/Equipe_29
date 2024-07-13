
$(document).ready(function(){
    $('.carousel').slick({
        autoplay: true,
        autoplaySpeed: 500,
        dots: true,
        arrows: false,
        customPaging : function(slider, i) {
            var title = $(slider.$slides[i]).find('img').attr('alt');
            return '<span class="dot" role="button" tabindex="0"></span>';
        },
        appendDots: $('.custom-dots')
    });

$('.custom-dots .dot').on('click', function() {
    var slideIndex = $(this).index();
    $('.carousel').slick('slickGoTo', slideIndex);
});

$('.carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    $('.dot').removeClass('active');
    $('.dot').eq(nextSlide).addClass('active');
});
});