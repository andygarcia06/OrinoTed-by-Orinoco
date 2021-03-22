//////////////////// CONSTANTES ////////////////////

const infoCart = document.getElementById('infoPanier');
const detailCart = document.getElementById('detailCommande');
const detailBuy = document.createElement('div');
detailCart.appendChild(detailBuy);
const thanksPage = document.getElementById('page_remerciements');

const teddiesAdded_json = localStorage.getItem('product');
const teddiesAdded = JSON.parse(teddiesAdded_json);

//////////////////// FUNCTIONS ////////////////////

/*----- fonction pour panier vide -----*/
const cartEmpty = function() {
    if(localStorage.length === 0) {
        detailCart.style.display = 'none';
        const divEmpty = document.createElement('div');
        infoCart.appendChild(divEmpty);
        divEmpty.id = 'alertCartEmpty';
        divEmpty.innerHTML = 'Votre Panier est vide';
        //const footerCartEmpty = document.getElementById('footer');
    }
}
/*------ fonction pour alimenter le tableau de commande -----*/

const myCommand = function() {
    
    for(let i in teddiesAdded) {
        const myDetail = document.createElement('div');
        detailBuy.appendChild(myDetail);
        myDetail.className = 'detailOursonAchat'
        const myDetailName = document.createElement('div');
        myDetail.appendChild(myDetailName);
        myDetailName.id = 'myDetailName';
        const figPictureCart = document.createElement('figure');
        myDetailName.appendChild(figPictureCart);
        figPictureCart.id= 'fig_pic_cart';
        const imgPictureCart = document.createElement('img');
        figPictureCart.appendChild(imgPictureCart);
        imgPictureCart.setAttribute('src', teddiesAdded[i].picture);
    
        const divNameCart = document.createElement('div');
        myDetailName.appendChild(divNameCart);
        divNameCart.id= 'div_name_cart';
        divNameCart.innerHTML = teddiesAdded[i].firstName;
        // Partie Choix Couleur
        const divColor = document.createElement('div');
        myDetail.appendChild(divColor);
        divColor.id = 'myDetailColor';
        divColor.innerHTML = teddiesAdded[i].color;
        //Partie Prix 
        const myDetailPrice = document.createElement('div');
        myDetail.appendChild(myDetailPrice);
        myDetailPrice.id = 'myDetailPrice';
        myDetailPrice.innerHTML = [teddiesAdded[i].price].map(i => i / 100) + ' ' + '€';
    
    }
    // Partie Total Commande
    const divTotal = document.createElement('div');
    detailCart.appendChild(divTotal);
    divTotal.id = 'divTotal';
    const totalPrice = document.createElement('div');
    divTotal.appendChild(totalPrice);
    totalPrice.id = 'totalPrice';
    totalPrice.innerHTML = 'Total de votre Commande : ';
    const totalPriceCalcul = document.createElement('div');
    divTotal.appendChild(totalPriceCalcul);
    totalPriceCalcul.id = 'totalPriceCalcul';

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
        totalPriceCalcul.innerHTML = calculPrice + ' ' + '€';
        
        

    }   
 
    const buttonEmptyCart = document.createElement('button');
    const divButton = document.createElement('div');
    detailCart.appendChild(divButton);
    divButton.id = 'divDelete';
    divButton.appendChild(buttonEmptyCart);
    buttonEmptyCart.id = 'deleteButton';
    buttonEmptyCart.setAttribute('type', 'submit');
    buttonEmptyCart.innerHTML = "Supprimer mon panier";

    buttonEmptyCart.addEventListener('click', function(e) {
        localStorage.clear();
        cartEmpty();
    })
        
}

