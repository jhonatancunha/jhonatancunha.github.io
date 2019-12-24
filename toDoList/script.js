let TAREFAS, id;
let arraySalvo = localStorage.getItem("itens");

if(arraySalvo){
    TAREFAS = JSON.parse(arraySalvo);
    sortElementsArray();// ORGANIZANDO ID's NO ARRAY TAREFAS
    id = TAREFAS.length;
    carregarItens(TAREFAS);
}else{
    TAREFAS = [];
    id = 0;
}


function carregarItens(itens){
    itens.forEach(function(element) {
        addMessage(element.name, element.id);
        if(element.done == true)    done(element.id);
    });
}

function addAction(){
    const mensagem = window.document.getElementById("msg").value;
    if(mensagem != ""){
        TAREFAS.push({
            name : mensagem,
            done: false,
            id : id
            });
        addMessage(mensagem, id);
        id++;
    }
    sortElementsArray();// ORGANIZANDO ID's NO ARRAY TAREFAS
    sortElementsHTML();// ORDENA ID's NO DOM HTML
    
}

function addMessage(mensagem, ids){
    const divInsertion = window.document.getElementById("middle");
    const item =  `<div class="task" id="${ids}">
    <p class="title" style="float: left;">${mensagem}</p>
    <input type="button" id= "${ids}" class="remove" onclick="remove(${ids})"/>
    <input type="button" id="${ids}" class="done" onclick="done(${ids})"/>
    </div>
    `

    divInsertion.insertAdjacentHTML("beforeend", item);
    document.getElementById("msg").value = '';//LIMPA CAMPO DE TEXT DEPOIS DE ADD

    atualizaLocalStorage();
}

function done(indice){
    TAREFAS[indice].done = true;
    var text = document.getElementsByClassName("title")[indice];
    text.style.color = "green";
    text.style.fontWeight = "800";
    text.style.textDecoration = "line-through";
    window.document.getElementById(indice).style.backgroundColor = "rgb(190, 255, 190)";
    window.document.getElementsByClassName("done")[indice].style.transition = "all 0.5s linear";
    window.document.getElementsByClassName("done")[indice].style.opacity = "0%";
    window.document.getElementsByClassName("done")[indice].style.pointerEvents = "none";

    atualizaLocalStorage();
}

function remove(indice){
    window.document.getElementsByClassName("task")[indice].remove();
    TAREFAS.splice(indice, 1);//REMOVENDO OBJETO DO ARRAY
    
    sortElementsArray();// ORGANIZANDO ID's NO ARRAY TAREFAS
    sortElementsHTML();// ORDENA ID's NO DOM HTML

    atualizaLocalStorage();
}

// ORGANIZANDO ID's NO ARRAY TAREFAS
function sortElementsArray(){
    var cont = 0;
    for(var i = 0; i < TAREFAS.length; i++){
        if(TAREFAS[i] != undefined){
            TAREFAS[i].id = cont;
            id = cont;
            cont++;
        }
    }
}

// ORDENA ID's NO DOM HTML
function sortElementsHTML(){
    var cont = 0;
    var teste = window.document.getElementById("middle");
    for(var i = 0; i < teste.childElementCount; i++){
        window.document.getElementsByClassName("task")[i].setAttribute("id",cont);

        window.document.getElementsByClassName("remove")[i].setAttribute("id",cont);
        window.document.getElementsByClassName("remove")[i].setAttribute("onclick","remove("+cont+")");

        window.document.getElementsByClassName("done")[i].setAttribute("id",cont);
        window.document.getElementsByClassName("done")[i].setAttribute("onclick","done("+cont+")");
        cont++;
    }

}

//ATUALIZAR DADOS DO LOCALSTORAGE
function atualizaLocalStorage(){
     //SALVANDO LOCALSTORAGE
     var arrayList = JSON.stringify(TAREFAS)
     window.localStorage.setItem("itens", arrayList);
}