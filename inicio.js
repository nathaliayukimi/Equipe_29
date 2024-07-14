$(document).ready(function(){
    $('.carousel').slick({
        autoplay: true,
        autoplaySpeed: 1700, // Ajuste conforme necessário
        dots: false, // Desativar os pontos padrão
        arrows: false,
        appendDots: $('.custom-dots')
    });

    // Captura o clique nos botões e navega para o slide correspondente
    $('.dot-btn').on('click', function() {
        var slideIndex = $(this).data('slide');
        $('.carousel').slick('slickGoTo', slideIndex);
    });

    // Atualiza a classe ativa nos botões ao mudar de slide
    $('.carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.dot-btn').removeClass('active');
        $('.dot-btn[data-slide="' + nextSlide + '"]').addClass('active');
    });
});
