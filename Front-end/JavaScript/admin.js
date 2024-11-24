//Productos
"use strict";
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

//mostrar productos aside
function mostrarProductosAside(){
    var containerProdTab = document.getElementById("tabla-show-prod"); //Contenedor de la tabla
    fetch('http://localhost:3000/productos/consultar/todos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        return response.json();})
    .then(response2 =>{
        containerProdTab.innerHTML = "";
        for(let element in response2[0]){
            containerProdTab.innerHTML += `<tr class="element-table containe-element">
                                                <td>${response2[0][element].id}</td>
                                                <td>${response2[0][element].nombre}</td>
                                            </tr>`;
        }
        containerProdTab.innerHTML += `<tr class="element-table containe-element">
                                                <td>Total</td>
                                                <td>${response2[0].length}</td>
                                            </tr>`;
    })
    .catch(error =>{
        console.log(error);
    })
}

document.getElementById("btn-reload-prod").addEventListener('click',()=>{
    mostrarProductosAside();
});


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
aceppt_add_prod.addEventListener('click',async ()=>{
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
                            //let img = new Blob([document.getElementById("img-add-prod").files[0]], { type: document.getElementById("img-add-prod").files[0].type });
                            //const reader = new FileReader();
                            //reader.readAsDataURL(img);
                            //console.log(img);
                            const img64F = async (imagen)=>{
                                return new Promise((resolve, reject)=>{
                                    var reader = new FileReader();
                                    reader.readAsDataURL(imagen);
                                    reader.onloadend = function() {
                                        resolve(reader.result);
                                    }
                                }); 
                            }

                            /*const compressImg = async (imagen)=>{
                                let compress = new compress();
                                new Promise((resolve, reject)=>{
                                    compress.compress([imagen], {
                                        size: 0.1, 
                                        quality: 0.5,
                                        maxWidth: 800,  
                                        maxHeight: 600,  
                                        resize: true,  
                                      }).then((result)=>{
                                        resolve(result[0]);
                                      })
                                }) 
                            }*/
                            
                            var imgDoc = document.getElementById("img-add-prod").files[0];
                            /*if(imgDoc.size/1024 > 100){
                               imgDoc = await compressImg(imgDoc);
                            }*/
                            var img = await img64F(imgDoc)
                            let data = {
                                "nombre": document.getElementById("nombre-add-prod").value,
                                "precio": document.getElementById("precio-add-prod").value,
                                "descripcion": document.getElementById("descrip-add-prod").value,
                                "imagen": img,
                                "categoria": document.getElementById("categ-add-prod").value,
                                "stock": document.getElementById("stock-add-prod").value
                            };
                            aceppt_add_prod.disabled = true;
                            fetch('http://localhost:3000/productos/registrar', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data),
                            })
                            .then(response => {
                                return response.json();})
                            .then(response2 =>{
                                    document.getElementById("nombre-add-prod").value = "";
                                    document.getElementById("precio-add-prod").value = "";
                                    document.getElementById("descrip-add-prod").value = "";
                                    document.getElementById("img-add-prod").value = "";
                                    document.getElementById("categ-add-prod").value = "";
                                    document.getElementById("stock-add-prod").value = "";
                                    document.getElementById("add-prod-msg").innerText = "¡Registro exitoso!"
                                    setTimeout(() => {
                                        document.getElementById("add-prod-msg").innerText = "";
                                    }, 3000);
                                })
                                .catch(error => document.getElementById("add-prod-msg").innerText = "Algo salió mal, intente de nuevo. \n error:" + error);
                                aceppt_add_prod.disabled = false;
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
    else{
        let data = {
            "id": document.getElementById("id-prod-elim-busq").value
        }
        fetch('http://localhost:3000/productos/consultar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            return response.json();})
        .then(response2 =>{
            //response2.imagen.type = 'image/png';
            document.getElementById("nombre-prod-elim").value = response2.nombre;
            document.getElementById("precio-prod-elim").value = response2.precio;
            document.getElementById("descrip-prod-elim").value = response2.descripcion;
            document.getElementById("img-prod-elim").src = response2.imagen;
            document.getElementById("categ-prod-elim").value = response2.categoria;
            document.getElementById("stock-prod-elim").value = response2.stock;
            document.getElementById("acep-del-prod").disabled = false;
        })
        .catch(error =>{
            document.getElementById("delete_prod_msg").innerText = "Algo salió mal, intente de nuevo \n "+ error;
        })
    }
})

