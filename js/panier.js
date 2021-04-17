//////////////////// CONSTANTES ////////////////////

const detailCart = document.getElementById("prixTotal");
const detailBuy = document.getElementById("detailCommande");
const myForm = document.getElementById("monForm");
const thanksPage = document.getElementById("page_remerciements");
const teddiesAdded_json = localStorage.getItem("product");
const teddiesAdded = JSON.parse(teddiesAdded_json);

const textIsValid = document.getElementsByClassName("valueIsValid");
const email = document.getElementsByClassName("valueValidateEmail");
const zipCode = document.getElementsByClassName("valueValidateZipCode");

const inputsForm = document.getElementsByClassName("input");

//////////////////// FUNCTIONS ////////////////////

/*----- fonction pour panier vide -----*/
const cartEmpty = function() {
    if(localStorage.length === 0) {
        detailCart.style.display = "none";
        detailBuy.style.display = "none";
        const divEmpty = document.createElement("div");
        myForm.appendChild(divEmpty);
        divEmpty.innerHTML = "Votre Panier est vide !";
        divEmpty.className = "text-center font-weight-bold mb-3 text-danger w-100";
        alert("votre panier est vide");
    }
}
/*------ fonction pour alimenter le tableau de commande -----*/

const myCommand = function() {
    
    for(let i in teddiesAdded) {
        const myDetail = document.createElement("div");
        detailBuy.appendChild(myDetail);
        const myDetailName = document.createElement("div");
        myDetail.appendChild(myDetailName);
        myDetail.className = "my-2 p-2 card bg-secondary shadow-sm"
        myDetailName.className = "row";
        const myDetailColor = document.createElement("div");
        myDetail.appendChild(myDetailColor);
        myDetailColor.className = "row";
        const myDetailPrice = document.createElement("div");
        myDetail.appendChild(myDetailPrice);
        myDetailPrice.className= "row";
        const myDetailDisable = document.createElement("div");
        myDetail.appendChild(myDetailDisable);
        myDetailDisable.className = "row";
        const figPictureCart = document.createElement("figure");
        myDetail.appendChild(figPictureCart);
        const imgPictureCart = document.createElement("img");
        figPictureCart.appendChild(imgPictureCart);
        imgPictureCart.setAttribute("src", teddiesAdded[i].picture);
        imgPictureCart.className  = "d-block mx-auto my-2 w-50 rounded-circle card-img-top";
        
        // Partie Nom 

        const divNameCart = document.createElement("div");
        myDetailName.appendChild(divNameCart);
        divNameCart.innerHTML =  "Nom de votre ours :" ;
        divNameCart.className = "font-weight-bold col-8 writtingMediaQueriesMobile";
        const spanNameCart = document.createElement("span");
        myDetailName.appendChild(spanNameCart);
        spanNameCart.innerHTML = teddiesAdded[i].firstName;
        spanNameCart.className = "font-weight-bold text-uppercase col-4 text-right text-btn-color orderWrittingStyle";
        
        // Partie Choix Couleur
        const divColor = document.createElement("div");
        myDetailColor.appendChild(divColor);
        divColor.innerHTML = "Couleur de votre ours : ";
        divColor.className = "font-weight-bold col-8 writtingMediaQueriesMobile";
        const spanColor = document.createElement("span");
        myDetailColor.appendChild(spanColor);
        spanColor.innerHTML = teddiesAdded[i].color;
        spanColor.className = "font-weight-bold text-uppercase col-4 text-right text-btn-color orderWrittingStyle";

        //Partie Prix 
        const divPrice = document.createElement("div");
        myDetailPrice.appendChild(divPrice);
        divPrice.innerHTML = "Prix de votre ours : ";
        divPrice.className = "font-weight-bold col-8 writtingMediaQueriesMobile";
        const spanPrice = document.createElement("span");
        myDetailPrice.appendChild(spanPrice);
        spanPrice.innerHTML = [teddiesAdded[i].price].map(i => i / 100) + ' ' + '€';
        spanPrice.className = "font-weight-bold text-uppercase col-4 text-right text-btn-color orderWrittingStyle";


    }
    // Partie Total Commande
    const divTotal = document.createElement("div");
    detailCart.appendChild(divTotal);
    divTotal.className = "row m-auto font-weight-bold"
    const totalPrice = document.createElement("div");
    divTotal.appendChild(totalPrice);
    totalPrice.innerHTML = "Total de votre Commande :";
    totalPrice.className = "mb-2 "
    const totalPriceCalcul = document.createElement("div");
    divTotal.appendChild(totalPriceCalcul);
    totalPriceCalcul.className = "text-btn-color mx-2"

    let priceTeddies = [];
    if(teddiesAdded !== null) {
        for(let i = 0 ; i < teddiesAdded.length ; i++) {
        //for(let i in teddiesAdded) {
            priceTeddies.push([teddiesAdded[i].price].map(i => i / 100));
        }
        let arrayPrice = priceTeddies.map(function(x) {
            return parseInt(x, 10);
        })
        const calculator = (accumulator, currentValue) => accumulator + currentValue;
        let calculPrice = arrayPrice.reduce(calculator);
        totalPriceCalcul.innerHTML = calculPrice + ""  + "€";
        
        

    }   

    const divButton = document.createElement("div");
    const buttonEmptyCart = document.createElement("button");
    detailCart.appendChild(divButton);
    divButton.appendChild(buttonEmptyCart);
    buttonEmptyCart.setAttribute("type", "submit");
    buttonEmptyCart.innerHTML = "Supprimer mon panier";
    buttonEmptyCart.className = "d-block btn btn-btn-color mb-2 mx-auto font-weight-bold"

    buttonEmptyCart.addEventListener("click", function(e) {
        localStorage.clear();
        cartEmpty();
    })
    
        
}

