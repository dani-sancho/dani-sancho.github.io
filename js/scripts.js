window.onload = function() {
    init();
};

//Funciones on scroll de la página
window.addEventListener('scroll', function(){
    //Comprueba y muestra/oculta el botón de scroll
    checkifbuttonup();
    checkScrollSections();
});

//Funciones on resize de la página
window.addEventListener('resize', function(event) {
    CloseMenuResponsive("true");
}, true);

/**
 * Funciones onload de la web
 */
function init(){
    //Ponemos la clase de contenido cargado al body, para mostrar
    //los textos y demás que estén ocultos por default.
    document.body.classList.add("readyContent");

    //Cargamos content partículas de la web
    loadParticles();

    //Seteamos la edad a partir de la fecha de nacimiento
    $("#age").text(calculateAge());

    //Comprobamos si tenemos hash en la url
    if(location.hash != ""){

        //Comprobamos si el hash es debido al mensaje de contacto enviado
        if (location.hash == "#msgok" || location.hash == "#msgok2"){

            //Instanciamos las variables vacías
            var titleSwal = '';
            var msgSwal = '';

            //Comprobamos qué idioma tenemos que sacar para el mensaje
            if (location.hash == "#msgok"){
                //Mensaje español
                titleSwal = $("#swalMessageContact1").val();
                msgSwal = $("#swalMessageContact1").data("msg");
            }else{
                //Mensaje inglés
                titleSwal = $("#swalMessageContact2").val();
                msgSwal = $("#swalMessageContact2").data("msg");
            }

            //Lanzamos alerta de ok
            Swal.fire({
                icon: 'success',
                title: titleSwal,
                text: msgSwal,
                confirmButtonColor: '#37BC9B',
                confirmButtonText: '<i class="far fa-check-circle"></i> Ok'
            });

        }

        //Eliminamos el hash de la url sin recargar
        removeHashUrl();
    }
}
/**
 * Esta función cargará las partículas, tanto desktop como responsive.
 * Esta librería tiene un bug con el json, de modo que toca cargarlo
 * via js..
 */
