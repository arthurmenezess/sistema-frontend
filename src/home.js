window.onload = function (e) {

    var usuarioGuid = localStorage.getItem("usuarioGuid");

    if (usuarioGuid == null) {
        //window.location.href = "login.html";
    }
    else {
        obterUsuario(usuarioGuid);
    }

    var logout = document.getElementById("lnkSair");

    logout.onclick = function (e) {

        localStorage.removeItem("usuarioGuid");
        window.location.href = "login.html";

    }

    var icon = document.querySelector(".icon");

    icon.onclick = function (e) {

        var menu = document.querySelector(".topnav");

        if (menu.className == "topnav") {
            menu.className += " open";
        }
        else {
            menu.className = "topnav";
        }
    }

    function obterUsuario(usuarioGuid) { // chamando api

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText); // retorno da api 

                if (result.sucesso) {

                    var spnMensagem = document.getElementById("spnMensagem");
                    spnMensagem.innerText = "Bem vindo ao sistema, " + result.nome + "!";  
                }
                else {
                    window.location.href = "login.html";
                }
            }
        });

        xhr.open("GET", "https://localhost:44330/api/usuario/obterUsuario?usuarioGuid=" + usuarioGuid);

        xhr.send();
    }
     

}