//boton cancelar eliminar producto
cancel_btn_del_pro.addEventListener('click',()=>{
    pag_dele_prod.classList.add('no-visible-class');
    document.getElementById("id-prod-elim-busq").classList.remove('input-error');
    document.getElementById("id-prod-elim-busq").value = ""
    document.getElementById("delete_prod_msg").innerText = "";
    document.getElementById("img-prod-elim").src = "";
    document.getElementById("acep-del-prod").disabled = true;
    for(let i=0;i<document.getElementsByClassName("clean-inp").length;i++){
        document.getElementsByClassName("clean-inp")[i].value = ""
    }
    activarNav()
})

//boton aceptar eliminar producto
document.getElementById("acep-del-prod").addEventListener('click',()=>{
    if(document.getElementById("id-prod-elim-busq").value == ""){
        document.getElementById("id-prod-elim-busq").classList.add('input-error');
        document.getElementById("delete_prod_msg").innerText = "Ingrese el id del producto";
    }
    else{
        let data = {
            "id" : document.getElementById("id-prod-elim-busq").value
        }

        fetch('http://localhost:3000/productos/eliminar/id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {return response.json();})
        .then(response2 =>{
            document.getElementById("acep-del-prod").disabled = true;
            document.getElementById("id-prod-elim-busq").classList.remove('input-error');
            document.getElementById("id-prod-elim-busq").value = ""
            document.getElementById("delete_prod_msg").innerText = "";
            document.getElementById("img-prod-elim").src = "";
            for(let i=0;i<document.getElementsByClassName("clean-inp").length;i++){
                document.getElementsByClassName("clean-inp")[i].value = ""
            }
            document.getElementById("delete_prod_msg").innerText = response2.mensaje;
            setTimeout(() => {
                document.getElementById("delete_prod_msg").innerText = "";
            }, 3000);
        })
        .catch(error =>{
            document.getElementById("delete_prod_msg").innerText = "Algo salió mal, intente de nuevo \n "+ error;
        })
    }
})

//pagina producto
document.getElementById("prod-a-edit").addEventListener('click',()=>{
    document.getElementById("pag__editar-producto").classList.remove('no-visible-class');
    desactivarNav();
})

//boton cancelar pagina editar producto
document.getElementById("btn-cancel-edit-prod").addEventListener('click',()=>{
    document.getElementById("id-prod-edit-busq").disabled = false; 
    document.getElementById("pag__editar-producto").classList.add('no-visible-class');
    document.getElementById("msg_error_edit_prod").innerText = "";
    document.getElementById("edit-prod-show-img").src = "";
    document.getElementById("nombre-prod-edit").setAttribute("readonly", "true");
    document.getElementById("precio-prod-edit").setAttribute("readonly", "true");
    document.getElementById("descrip-prod-edit").setAttribute("readonly", "true");
    document.getElementById("img-prod-edit").disabled = true;
    document.getElementById("categ-prod-edit").setAttribute("readonly", "true");
    document.getElementById("stock-prod-edit").setAttribute("readonly", "true");
    document.getElementById("btn-acep-edit-prod").disabled = true;
    for(let i=0;i<document.getElementsByClassName("clean-inp-edit").length;i++){
        document.getElementsByClassName("clean-inp-edit")[i].value = "";
        document.getElementsByClassName("clean-inp-edit")[i].classList.remove('input-error');
    }
    activarNav();
})

//boton buscar producto pag editar producto
document.getElementById("btn_edit_prod").addEventListener('click',()=>{
    document.getElementById("id-prod-edit-busq").classList.remove('input-error');
    document.getElementById("msg_error_edit_prod").innerText = ""; 
    if(document.getElementById("id-prod-edit-busq").value == ""){
        document.getElementById("id-prod-edit-busq").classList.add('input-error');
        document.getElementById("msg_error_edit_prod").innerText = "Ingrese el id del producto";
    }
    else{
        let data = { 
            "id": document.getElementById("id-prod-edit-busq").value
        }
        fetch('http://localhost:3000/productos/consultar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            return response.json();})
        .then(response2 =>{
            document.getElementById("id-prod-edit-busq").disabled = true;
            document.getElementById("nombre-prod-edit").value = response2.nombre;
            document.getElementById("precio-prod-edit").value = response2.precio;
            document.getElementById("descrip-prod-edit").value = response2.descripcion;
            //document.getElementById("img-prod-edit");
            document.getElementById("edit-prod-show-img").src = response2.imagen;
            document.getElementById("categ-prod-edit").value = response2.categoria;
            document.getElementById("stock-prod-edit").value = response2.stock;

            document.getElementById("nombre-prod-edit").removeAttribute("readonly");
            document.getElementById("precio-prod-edit").removeAttribute("readonly");
            document.getElementById("descrip-prod-edit").removeAttribute("readonly");
            document.getElementById("img-prod-edit").disabled = false;
            document.getElementById("categ-prod-edit").removeAttribute("readonly");
            document.getElementById("stock-prod-edit").removeAttribute("readonly");
            document.getElementById("btn-acep-edit-prod").disabled = false;
        })
        .catch(error =>{
            document.getElementById("msg_error_edit_prod").innerText = "Algo salió mal, intente de nuevo \n "+ error;
        })
    }
})

//boton aceptar en pag editar producto
document.getElementById("btn-acep-edit-prod").addEventListener('click',async ()=>{  
    document.getElementById("msg_error_edit_prod").innerText = "";
    document.getElementById("nombre-prod-edit").classList.remove('input-error');
    document.getElementById("precio-prod-edit").classList.remove('input-error');
    document.getElementById("descrip-prod-edit").classList.remove('input-error');
    document.getElementById("stock-prod-edit").classList.remove('input-error');
    document.getElementById("categ-prod-edit").classList.remove('input-error');
    if(document.getElementById("nombre-prod-edit").value == ""){
        document.getElementById("nombre-prod-edit").classList.add('input-error');
        document.getElementById("msg_error_edit_prod").innerText = "Ingrese un nombre del producto"
    }
    else{
        if(document.getElementById("precio-prod-edit").value == ""){
            document.getElementById("precio-prod-edit").classList.add('input-error');
            document.getElementById("msg_error_edit_prod").innerText = "Ingrese un precio del producto"
        }
        else{
            if(document.getElementById("descrip-prod-edit").value == ""){
                document.getElementById("descrip-prod-edit").classList.add('input-error');
                document.getElementById("msg_error_edit_prod").innerText = "Ingrese una descripcion del producto"
            }
            else{
                if(document.getElementById("categ-prod-edit").value == ""){
                    document.getElementById("categ-prod-edit").classList.add('input-error');
                    document.getElementById("msg_error_edit_prod").innerText = "Ingrese una categoria del producto";
                }
                else{
                    if(document.getElementById("stock-prod-edit").value == ""){
                        document.getElementById("stock-prod-edit").classList.add('input-error');
                        document.getElementById("msg_error_edit_prod").innerText = "Ingrese un stock del producto";
                    }
                    else{
                        if(document.getElementById("img-prod-edit").value == "" && document.getElementById("edit-prod-show-img").src == ""){
                            document.getElementById("img-prod-edit").classList.add('input-error');
                            document.getElementById("msg_error_edit_prod").innerText = "Ingrese una imagen del producto";
                        }
                        else{
                            let imagen;
                            if(document.getElementById("img-prod-edit").value == ""){
                                imagen = document.getElementById("edit-prod-show-img").src;
                            }else{
                                const img64F = async (imagen)=>{
                                    return new Promise((resolve, reject)=>{
                                        var reader = new FileReader();
                                        reader.readAsDataURL(imagen);
                                        reader.onloadend = function() {
                                            resolve(reader.result);
                                        }
                                    }); 
                                }
                                let arg = document.getElementById("img-prod-edit").files[0];
                                imagen = await img64F(arg);
                            }

                            let data = {
                                "id": document.getElementById("id-prod-edit-busq").value,
                                "nombre": document.getElementById("nombre-prod-edit").value,
                                "precio": document.getElementById("precio-prod-edit").value,
                                "descripcion": document.getElementById("descrip-prod-edit").value,
                                "imagen": imagen,
                                "categoria": document.getElementById("categ-prod-edit").value,
                                "stock": document.getElementById("stock-prod-edit").value
                            }
                            
                            fetch('http://localhost:3000/productos/editar', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data),
                            })
                            .then(response => {
                                return response.json(); 
                              })
                              .then(data => {
                                document.getElementById("id-prod-edit-busq").disabled = false; 
                                document.getElementById("msg_error_edit_prod").innerText = data.mensaje;
                                document.getElementById("edit-prod-show-img").src = "";
                                document.getElementById("nombre-prod-edit").setAttribute("readonly", "true");
                                document.getElementById("precio-prod-edit").setAttribute("readonly", "true");
                                document.getElementById("descrip-prod-edit").setAttribute("readonly", "true");
                                document.getElementById("img-prod-edit").disabled = true;
                                document.getElementById("categ-prod-edit").setAttribute("readonly", "true");
                                document.getElementById("stock-prod-edit").setAttribute("readonly", "true");
                                document.getElementById("btn-acep-edit-prod").disabled = true;
                                for(let i=0;i<document.getElementsByClassName("clean-inp-edit").length;i++){
                                    document.getElementsByClassName("clean-inp-edit")[i].value = "";
                                    document.getElementsByClassName("clean-inp-edit")[i].classList.remove('input-error');
                                }
                                setTimeout(() => {
                                    document.getElementById("msg_error_edit_prod").innerText = "";
                                  }, 3000);
                                console.log(data);  
                              })
                              .catch(error => {
                                console.error('Error en la solicitud:', error);
                              });
                        }
                    }

                }
            }
        }
    }
})


//pagina consultar producto
document.getElementById("prod-a-cons").addEventListener('click',()=>{
    document.getElementById("pag__consultar-producto").classList.remove('no-visible-class');
    desactivarNav();
})

//cancelar consultar producto
document.getElementById("accept-cons-prod").addEventListener('click',()=>{
    document.getElementById("pag__consultar-producto").classList.add('no-visible-class');
    document.getElementById("id-prod-cons-busq").classList.remove('input-error');
    document.getElementById("msg_error_cons_prod").innerText = "";
    for(let i=0;i<document.getElementsByClassName("clean-inp-cons").length;i++){
        document.getElementsByClassName("clean-inp-cons")[i].value = "";
    }
    activarNav();
})

//boton buscar producto en consultar producto
document.getElementById("btn-buscar-cons-prod").addEventListener('click',()=>{
    document.getElementById("msg_error_cons_prod").innerText = "";
    document.getElementById("id-prod-cons-busq").classList.remove('input-error');
    if(document.getElementById("id-prod-cons-busq").value == ""){
        document.getElementById("id-prod-cons-busq").classList.add('input-error');
        document.getElementById("msg_error_cons_prod").innerText = "Ingrese el id del producto";
    }
    else{
        //buscar producto en backend
    }
})