function loadParticles(){
    //Particulas vista grande
    tsParticles.load("headerCv", {
        particles: {
            number: {
                value: 200,
                density: {
                    enable: true,
                    area: 800
                }
            },
            color: {
                value: ["#000000", "#F7F7F7", "#FFFFFF"]
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#b6b2b2"
                }
            },
            opacity: {
                value: 0.5211089197812949,
                random: false,
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            size: {
                value: 8.017060304327615,
                random: true,
                animation: {
                    enable: true,
                    speed: 12.181158184520175,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            lineLinked: {
                enable: true,
                distance: 150,
                color: "#c8c8c8",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: false,
                straight: false,
                outMode: "bounce",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detectOn: "canvas",
            events: {
                onHover: {
                    enable: true,
                    mode: "bubble"
                },
                onClick: {
                    enable: false,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    lineLinked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 50,
                    size: 10,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                connect: {},
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        detectRetina: true
    });


    //Partículas Responsive
    tsParticles.load("headerCvResponsive", {
        particles: {
            number: {
                value: 200,
                density: {
                    enable: true,
                    area: 800
                }
            },
            color: {
                value: ["#000000", "#F7F7F7", "#FFFFFF"]
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#b6b2b2"
                }
            },
            opacity: {
                value: 0.5211089197812949,
                random: false,
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            size: {
                value: 8.017060304327615,
                random: true,
                animation: {
                    enable: true,
                    speed: 12.181158184520175,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            lineLinked: {
                enable: true,
                distance: 150,
                color: "#c8c8c8",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: false,
                straight: false,
                outMode: "bounce",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detectOn: "canvas",
            events: {
                onHover: {
                    enable: true,
                    mode: "bubble"
                },
                onClick: {
                    enable: false,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    lineLinked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 50,
                    size: 10,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                connect: {},
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        detectRetina: true
    });
}

/**
 * Función para obtener los años que tengo,
 * y no tener que modificar nunca la vista.
 * @returns {number} -> edad
 */
function calculateAge() {
    //Año de nacimiento
    var birthday = "23/01/1998";

    //Convertimos en array separando por la barra /
    birthday = birthday.split("/");

    //Obtenemos el objeto date de la fecha de nacimiento
    birthday = new Date(birthday[2], birthday[1] - 1, birthday[0]);

    //Descontamos la fecha de nacimiento con la fecha actual
    birthday = Date.now() - birthday.getTime();

    //Cargamos el objeto Date dado el time de la fecha actual - nacimiento
    birthday = new Date(birthday);

    //Devolvemos la edad
    return Math.abs(birthday.getUTCFullYear() - 1970);
}

/**
 * Función onclick del botón de traducir el CV
 */
function changeLanguageBtn(){

    //Obtenemos Id del lenguaje actual. 1 -> español, 2 -> inglés
    var langId = $("#languageId").val();
    parseInt(langId);

    //Obtenemos título y mensaje swal
    var titleSwal = $("#swalMessage"+langId).val();
    var msgSwal = $("#swalMessage"+langId).data("msg");

    //Ejecutamos laoder
    Swal.fire({
        title: titleSwal,
        html: msgSwal,
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    });

    //Traducimos el cv
    translateCV();

    //Esperamos 300ms y quitamos loader de swal
    setTimeout(function(){
        Swal.close();
    },300);

}

/**
 * Función interna para traducir el CV
 */
function translateCV(){
    //Buscamos todos los textos traducibles
    $(".translatable").each(function() {
        //Los traducimos uno a uno
        var lastTranslate = $(this).text();
        $(this).text($(this).data('translate'));
        //Y cambiamos su data para poder traducirlo a la inversa
        $(this).data('translate',lastTranslate);
    });

    //Buscamos todos los values a traducir
    $(".translatablevalue").each(function() {
        //Los traducimos uno a uno
        var lastTranslate = $(this).val();
        $(this).val($(this).data('translate'));
        //Y cambiamos su data para poder traducirlo a la inversa
        $(this).data('translate',lastTranslate);
    });

    //Seteamos Id del nuevo lengauje
    if ($("#languageId").val() == '1'){
        $("#languageId").val('2');
    }else{
        $("#languageId").val('1');
    }
}

/**
 * Función sencilla para esconder la ventana de cambio de idioma
 */
function closeLanguageWindow(){

    //Transformamos mediante css la ventana, escondiéndola fuera de la ventana
    $("#languageSelector").css("transform","translate3d(100%, 0, 0) scale(0.2)");

}

/**
 * Función para eliminar el hash de mensaje enviado de la url,
 * sin necesidad de recargar la web.
 */
function removeHashUrl(){

    //Quitamos el hash de mensaje enviado de la url, sin recargar la web.
    history.pushState({}, null, window.location.toString().substring(0,window.location.toString().indexOf(location.hash)));

}

/**
 * Comprobamos si hay que mostrar u ocultar el botón
 * de scroll up
 */
function checkifbuttonup(){
    if($(document).scrollTop() > $('header').height()){
        $(".scroll-up").removeClass("hiddenbutton");
        $(".scroll-up").addClass("showbutton");
    }else{
        $(".scroll-up").removeClass("showbutton");
        $(".scroll-up").addClass("hiddenbutton");
    }
}

/**
 * Función que irá seteando como activo a los elementos del menú
 * cuando el scroll alcance los sections del cv
 */
function checkScrollSections(){

    //Obtenemos el scroll Y de la web
    let scrollY = window.pageYOffset;

    //iteramos sobre cada section
    $('section').each(function(i, obj) {
        let offsetTop = obj.offsetTop - 70;
        let offsetHeight = obj.offsetHeight;
        let sectionId = obj.getAttribute('id');

        //Comprobamos si tenemos el scroll en este section
        if (scrollY > offsetTop && scrollY <= offsetTop + offsetHeight) {
            //Tenemos el scroll aquí, activamos el nav link
            $("#navFor"+sectionId).addClass("activeOffset");
        } else {
            //No tenemos el scroll aquí, desactivamos el nav link
            $("#navFor"+sectionId).removeClass("activeOffset");
        }
    });
}

/**
 * Función para hacer scroll a la sección indicada
 * @param section - id de la sección
 */
function goToSection(section){

    if(!$("body").hasClass("going-up")) {

        //Movemos al usuario al div indicado
        $('html, body').animate({
            scrollTop: $("#"+section).offset().top - 70
        }, 500);

    }
}

/**
 * Función que comprobará si el menú responsive está abierto,
 * para cerrarlo, o si está cerrado para abrirlo.
 */
function toggleMenuResponsive(){
    //Si no se está abriendo o cerrando el menú, ejecutamos
    if (!$("body").hasClass("openingMenu")){
        //Activamos o desactivamos la clase del menú responsive según corresponda.
        $("body").toggleClass("openedMenu");
        //Añadimos clase para poner a cargar el body, y que no se pueda clicar dos veces seguidas.
        $("body").addClass("openingMenu");

        //Cambiamos el icono del botón, X o barras, según convenga.
        let lastIcon = document.getElementById("iconHamburger").classList.toString();
        $("#iconHamburger").removeClass().addClass($("#iconHamburger").attr("data-altericon")).attr("data-altericon",lastIcon).data("altericon",lastIcon);

        //Si el menú está ahora abierto, mostramos el div, sino lo ocultamos.
        if ($("body").hasClass("openedMenu"))
            $("#submenuResponsive").animate({ opacity: "1" }, 100 ).animate({ height: "211px" }, 300 )
        else
            $("#submenuResponsive").animate({ height: "0px" }, 300 ).animate({ opacity: "0" }, 100 );

        //Esperamos 500ms para quitar el loading interno del body para poder usar el botón otra vez
        setTimeout(function(){
            $("body").removeClass("openingMenu");
        },500)
    }
}

/**
 * Función para obligar al menú responsive a cerrarse.
 */
function CloseMenuResponsive(force = "false"){
    //Instanciamos variable de ejecución del script a true
    var canExecute = true;
    //Si no se está forznado a ejecutar al función
    if(force == "false"){
        //Comprobamos si el menú está cargando, para dejar ejecutar la función, o no
        if ($("body").hasClass("openingMenu")){
            canExecute = false;
        }
    }

    //Si no se está abriendo o cerrando el menú, y se permite ejecutar, ejecutamos.
    if ($("body").hasClass("openedMenu") && canExecute == true){
        //Desactivamos el menú
        $("body").removeClass("openedMenu");

        //Cambiamos el icono del botón, de X a barras.
        let lastIcon = document.getElementById("iconHamburger").classList.toString();
        $("#iconHamburger").removeClass().addClass($("#iconHamburger").attr("data-altericon")).attr("data-altericon",lastIcon).data("altericon",lastIcon);

        //Ocultamos el menú
        $("#submenuResponsive").animate({ height: "0px" }, 300 ).animate({ opacity: "0" }, 100 );
    }
}

function downloadCV (){
    if ($("#languageId").val() == '1'){
        var url = "assets/Daniel_Sancho_Jara_CV_ESP.pdf";
    }else{
        var url = "assets/Daniel_Sancho_Jara_CV_EN.pdf";
    }
    window.open(url, '_blank').focus();
}

/**
 * Evento para el botón de ir arriba
 */
$(".scroll-up").on("click",function(){
    if($(document).scrollTop() > $('header').height() && !$("body").hasClass("going-up")) {
        $("body").addClass("going-up");
        var scope = this;
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        $(scope).removeClass("showbutton");
        $(scope).addClass("hiddenbutton");
        setTimeout(function () {
            $("body").removeClass("going-up");
        },500);
    }
});

/**
 * Evento on click para ir al elementu del menú
 * clicado, haciendo una animación de scroll
 */
$(".offsetScrollNav").on("click",function(){
    //Si este elemento no está activo ya
    if (!$(this).hasClass("activeOffset")){
        //Hacemos scroll a ese elemento
        goToSection($(this).prop("id").replace("navFor",""));
    }
});