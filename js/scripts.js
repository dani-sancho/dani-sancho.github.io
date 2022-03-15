window.onload = function() {
    init();
};

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

    //Seteamos Id del nuevo lengauje
    if ($("#languageId").val() == '1'){
        $("#languageId").val('2');
    }else{
        $("#languageId").val('1');
    }
}