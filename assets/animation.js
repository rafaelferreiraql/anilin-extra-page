var fadeOut = function(target,time,callback) {
    anime({
        targets: (target),
        duration: time,
        opacity: 0,
        complete: callback,
        easing: "easeOutExpo"
    });
}

var fadeIn = function(target,time) {
    anime({
        targets: (target),
        duration: time,
        opacity: 1,
        easing: "linear"
    });
}

var imgpush = function(length,image_length,fontsize,index) {
    //console.log("pushings");

    anime({ // Primeiro movimento: Artwork pra esquerda
        targets: (".songAbout.id"+index),
        duration: length,
        //delay: 1000, //Temporário!
        marginLeft: 0,
        backgroundColor: "white",
        easing: "easeOutExpo"
    });
    anime({ // Títulos de dados
        targets: (".infoTitle.id"+index),
        translateX: image_length,
        delay: function(el, i) {
            return 350+ length + 1000*(i-1)
        },
        duration: length,
        easing: "easeOutExpo",
    });
    anime({ // <hr/>
        targets: (".infoTitle.id"+index+" hr"),
        opacity: 1,
        delay: function(el, i) {
            return 350+ length + 1000*(i-1) + 500;
        },
        duration: length*4
    })
    anime({ // Dados
        targets: (".infoData.id"+index),
        translateY: "1.5em",
        delay: function(el,i) {
            return 350 + length + 1000*(i-1) + 500;
        },
        easing: "easeOutExpo"
    })
}
