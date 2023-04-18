$(document).ready(function() {
    $('[data-modal=registration]').on('click', function () {
        $('.overlay, #registration').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #registration, #thanks').fadeOut('slow');
    });
    
    //Script universel pour toutes mes formes
    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    require: "Please specify your name",
                    minlength: jQuery.validator.format("At least {0} characters required!")
                },
                phone: "Please specify your phone",
                email: {
                    required: "We need your email address to contact you",
                    email: "Your email address must be in the format of name@domain.com"
                }
            }
        });
    }
    valideForms('#registration form');
    
    $("input[name=phone]").inputmask('+7 (999) 999-99-99');
    $("input[name=email]").inputmask('email');
    
    //Submit form
    $('form').submit(function (e) {
        e.preventDefault();
    
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
    
        }).done(function () {
            $(this).find("input").val("");
            $('#registration').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    
    });

    //Smooth scroll and page up
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(_href).offset().top + "px"
        });
        return false;
    });

    AOS.init();

});
