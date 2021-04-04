////////////////////// PARAMETRE DE REQUETE URL //////////////////////

const str = window.location;
const url = new URL(str);
const idUrl = url.searchParams.get("orderId");

///////////////////// CONSTANTES //////////////////////

const teddiesAdded_json = localStorage.getItem("product");
const teddiesAdded = JSON.parse(teddiesAdded_json);

///////////////////// CALCUL MONTANT TOTAL COMMANDE //////////////////////

let priceTeddies = [];
    
    for(let i = 0 ; i < teddiesAdded.length ; i++) {
        priceTeddies.push([teddiesAdded[i].price].map(i => i / 100));   
    }
    let arrayPrice = priceTeddies.map(function(x) {
        return parseInt(x, 10);
    })
    const calculator = (accumulator, currentValue) => accumulator + currentValue;
    let calculPrice = arrayPrice.reduce(calculator);
    

////////////////////// FUNCTIONS  //////////////////////

/*----------- Fonction pour gestion page Remerciement ----------*/
function orderPage() {
    const thanks1 = document.getElementById("thanks");
    thanks1.className = "row";
    const firstPartOrder = document.getElementById("premiere_partie");
    firstPartOrder.innerHTML = "Nous vous remercions de votre achat, pour un total de : " ;
    firstPartOrder.className = " col-6 font-weight-bold"
    const priceCart = document.getElementById('prix_achat');
    priceCart.innerHTML =  calculPrice + "€";
    priceCart.className = " col-6 font-weight-bold text-btn-color";


    const thanks2 = document.getElementById("thanks2");
    thanks2.className = "row";
    const orderForId1 = document.getElementById("order_id1");
    orderForId1.className = "col-6 font-weight-bold"
    orderForId1.innerHTML = "Voici une information qui vous sera utile, votre numéro de commande est le : " ;
    const orderForId2 = document.getElementById("order_id2");
    orderForId2.innerHTML = idUrl;
    orderForId2.className = "col-6 text-btn-color font-weight-bold";

    const remerciementFinal = document.getElementById("remerciements");
    remerciementFinal.innerHTML = "Gardez le. Il vous sera utile, lors d'éventuels échanges entre nous, ou pour traquer la livraison ! "
    remerciementFinal.className = "font-weight-bold";
    const remerciementFinal2 = document.getElementById("remerciement2");
    remerciementFinal2.innerHTML = "Toute l'équipe d'OrinoTed vous remercie ! A très vite !"
    remerciementFinal2.className = "font-weight-bold";

    const divButtonThanks = document.getElementById("button_thanks");
    divButtonThanks.className = "m-auto w-100 py-4"
    const linkButtonThanks = document.createElement("a");
    divButtonThanks.appendChild(linkButtonThanks);
    const buttonThanks = document.createElement("button");
    linkButtonThanks.appendChild(buttonThanks);
    linkButtonThanks.className = "text-center"
    linkButtonThanks.setAttribute("href", "./index.html");
    buttonThanks.innerHTML = "retourner à la page d'acceuil";
    buttonThanks.className = "btn btn-btn-color font-weight-bold";
    

}

// function addBackground(){
//     const fondPhotoOurson = document.getElementById('fond-photo-ourson');
//     const picTeddy = document.createElement('img');
//     fondPhotoOurson.appendChild(picTeddy);
//     picTeddy.className = "w-100 m-auto";
//     picTeddy.setAttribute('src', 'http://localhost:3000/images/teddy_5.jpg');
//     picTeddy.style.zIndex = "0";
// }

////////////////////// APPEL DE LA FONCTION //////////////////////
orderPage();