/*----------- Fonction pour ajout Formulaire ----------*/
function Form() {

    // AJOUT DU FORM NOM
    const divFormName = document.querySelector("div_form_name");
    const labelName = document.querySelector("label_form_name");
    const inputName = document.querySelector("input_form_name");
        
        inputName.addEventListener('change', function(e) {
            console.log(inputName.value);
            let value = e.target.value;
            const divInputError = document.createElement('div');
            divFormName.appendChild(divInputError);
            divInputError.id ='div_input_error2';
            const divError2 = document.getElementById('div_input_error2');
            divError2.innerHTML = '';
    
            if(isValid(value) === false) {
                return (divError2.innerHTML ='Veuillez remplir votre Nom correctement !') && (inputConfirmOrder.setAttribute('disabled', 'true'));
            } else if(isValid(value) === true) {
                return (divFormName.removeChild(divError2)) && (inputConfirmOrder.removeAttribute('disabled'));
            }
        })

    //  FORM PRENOM
    const divFormFirstName = document.querySelector("div_form_fname");
    const labelFirstName = document.querySelector("label_form_fname");
    const inputFirstName = document.querySelector("input_form_fname");
    inputFirstName.addEventListener('change', function(e) {
        console.log(inputFirstName.value);
        let value = e.target.value;
        const divInputError = document.createElement('div');
        divFormFirstName.appendChild(divInputError);
        divInputError.id ='div_input_error';
        const divError = document.getElementById('div_input_error');
        divError.innerHTML = '';

        if(isValid(value) === false) {
            return (divError.innerHTML ='Veuillez remplir votre Prénom correctement !') && (inputConfirmOrder.setAttribute('disabled', 'true'));
        } else if(isValid(value) === true) {
            return (divFormFirstName.removeChild(divError)) && (inputConfirmOrder.removeAttribute('disabled'));
        }

    })

    // AJOUT DU FORM ADRESSE
    const divFormAddress = document.querySelector("div_form_adress");
    const labelAdress = document.querySelector("label_form_adress");
    const textAreaAddress = document.querySelector("input_form_adress");

    
    textAreaAddress.addEventListener('change', function(e) {
        console.log(textAreaAddress.value);
        let value = e.target.value;
        const divInputError = document.createElement('div');
        divFormAddress.appendChild(divInputError);
        divInputError.id ='div_input_errorAddress';
        const divErrorAddress = document.getElementById('div_input_errorAddress');
        divErrorAddress.innerHTML = '';
        if(value === undefined || value === null || value === '') {
            return (divErrorAddress.innerHTML = 'Veuillez remplir votre Adresse correctement !') && (inputConfirmOrder.setAttribute('disabled', 'true'));
        }
    })
   
    // AJOUT DU FORM EMAIL
    const divFormEmail = document.cquerySelector("div_form_mail");
    const labelEmail = document.querySelector("label_form_mail");
    const inputEmail = document.querySelector("input_form_mail");

    inputEmail.addEventListener('change', function(e) {
        console.log(inputEmail.value);
        let value = e.target.value;
        const divInputError = document.createElement('div');
        divFormEmail.appendChild(divInputError);
        divInputError.id ='div_input_error4';
        const divError4 = document.getElementById('div_input_error4');
        divError4.innerHTML = '';

        if(emailIsValid(value) === false) {
            return (divError4.innerHTML ='Veuillez remplir votre Email correctement !') && (inputConfirmOrder.setAttribute('disabled', 'true'));
        } else if(emailIsValid(value) === true) {
            return (divFormEmail.removeChild(divError4)) && (inputConfirmOrder.removeAttribute('disabled'));
        }
    })

     // AJOUT DU FORM VILLE
     const divFormFirstName = document.querySelector("div_form_city");
     const labelFirstName = document.querySelector("label_form_city");
     const inputCity = document.querySelector("input_form_city");
     inputCity.addEventListener('change', function(e) {
         console.log(inputCity.value);
         let value = e.target.value;
         const divInputError = document.createElement('div');
         divFormCity.appendChild(divInputError);
         divInputError.id ='div_input_error3';
         const divError3 = document.getElementById('div_input_error3');
         divError3.innerHTML = '';
 
         if(isValid(value) === false) {
             return (divError3.innerHTML ='Veuillez remplir votre Ville correctement !') && (inputConfirmOrder.setAttribute('disabled', 'true'));
         } else if(isValid(value) === true) {
             return (divFormCity.removeChild(divError3)) && (inputConfirmOrder.removeAttribute('disabled'));
         }
     })
    
    const divConfirm = document.querySelector("divConfirm");
    const inputConfirmOrder = document.querySelector("buttonConfirmOrder");


    inputConfirmOrder.addEventListener('click', function(e) {
        e.preventDefault();
        
        const divErrorButton = document.createElement('div');
        divConfirm.appendChild(divErrorButton);
        divErrorButton.id='div_Error_Button';
        const errorButton = document.getElementById('div_Error_Button');
        errorButton.innerHTML ='';

        if(inputFirstName.value === '' || inputName.value === '' || textAreaAddress.value === '' || inputCity.value === '' || inputEmail.value ==='') {
            return (errorButton.innerHTML = 'Veuillez remplir vos informations.');
        }else if(teddiesAdded === null) {
            return (errorButton.innerHTML = 'Veuillez faire vos achats.') && (inputConfirmOrder.setAttribute('disabled', 'true'));
        }else {
            divConfirm.removeChild(errorButton);

            let contact = {
                firstName: inputFirstName.value,
                lastName: inputName.value,
                address: textAreaAddress.value,
                city: inputCity.value,
                email: inputEmail.value,
            };
            let products = [];
            for(let p = 0 ; p < teddiesAdded.length ; p++) {
            
                products.push(teddiesAdded[p].theId);
               
            }
            let toSend = {contact, products};
        
            
            sendPost('http://localhost:3000/api/teddies/order', toSend).then(function(response) {
                
                window.location.href='./thankyou.html?orderId=' + response.orderId;
                
            
            }).catch(function(error) {
                console.log(error);
            })
            

        }
    });
}
/*----------- Regex pour verification input ----------*/
function isValid(value) {
    return /^[a-zA-Z]{3,}$/.test(value);
}
function emailIsValid(value) {
    return /^[a-zA-Z0-9.:#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/.test(value);
}


//////////////////// PROMISE REQUETE POST ////////////////////
function sendPost(url, toSend){
    return new Promise((resolve, reject) => {
        let recovHttp= new XMLHttpRequest();
        recovHttp.open('POST', url);
        recovHttp.setRequestHeader('content-type', 'application/json');
        recovHttp.send(JSON.stringify(toSend));
        recovHttp.onreadystatechange = function() {
            if(this.readyState === XMLHttpRequest.DONE) {
                if(this.status >= 200 && this.status <= 300) {  
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject('encore une erreur');
                }
            }
         
        }
    });
}

cartEmpty();
myCommand();
Form();