/*----------- Fonction pour ajout Formulaire ----------*/
function addForm() {
    const divInformForm = document.createElement("div");
    myForm.appendChild(divInformForm);
    divInformForm.className = "m-auto text-center font-weight-bold"
    const paragraphInform = document.createElement("p");
    divInformForm.appendChild(paragraphInform);
    paragraphInform.innerHTML = "Pour pouvoir valider votre commande, merci de remplir tous les champs.";
    const formOrder = document.createElement("form");
    formOrder.className = "container mb-5";
    myForm.appendChild(formOrder);
    
    // AJOUT DU FORM PRENOM
    const divFormFirstName = document.createElement("div");
    myForm.appendChild(divFormFirstName);
    divFormFirstName.className = "form-group d-block container text-center";
    const labelFirstName = document.createElement("label");
    divFormFirstName.appendChild(labelFirstName);
    labelFirstName.setAttribute("for", "prénom");
    labelFirstName.innerHTML = "Prénom :*";
    labelFirstName.className = "form-label";
    const inputFirstName = document.createElement("input");
    divFormFirstName.appendChild(inputFirstName);
    inputFirstName.setAttribute("type", "text");
    inputFirstName.setAttribute("id", "firstname");
    inputFirstName.className = "form-control m-auto w-50 valueIsValid input";

    inputFirstName.addEventListener("change", function(e) {
        console.log(inputFirstName.value);
        let value = e.target.value;
        const divInputError = document.createElement("div");
        divFormFirstName.appendChild(divInputError);
        divInputError.id ="div_input_error";
        const divError = document.getElementById("div_input_error");
        divError.innerHTML = '';

        if(isValid(value) === false) {
            return (divError.innerHTML ="Veuillez remplir votre Prénom correctement !")//&&(btnConfirmOrder.style.visibility = "hidden") ;
        } else if(isValid(value) === true) {
            return ((divFormFirstName.removeChild(divError)&&(divInputError.id = "")))//&&(btnConfirmOrder.style.visibility = "visible"));
        }

    })
    
    // AJOUT DU FORM NOM
    const divFormName = document.createElement("div");
    myForm.appendChild(divFormName);
    divFormName.className = "form-group text-center";
    const labelName = document.createElement("label");
    divFormName.appendChild(labelName);
    labelName.setAttribute("for", "name");
    labelName.innerHTML = "Nom :*";
    labelName.className = "form-label";
    const inputName = document.createElement("input");
    divFormName.appendChild(inputName);
    inputName.setAttribute("type", "text");
    inputName.setAttribute("id", "lastname");
    inputName.className = "form-control m-auto w-50 valueIsValid input";

    inputName.addEventListener("change", function(e) {
        console.log(inputName.value);
        let value = e.target.value;
        const divInputError2 = document.createElement("div");
        divFormName.appendChild(divInputError2);
        divInputError2.id ="div_input_error2";
        const divError2 = document.getElementById('div_input_error2');
        divError2.innerHTML = "";

        if(isValid(value) === false) {
            return (divError2.innerHTML ="Veuillez remplir votre Nom correctement !")//&&(btnConfirmOrder.style.visibility = "hidden");
        } else if(isValid(value) === true) {
            return ((divFormName.removeChild(divError2))&&((divInputError2.id = "")))//&&(btnConfirmOrder.style.visibility = "visible"));
        }

    })
    
    // AJOUT DU FORM ZIP CODE

    const divFormAddress = document.createElement("div");
    myForm.appendChild(divFormAddress);
    divFormAddress.className = "form-group text-center";
    const labelAdress = document.createElement("label");
    divFormAddress.appendChild(labelAdress);
    labelAdress.setAttribute("for", "adresse");
    labelAdress.innerHTML = "Code Postal :*";
    labelAdress.className = "form-label";
    const inputAddress = document.createElement("input");
    divFormAddress.appendChild(inputAddress);
    inputAddress.setAttribute("type", "text");
    inputAddress.setAttribute("id", "adress");
    inputAddress.className = "form-control m-auto w-50 valueValidateZipCode input";

    inputAddress.addEventListener("change", function(e) {
        console.log(inputAddress.value);
        let value = e.target.value;
        const divInputError3 = document.createElement('div');
        divFormAddress.appendChild(divInputError3);
        divInputError3.id ="div_input_error3";
        const divError3 = document.getElementById("div_input_error3");
        divError3.innerHTML = "";

        if(validateZipCode(value) === false) {
            return (divError3.innerHTML ="Veuillez remplir votre Code postal correctement !")//&&(btnConfirmOrder.style.visibility = "hidden");
        } else if(validateZipCode(value) === true) {
            return (divFormAddress.removeChild(divError3)&&((divInputError3.id = "")))// &&(btnConfirmOrder.style.visibility = "visible"));
        }

    })
    
    // AJOUT DU FORM VILLE

    const divFormCity = document.createElement("div");
    myForm.appendChild(divFormCity);
    divFormCity.className = "form-group text-center";
    const labelCity = document.createElement("label");
    divFormCity.appendChild(labelCity);
    labelCity.setAttribute("for", "ville");
    labelCity.innerHTML = "Ville :*";
    labelCity.className = "form-label";
    const inputCity = document.createElement("input");
    divFormCity.appendChild(inputCity);
    inputCity.setAttribute("type", "text");
    inputCity.setAttribute("id", "city");
    inputCity.className = "form-control m-auto w-50 valueIsValid input";

    inputCity.addEventListener("change", function(e) {
        console.log(inputCity.value);
        let value = e.target.value;
        const divInputError4 = document.createElement("div");
        divFormCity.appendChild(divInputError4);
        divInputError4.id ="div_input_error4";
        const divError4 = document.getElementById("div_input_error4");
        divError4.innerHTML = "";

        if(isValid(value) === false) {
            return (divError4.innerHTML ="Veuillez remplir votre Ville correctement !")//&&(btnConfirmOrder.style.visibility = "hidden");
        } else if(isValid(value) === true) {
            return (divFormCity.removeChild(divError4)&&((divInputError4.id = "")))//&&(btnConfirmOrder.style.visibility = "visible"));
        }

    })


    // AJOUT DU FORM EMAIL

    const divFormEmail = document.createElement("div");
    myForm.appendChild(divFormEmail);
    divFormEmail.className = "form-group text-center";
    const labelEmail = document.createElement("label");
    divFormEmail.appendChild(labelEmail);
    labelEmail.setAttribute("for", "email");
    labelEmail.innerHTML = "Email :*";
    labelEmail.className = "form-label";
    const inputEmail = document.createElement("input");
    divFormEmail.appendChild(inputEmail);
    inputEmail.setAttribute("type", "email");
    inputEmail.className = "form-control m-auto w-50 validateEmail input";

    inputEmail.addEventListener("change", function(e) {
        console.log(inputEmail.value);
        let value = e.target.value;
        const divInputError5 = document.createElement("div");
        divFormEmail.appendChild(divInputError5);
        divInputError5.id ="div_input_error5";
        const divError5 = document.getElementById("div_input_error5");
        divError5.innerHTML = "";

        if(validateEmail(value) === false) {
            return (divError5.innerHTML ="Veuillez remplir votre Email correctement !")//&&(btnConfirmOrder.style.visibility = "hidden") ;
        } else if(validateEmail(value) === true) {
            return (divFormEmail.removeChild(divError5)&&(divInputError5.id = ""))//&&(btnConfirmOrder.style.visibility = "visible")); 
        }

    })

    // Creation de la partie Button
    
    const divConfirm = document.createElement("div");
    myForm.appendChild(divConfirm);
    divConfirm.className = " container text-center p-2";

    const btnConfirmOrder = document.createElement("button");
    divConfirm.appendChild(btnConfirmOrder);
    btnConfirmOrder.className = "btn btn-btn-color w-25 h-25 font-weight-bold m-auto";
    btnConfirmOrder.innerHTML = "Valider";
    const divErreurBtn = document.createElement("div");
    divConfirm.appendChild(divErreurBtn);
    divErreurBtn.className = "w-100 h-100 bg-secondary py-2 mt-2";
    divErreurBtn.innerHTML = "";

    
        btnConfirmOrder.addEventListener("click", function(e){
        if(inputFirstName.value === "" || inputName.value === "" || inputAddress.value === "" || inputCity.value === "" || inputEmail.value ==="" ) {
            return (divErreurBtn.innerHTML = "Veuillez remplir toutes les informations obligatoires.")&&(divErreurBtn.className = "text-danger font-weight-bold pt-3")&&(inputsForm.className = "border border-danger");
        }else if(teddiesAdded === null) {
            return (divErreurBtn.innerHTML = "Veuillez faire vos achats.");
        }else if(isValid(inputFirstName.value)=== false || isValid(inputName.value) === false || validateZipCode(inputAddress.value) === false || isValid(inputCity.value)=== false || validateEmail(inputEmail.value)=== false ){
           return(btnConfirmOrder.className = "btn btn-danger w-25 font-weight-bold")&&(divErreurBtn.innerHTML = "Veuillez remplir vos informations correctement.")&&(divErreurBtn.className = "text-danger font-weight-bold pt-3");
        }else{ 

            let contact = {
                firstName: inputFirstName.value,
                lastName: inputName.value,
                address: inputAddress.value,
                city: inputCity.value,
                email: inputEmail.value,
            };
            
            let products = [];
            
            for(let i = 0 ; i < teddiesAdded.length ; i++) {
            
                products.push(teddiesAdded[i].theId);
               
            }

            let toSend = {contact, products};
        
            
            sendPost("http://localhost:3000/api/teddies/order", toSend).then(function(response) {
                
                window.location.href="./thanks.html?orderId=" + response.orderId;
                
            
            }).catch(function(error) {
                console.log(error);
            })
            

        }
    })
};

/*----------- Regex pour verification input ----------*/
function isValid(value) {
    return /^[a-zA-Z]{3,}$/.test(value);
}
function validateEmail(value) {
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(value).toLowerCase());
}

function validateZipCode(value ){
    return /^(?:[0-8]\d|9[0-8])\d{3}$/.test(value);
}


//////////////////// PROMISE REQUETE POST ////////////////////
function sendPost(url, toSend){
    return new Promise((resolve, reject) => {
        let recovHttp= new XMLHttpRequest();
        recovHttp.open("POST", url);
        recovHttp.setRequestHeader("content-type", "application/json");
        recovHttp.send(JSON.stringify(toSend));
        recovHttp.onreadystatechange = function() {
            if(this.readyState === XMLHttpRequest.DONE) {
                if(this.status >= 200 && this.status <= 300) {  
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject("encore une erreur");
                }
            }
         
        }
    });
}

cartEmpty();
myCommand();
addForm();
