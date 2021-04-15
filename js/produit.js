////////////////////// PARAMETRE DE REQUETE URL //////////////////////

const str = window.location;
const url = new URL(str);
const idUrl = url.searchParams.get("id");
const urlGet = "http://localhost:3000/api/teddies/";



////////////////////// FONCTIONS //////////////////////

function promiseGet() {
    return new Promise((resolve, reject) => {
        let recoverHttp = new XMLHttpRequest();
        recoverHttp.open("GET", urlGet+ idUrl);
        recoverHttp.send();
        recoverHttp.onreadystatechange = function() {
            if(this.readyState === XMLHttpRequest.DONE) {
                if(this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                }else {
                    reject(XMLHttpRequest);
                }
            }
        }
    })
    

}


// Fonction insertion image ours en peluche//

function insertPicture(section, teddy) {
    const newFigure = document.createElement("figure");
    section.appendChild(newFigure);
    const newPic = document.createElement("img");
    newFigure.appendChild(newPic);
    newPic.setAttribute("src", teddy.imageUrl);
    newPic.setAttribute("alt", "image camera");
    newPic.className = "d-block m-auto w-100 rounded";
    // console.log(newPic.src);
}


// Fonction insertion Nom ours en peluche//

function insertName(description, teddy) {
    const nameTeddy = document.createElement("h3");
    description.appendChild(nameTeddy);
    nameTeddy.innerHTML = teddy.name;
    nameTeddy.className = "text-btn-color font-weight-bold";
    // console.log(nameTeddy.innerHTML);
}


// Fonction insertion ID ours en peluche//

function insertId(description, teddy) {
    const divId = document.createElement("div");
    description.appendChild(divId);
    const paragraphNumId = document.createElement("p");
    divId.appendChild(paragraphNumId);
    paragraphNumId.className = "text-primary font-weight-bold";
    const newSpan = document.createElement("span");
    paragraphNumId.appendChild(newSpan);
    newSpan.innerHTML = "Numéro d'Id : ";
    const paragraphId = document.createElement("p");
    divId.appendChild(paragraphId);
    paragraphId.innerHTML = teddy._id;
    paragraphId.className = "text-primary";
    // console.log(paragraphId.innerHTML);
}


// Fonction insertion Couleur ours en peluche//

function insertColor(description, teddyColors) {
    const divColor = document.createElement("div");
    description.appendChild(divColor);
    const labelColor = document.createElement("label");
    divColor.appendChild(labelColor);
    labelColor.className = "form-floating";
    labelColor.innerHTML = "Sélectionner votre Couleur préférée : ";
    labelColor.className = "text-primary font-weight-bold floatingSelect";
    const selectColor = document.createElement("select");
    selectColor.className = "btn btn-primary font-weight-bold p-1 m-2";
    labelColor.appendChild(selectColor);
    
    for(let i = 0; i < teddyColors.length; i +=1){
        const secondOption = document.createElement("option");
        selectColor.appendChild(secondOption);
        secondOption.setAttribute("value", teddyColors[i]);
        secondOption.setAttribute("required", "");
        secondOption.innerHTML = teddyColors[i];
        // console.log(secondOption.value);
    }
}

// Fonction insertion description ours en peluche//

function insertDescription(description, teddy) {
    const paragraphDescription = document.createElement("p");
    description.appendChild(paragraphDescription);
    paragraphDescription.innerHTML = teddy.description;
    paragraphDescription.className = "text-primary font-weight-bold";
    // console.log(paragraphDescription.innerHTML);
}


// Fonction insertion Boutton "ajout panier" ours en peluche//

function insertButtonCart(section, teddy) {
    const divRate = document.createElement("div");
    section.appendChild(divRate);
    divRate.className = "divTarifs";
    const divPrice = document.createElement("div");
    divRate.appendChild(divPrice);
    divPrice.className = "prixTeddy";
    const paragraphPrice = document.createElement("p");
    divPrice.appendChild(paragraphPrice);
    paragraphPrice.innerHTML = "Prix du Nounours : " + [teddy.price].map(price => price / 100) + ' ' + '€';
    paragraphPrice.className = "font-weight-bold text-btn-color"
    const buttonValid = document.createElement("button");
    divRate.appendChild(buttonValid);
    buttonValid.className = "btn btn-btn-color d-block mx-auto mt-5 font-weight-bold";
    buttonValid.setAttribute("type", "submit");
    buttonValid.innerHTML = "Ajouter au Panier";
    buttonValid.id = "buttonValid"
    // const linkButtonValid = document.createElement("a");
    // buttonValid.appendChild(linkButtonValid);
    // buttonValid.setAttribute("href","")
}


////////////////////// Appel de la fonction //////////////////////

promiseGet()
    .then(function(response) {
        const pageProduct = document.getElementById("page_product");
        const mainSection = document.createElement("section");
        pageProduct.appendChild(mainSection);
        insertPicture(mainSection, response);
        const teddyDescription = document.createElement("div");
        mainSection.appendChild(teddyDescription);
        mainSection.className = "border bg-secondary p-5 rounded w-100 d-block"
        insertName(teddyDescription, response);
        insertId(teddyDescription, response);
        insertColor(teddyDescription,response.colors);
        const chooseColor = document.querySelector("select");
        chooseColor.addEventListener("change", function(e) { //évènement pour voir la couleur choisie
            console.log(chooseColor.value);
        })
        insertDescription(teddyDescription, response);
        insertButtonCart(mainSection, response);

        
        /////////// Evènement ///////////
        const addCart = document.getElementById("buttonValid");
        addCart.addEventListener("click", function(e) { //evenement 'click' pour l'envoi au local storage
            let teddiesChoosen = {
                picture: response.imageUrl,
                firstName: response.name,
                theId: response._id,
                color: chooseColor.value,
                price: response.price,
            }
            const teddiesAdded = localStorage.getItem("product");
            if(teddiesAdded) {
                teddiesInCArt = JSON.parse(teddiesAdded);
                teddiesInCArt.push(teddiesChoosen);
                localStorage.setItem("product", JSON.stringify(teddiesInCArt));
                alert("Ajouté au panier !");
            } else {
                teddiesInCArt = [];
                teddiesInCArt.push(teddiesChoosen);
                localStorage.setItem("product", JSON.stringify(teddiesInCArt));
                alert("Ajouté au panier !");
            }
        })
    })
    .catch(function(error) {
        console.log(error);
    })