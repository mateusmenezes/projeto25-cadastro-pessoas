const tbody = document.querySelector("#pessoas");
const form = document.querySelector("#form");
const formEditPeople = document.querySelector("#formEditPeople");
let edit = 0;


let people = JSON.parse(localStorage.getItem("people"));
people = localStorage.getItem("people") != null ? people : [];


// Inicializando a tabela no dom parte 2
const addFormToDOM = (form, index) => { // recebendo cada interação do forEach e pegando cada elemento para ser colocado dentro da tabela
    
    const row = document.createElement("tr"); // Criando a tr e dentro da linha, suas td
    row.insertCell(0).innerHTML = index + 1;
    row.insertCell(1).innerHTML = form.name;
    row.insertCell(2).innerHTML = form.email;
    row.insertCell(3).innerHTML = form.cellphone;
    row.insertCell(4).innerHTML = form.occupation;
    row.insertCell(5).innerHTML = `<button onclick = "editPeople(${form.id})">editar</button> 
                                    <button onclick = "removePeople(${form.id})">remover</button>`;
    tbody.append(row);
}

//  Inicializando a tabela no dom parte 1
const init = () => {
    tbody.innerHTML = "";
    people.forEach((form, index) => {
        addFormToDOM(form, index);
    })
}
init();

const updateStorage = () => {
    localStorage.setItem("people", JSON.stringify(people));
    init();
}

const clearInputs = () => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cellphone").value = "";
    document.getElementById("occupation").value = "";
}
const generateId = () => Math.round(Math.random() * 1000);

const addPeopleArray = (name, cellphone, email, occupation) => {
    const peopleForm = {
        id: generateId(),
        name: name,
        cellphone: cellphone,
        email: email,
        occupation: occupation
    }
    people.push(peopleForm);
}

const removePeople = id => {
    console.log(id)
    let removeElement = 0;

    people.forEach((form, index) => {
        if(form.id == id) removeElement = index;
    })

    people.splice(removeElement, 1); // O método splice recebe dois parametros: primeiro é o índice por onde começar remover e o segundo a quantidade de elementos que se quer remover e o retorno do splice é a lista de elementos removidos.
    updateStorage();
}


const handleSubmit = event => {
    event.preventDefault(); // capturando o evento sem parar a ocorrencia para fazer uma tratativa com os dados antes da submissão
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const cellphone = document.getElementById("cellphone").value;
    const occupation = document.getElementById("occupation").value;
    const verifyFormEmpty = name === "" || email === "" || cellphone === "" || occupation === "";

    if (verifyFormEmpty) {
        alert("Verifique se os campos estão preenchidos corretamente");
        return false;
    }

    addPeopleArray(name, cellphone, email, occupation);
    updateStorage();
    clearInputs();
}

form.addEventListener("submit", handleSubmit);

const findIdEdit = id => {
    for(i = 0; i < people.length; i++)
        if(people[i].id == id) return i;
}

const editPeople = id => {
    document.getElementById("formEditPeople").style.display = "block";
    edit = findIdEdit(id);
    document.getElementById("nameEdit").value = people[edit].name;
    document.getElementById("emailEdit").value = people[edit].email;
    document.getElementById("cellphoneEdit").value = people[edit].cellphone;
    document.getElementById("occupationEdit").value = people[edit].occupation;
}

formEditPeople.addEventListener("submit", event => {
    const name = document.getElementById("nameEdit").value;
    const email = document.getElementById("emailEdit").value;
    const cellphone = document.getElementById("cellphoneEdit").value;
    const occupation = document.getElementById("occupationEdit").value;
    
    people[edit].name = name;
    people[edit].email = email;
    people[edit].cellphone = cellphone;
    people[edit].occupation = occupation;
    updateStorage();
    document.getElementById("formEditPeople").style.display = "none";
})

