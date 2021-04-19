//  Constantes //

const catalogue = document.getElementById("catalogue");
const section = document.getElementById("section");
const url = "http://localhost:3000/api/teddies";


/*----- Fonctions -----*/

// Fonction insertion image ours en peluche//

function insertImageUrl(section, image){ 
    const newFigure = document.createElement("figure");
    section.appendChild(newFigure);
    const newImg = document.createElement("img");
    newFigure.appendChild(newImg);
    newImg.setAttribute("src", image);
    newImg.setAttribute("alt", "image camera");
    newImg.className = "d-block m-auto w-100 rounded";
    console.log(newImg.src);
 }

 // Fonction insertion Nom ours en peluche//

function insertName(div, name){
    const newH3 = document.createElement("h3");
    div.appendChild(newH3);
    newH3.innerHTML = name;
    newH3.className = "text-btn-color card-title font-weight-bold";
    // console.log(newH3.innerHTML);
}

// Fonction insertion ID ours en peluche//

function insertId(div, id){
    const newDiv2 = document.createElement("div");
    div.appendChild(newDiv2);
    const newP1 = document.createElement("p");
    newDiv2.appendChild(newP1);
    const newSpan = document.createElement("span");
    newP1.appendChild(newSpan);
    newSpan.innerHTML = "Numéro d'Id : ";
    newSpan.className = "text-primary";
    const newP2 = document.createElement("p");
    newDiv2.appendChild(newP2);
    newP2.innerHTML = id;
    newP2.className = "text-primary font-weight-bold";
    // console.log(newP2.innerHTML);
}

// Fonction insertion Couleur ours en peluche//

function insertColor(div){
    const newP3 = document.createElement("p");
    div.appendChild(newP3);
    const newSpan2 = document.createElement("span");
    newSpan2.className = "text-primary";
    newP3.appendChild(newSpan2);
    newSpan2.innerHTML = "Couleur : Personnalisable";
}

// Fonction insertion Description ours en peluche//

function insertDescription(div, description){
    const newP4 = document.createElement("p");
    div.appendChild(newP4);
    newP4.innerHTML = description;
    newP4.className = "text-primary";
}

// Fonction insertion Prix ours en peluche//

function insertPrice(div3, price){
    const newDiv4 = document.createElement("div");
    div3.appendChild(newDiv4);
    const newP5 = document.createElement("p");
    newDiv4.appendChild(newP5);
    newP5.innerHTML = "Prix du nounours : " + price;
    newP5.className = "font-weight-bold text-btn-color";
    // console.log(newP5.innerHTML);
}

// Fonction insertion Lien ours en peluche//

function insertLienPerso(div3, idLien){
    const newDiv5 = document.createElement("div");
    div3.appendChild(newDiv5);
    // console.log("ajout div du btn");
    const newP6 = document.createElement("p");
    // console.log("ajout du p btn");
    newDiv5.appendChild(newP6);
    const newButton = document.createElement("button");
    // console.log("ajout du btn");
    newP6.appendChild(newButton);
    const newA = document.createElement("a");
    newButton.appendChild(newA);
    newButton.className = "btn btn-btn-color d-block"
    newA.setAttribute("href", "./produit.html?id=" + idLien);
    newA.innerHTML = "Modifiez votre Ourson !";
    // console.log("ajout de modifier votre ourson");
    
}

// Fonction problème serveur ours en peluche//

function serverOut() {
    const myH1 = document.getElementById("my_title");
    myH1.style.display = "none";
    const myH2 = document.getElementById("my_second_title");
    myH2.style.display="none";
    const divServerOut = document.createElement("div");
    catalogue.appendChild(divServerOut);
    divServerOut.innerHTML = "Nous rencontrons actuellement un léger problème, nous revenons très vite !!!";
    divServerOut.className = "m-auto font-weight-bold text-center";
    // console.log("Problème serveur");
}

function promiseGet() {
    return new Promise((resolve, reject) => {
        let recupHttp = new XMLHttpRequest();
        recupHttp.open('GET', 'http://localhost:3000/api/teddies');
        recupHttp.responseType = "";
        recupHttp.send();
        recupHttp.onload = function() {
            if(this.readyState === XMLHttpRequest.DONE) {
                if(this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                    console.log(JSON.parse(this.responseText));

                }else{
                    reject(recupHttp);
                    console.log(recupHttp);
                }
            }
        }
    })
}

/////////////////// APPEL DE LA FONCTION ////////////////
promiseGet()
    .then(function(response) {

        for(let i = 0; i < response.length; i++) {
            const newSection = document.createElement("section");
            catalogue.appendChild(newSection);
            insertImageUrl(newSection, response[i].imageUrl);
            const newDiv1 = document.createElement("div");
            newSection.appendChild(newDiv1);
            newSection.className = "mb-5 p-3 w-100 rounded bg-secondary card";
            insertName(newDiv1, response[i].name);
            insertId(newDiv1, response[i]._id);
            insertColor(newDiv1);
            insertDescription(newDiv1, response[i].description);
            const newDiv3 = document.createElement("div");
            newSection.appendChild(newDiv3);
            newDiv3.className = 'tarifs';
            insertPrice(newDiv3, [response[i].price].map(i => i / 100)+ " "  + "€");
            insertLienPerso(newDiv3, response[i]._id);
            
        }
    })
    .catch(function(error) {
        serverOut();
    })
