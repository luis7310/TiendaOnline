//Productos
var prod_add = document.getElementById("prod-a-agreg"); //boton nav agregar producto
var pag_add_prod = document.getElementById("pag__agregar-producto"); //ventana agregar producto
var cancel_add_prod = document.getElementById("cancelar_add-product"); //boton cancelar agregar producto
var botones_nav = document.getElementsByClassName("header__list-element"); //botones nav
var aceppt_add_prod = document.getElementById("accept_add-product"); //aceptar agregar producto
var pag_dele_prod = document.getElementById("pag__eliminar-producto"); //pagina de eliminar producto
var btn_delet_prod = document.getElementById("prod-a-delete"); //boton barra nav eliminar prod
var btn_buscar_elim_pro = document.getElementById("buscar_prod_elim"); //boton buscar pagina eliminar
var cancel_btn_del_pro = document.getElementById("cancel-del-prod"); //boton cancelar pag eliminar producto 

//funciones generales
//desactivar barra nav
function desactivarNav(){
    for(let i = 0; i < botones_nav.length; i++){
        botones_nav[i].classList.add('desactivado');
    }
}

//activar barra nav
function activarNav(){
    for(let i = 0; i < botones_nav.length; i++){
        botones_nav[i].classList.remove('desactivado');
    }
}

//ventana productos
//boton mostrar ventana agregar producto
prod_add.addEventListener('click',()=>{
    pag_add_prod.classList.remove('no-visible-class');
    desactivarNav();
})

//boton cancelar agregar producto
cancel_add_prod.addEventListener('click',()=>{
    pag_add_prod.classList.add('no-visible-class');
    document.getElementById("add-prod-msg").innerText = "";
    document.getElementById("nombre-add-prod").classList.remove('input-error');
    document.getElementById("nombre-add-prod").value = "";
    document.getElementById("precio-add-prod").classList.remove('input-error');
    document.getElementById("precio-add-prod").value = "";
    document.getElementById("descrip-add-prod").classList.remove('input-error');
    document.getElementById("descrip-add-prod").value = "";
    document.getElementById("img-add-prod").classList.remove('input-error');
    document.getElementById("img-add-prod").value = "";
    document.getElementById("categ-add-prod").classList.remove('input-error');
    document.getElementById("categ-add-prod").value = "";
    document.getElementById("stock-add-prod").classList.remove('input-error');
    document.getElementById("stock-add-prod").value = "";
    activarNav();
})

//boton aceptar, ventana agregar producto
aceppt_add_prod.addEventListener('click',()=>{
    document.getElementById("add-prod-msg").innerText = "";
    document.getElementById("nombre-add-prod").classList.remove('input-error');
    document.getElementById("precio-add-prod").classList.remove('input-error');
    document.getElementById("descrip-add-prod").classList.remove('input-error');
    document.getElementById("img-add-prod").classList.remove('input-error');
    document.getElementById("categ-add-prod").classList.remove('input-error');
    document.getElementById("stock-add-prod").classList.remove('input-error');
    if(document.getElementById("nombre-add-prod").value == ""){
        document.getElementById("nombre-add-prod").classList.add('input-error');
        document.getElementById("add-prod-msg").innerText = "Ingrese un nombre de producto";
    }
    else{
        if(document.getElementById("precio-add-prod").value == "" || document.getElementById("precio-add-prod").value < 0){
            document.getElementById("precio-add-prod").classList.add('input-error');
            document.getElementById("add-prod-msg").innerText = "Ingrese un precio de producto";
        }
        else{
            if(document.getElementById("descrip-add-prod").value == ""){
                document.getElementById("descrip-add-prod").classList.add('input-error');
                document.getElementById("add-prod-msg").innerText = "Ingrese una descripcion del producto";
            }
            else{
                if(document.getElementById("img-add-prod").value == ""){
                    document.getElementById("img-add-prod").classList.add('input-error');
                    document.getElementById("add-prod-msg").innerText = "Ingrese una imagen del producto";
                }
                else{
                    if(document.getElementById("categ-add-prod").value == ""){
                        document.getElementById("categ-add-prod").classList.add('input-error');
                        document.getElementById("add-prod-msg").innerText = "Ingrese una categoria del producto";
                    }
                    else{
                        if(document.getElementById("stock-add-prod").value == ""){
                            document.getElementById("stock-add-prod").classList.add('input-error');
                            document.getElementById("add-prod-msg").innerText = "Ingrese el stock del producto";
                        }
                        else{
                            //mandar datos al backend
                        }
                    }
                }
            }
        }
    }
})

//mostrar ventana borrar producto
btn_delet_prod.addEventListener('click',()=>{
    pag_dele_prod.classList.remove('no-visible-class');
    desactivarNav();
})

//boton buscar producto, eliminar producto
btn_buscar_elim_pro.addEventListener('click',()=>{
    document.getElementById("id-prod-elim-busq").classList.remove('input-error');
    document.getElementById("delete_prod_msg").innerText = "";
    if(document.getElementById("id-prod-elim-busq").value == ""){
        document.getElementById("id-prod-elim-busq").classList.add('input-error');
        document.getElementById("delete_prod_msg").innerText = "Ingrese el id del producto";
    }
})

cancel_btn_del_pro.addEventListener('click',()=>{
    pag_dele_prod.classList.add('no-visible-class');
    document.getElementById("id-prod-elim-busq").classList.remove('input-error');
    document.getElementById("id-prod-elim-busq").value = ""
    document.getElementById("delete_prod_msg").innerText = "";
    for(let i=0;i<document.getElementsByClassName("clean-inp").length;i++){
        document.getElementsByClassName("clean-inp")[i].value = ""
    }
    activarNav()
})