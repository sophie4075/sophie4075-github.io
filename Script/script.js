(function init() {
    "use strict";
    const name = document.getElementById("firstname");
    const lastName = document.getElementById("nachname")
    const email = document.getElementById("mail");
    const comment = document.getElementById("message");
    const form = document.getElementById("contact");
    const myBools = {
        validatedName: false,
        validatedLastName: false,
        validatedMail: false,
        validatedComment: false
    };

    /*Event Listener zum Submit der Form hinzufügen*/
    form.addEventListener("submit",(e) => {
        /*Hindert die Form daran, direkt submitted zu werden, sie soll zuerst validiert werden*/
        e.preventDefault();
        validateInputs();

        if (Object.values(myBools).every(item => item === true)) {

            //Reset der Booleans, um neue Validierung eines neuen Kommentars zu ermöglichen
            for (let key in myBools) {
                myBools[key] = false;
            }


            const paragraph = document.createElement("p");
            const node = document.createTextNode("Thanks! Your message was submitted");
            paragraph.appendChild(node);

            form.appendChild(paragraph);
            form.classList.add("success");
            resetInputStyles();
            setTimeout(resetConfirm, 8000);

            form.reset();
        }


    });

    //Funktion bekommt ein HTML Element und Error Message übergeben
    const setError = (element, message) => {
        //Get Parent von dem gegebenen Element (input-control)
        const inputControl = element.parentElement;
        //Referenz für wo der Error gezeigt werden soll
        const errorDisplay = inputControl.querySelector(".error");

        if (!errorDisplay.hasChildNodes()) {
            const paragraph = document.createElement("p");
            const error = document.createTextNode(message);
            paragraph.appendChild(error);
            errorDisplay.appendChild(paragraph);
            //Error Klasse der input-control Klasse hinzufügen
            inputControl.classList.add("error");
            //Entferne Success Klasse von der input-control Klasse (sofern vorhanden)
            inputControl.classList.remove("success");
        }
    }


    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector(".error");

        if (errorDisplay.hasChildNodes()) {
            errorDisplay.removeChild(errorDisplay.firstChild);
        }

        inputControl.classList.add("success");
        inputControl.classList.remove("error");
    };

    const clearAll = () =>{

        const errors = document.querySelectorAll(".error");

        for(i = 0; i < errors.length; i++){


            if(errors[i].hasChildNodes() && errors[i].firstChild.nodeName === 'P') {

                errors[i].removeChild(errors[i].firstChild);
                errors[i].parentElement.classList.remove("error");

            }


        }

        resetInputStyles();
    }


    const setDefaultStyle = element => {
        const inputControl = element.parentElement;
        //Entfernt die Klassen, sodass das normale Styling angewendet wird
        inputControl.classList.remove("success");
        inputControl.classList.remove("error");
    };

    const resetInputStyles = () => {
        setDefaultStyle(name);
        setDefaultStyle(lastName);
        setDefaultStyle(email);
        setDefaultStyle(comment);
    };

    const resetConfirm = () => {
        const toRemove = document.getElementById("contact");
        form.classList.remove("success");
        toRemove.removeChild(toRemove.lastChild);
    };

    //RegEx zur Überprüfung, ob es sich um E-Mail-Adresse handelt
    const isValidEmail = email => {
        const regexValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regexValidation.test(String(email).toLowerCase());
    }

    //Überprüft, ob der Name ausschließlich aus Buchstaben besteht und aus mindestens 2 Zeichen besteht
    const isValidName = name => {
        let regexValidationOfName = /^[a-zA-Z]{2,20}$/;
        return regexValidationOfName.test(String(name).toLowerCase());
    }


    const validateInputs = () => {
        /*Alle Werte der Eingaben sichern, trim entfernt white space von den Strings*/
        const nameVal = name.value.trim();
        const lastNameVal = lastName.value.trim();
        const emailVal = email.value.trim();
        const commentSectionVal = comment.value.trim();


        if (!isValidName(nameVal)) {
            setError(name, "Name must contain at least 2 / maximum 20 characters. Numbers and/or special characters are not permitted.");
            //Für den unwahrscheinlichen Fall, dass jemand seine vorher Korrekte eingabe fehlerhaft korrigiert
            myBools.validatedName = false;
        } else {
            setSuccess(name);
            myBools.validatedName = true;
        }

        if (!isValidName(lastNameVal)) {
            setError(lastName, "Name must contain at least 2 / maximum 20 characters. Numbers and/or special characters are not permitted.");
            myBools.validatedLastName = false;
        } else {
            setSuccess(lastName);
            myBools.validatedLastName = true;
        }

        if (emailVal === "") {
            setError(email, "Please enter your e-mail address");
            myBools.validatedMail = false;
        } else if (!isValidEmail(emailVal)) {
            setError(email, "Invalid e-mail format. Check whether an '@' is present. Umlauts, spaces, special characters such as '()<>,:;|%& and control characters are not allowed.");
            myBools.validatedMail = false;
        } else {
            setSuccess(email);
            myBools.validatedMail = true;
        }


        if (commentSectionVal === "") {
            setError(comment, "The textarea must not be empty and must contain at least 3 characters");
            myBools.validatedComment = false;
        } else {
            setSuccess(comment);
            myBools.validatedComment = true;
        }

    }


    /*--------------- MOBILE NAV-------------------*/
    /*Navigation (ul)*/
    const primaryNav = document.querySelector("#navigation");
    /*Menü Button*/
    const navToggle = document.querySelector(".mobile-nav-toggle");

    navToggle.addEventListener('click', () => {
        const visibility = primaryNav.getAttribute('data-visible');

        if (visibility === 'false') {
            primaryNav.setAttribute('data-visible', 'true');
            navToggle.setAttribute('aria-expanded', 'true');
        } else if (visibility === 'true') {
            primaryNav.setAttribute("data-visible", 'false');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    primaryNav.addEventListener('click', () =>{
        const visibility = primaryNav.getAttribute('data-visible');
        if(visibility ==='true'){
            primaryNav.setAttribute("data-visible", 'false');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    })

    /*---------------OnScroll-----------------------*/


    function reveal(){
        const reveals = document.querySelectorAll('.reveal');
        for(let i = 0; i < reveals.length; i++){
            let windowHeight = window.innerHeight;
            let revealTop = reveals[i].getBoundingClientRect().top;
            let revealPoint = 150;

            if(revealTop < windowHeight - revealPoint){
                reveals[i].classList.add('active');
            }else {
                reveals[i].classList.remove('active');
            }
        }
    }

    window.addEventListener('scroll', reveal);


        /*--------------------Typewriter----------------------*/

    let i = 0;
    let j = 0
    const txt = 'Hello, World!';
    const intro = 'I am Sophie, Media Computer Science Student.'

    const typeWriter = () =>{
        if(i < txt.length) {
            document.getElementById("greeting").innerHTML += txt.charAt(i) ;
            i++;
            setTimeout(typeWriter, 100);
        }
        if(i === txt.length && j < intro.length){
            document.getElementById("intro").innerHTML += intro.charAt(j) ;
            j++;
            setTimeout(typeWriter, 50);
        }
    }

    window.addEventListener("load", typeWriter);

    document.getElementById("reset_button").addEventListener("click", clearAll);

})();
