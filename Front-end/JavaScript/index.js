//header buttons
var btn_login = document.getElementById("login-btn");

//variables de interes
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //expresion reg validar correo
const anchoPantalla = window.innerWidth; //ancho de pantalla

//login pag
var pagina_iniciar_se = document.getElementById("container-loggin-f"); // ventana iniciar sesion
var btn_inciar_s = document.getElementById("btn_login_page"); //botton inicia sesion 
var inp_mail = document.getElementById("input_login_mail"); //input correo 
var inp_pass = document.getElementById("input_login_pass"); //input password
var msg_inp = document.getElementById("msg-text-inp"); //cuadro de mensaje
var barra_menu_s = document.getElementById("open-menu"); //barra del nav smarphone
var botones = document.getElementsByClassName("btn-ds"); //botones de la barra de bav
var btn_cancel_loggin = document.getElementById("btn-cancel"); //boton cancelar pagina iniciar sesion
var btn_home = document.getElementsByClassName("home_btn"); //boton de home

//boton home
btn_home[0].addEventListener('click',()=>{
    for(let i = 0; i < botones.length; i++){
        botones[i].classList.remove('desactivado');
    }
    pagina_iniciar_se.classList.add('no-visible');
})
btn_home[1].addEventListener('click',()=>{
    for(let i = 0; i < botones.length; i++){
        botones[i].classList.remove('desactivado');
    }
    pagina_iniciar_se.classList.add('no-visible');
})


//mostrar ventana de login
btn_login.addEventListener('click',()=>{
    for(let i = 0; i < botones.length; i++){
        botones[i].classList.add('desactivado');
    }
    
    msg_inp.innerText= "";
    inp_mail.classList.remove("error-input");
    inp_pass.classList.remove("error-input");
    inp_mail.value = "";
    inp_pass.value = "";
    if(pagina_iniciar_se.classList.contains('no-visible')){
        pagina_iniciar_se.classList.remove('no-visible');
    }
    else{
        pagina_iniciar_se.classList.add('no-visible');
    }
    if(anchoPantalla<1000){
        barra_menu_s.checked = !barra_menu_s.checked
    }
    else{

    }
})

//cancelar inicio de sesion
btn_cancel_loggin.addEventListener('click',()=>{
    for(let i = 0; i < botones.length; i++){
        botones[i].classList.remove('desactivado');
    }
    pagina_iniciar_se.classList.add('no-visible');
})

//validar datos de inicio de sesion
btn_inciar_s.addEventListener('click',function(){
    msg_inp.innerText= "";
    inp_mail.classList.remove("error-input");
    inp_pass.classList.remove("error-input");

    if(inp_mail.value){
        let validarMail = regexEmail.test(inp_mail.value);
        if(validarMail == true){
            if(inp_pass.value){
                    ///////////////////////////////
                    //Ingrese aqui funcion para validar datos en backend
            }
            else{
                inp_pass.classList.add("error-input");
                msg_inp.innerText= "Ingrese su contraseña";
            }
        }
        else{
            inp_mail.classList.add("error-input");
            msg_inp.innerText= "Correo electrónico no válido";
        }
    }
    else{
        inp_mail.classList.add("error-input");
        msg_inp.innerText= "Ingrese su correo electrónico";
    }
})