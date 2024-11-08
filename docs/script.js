let btn = document.getElementById("sendMailBtn");

btn.addEventListener("click", function(event) {
    event.preventDefault();
    
    // Mostra il messaggio e disabilita il pulsante
    alert("Hai confermato la tua prenotazione!");
    btn.disabled = true;

    sendMail();
});

function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // Aggiunge lo zero iniziale se necessario
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return day + '/' + month + '/' + year;
}

function sendMail(){
    // Recupera i valori dai campi del modulo
    let utente = document.getElementById("utente").value;
    let telefono = document.getElementById("telefono").value;
    let materia = document.getElementById("materia").value;
    let livello = document.getElementById("livello").value;
    let ora = document.getElementById("ora").value;
    let modalita = document.getElementById("modalita").value;
    let data = document.getElementById("data").value;

    // Validazione dei campi
    if (!utente || !telefono || !materia || !livello || !data || !ora || !modalita) {
        alert("Si prega di compilare tutti i campi del modulo.");
        btn.disabled = false; // Riabilita il pulsante se c'è un errore di validazione
        return;
    }

    // Validazione specifica per il campo telefono (10 cifre)
    if (telefono.length !== 10 || isNaN(telefono)) {
        alert("Inserisci un numero di telefono valido di 10 cifre.");
        btn.disabled = false; // Riabilita il pulsante se c'è un errore di validazione
        return;
    }

    // Validazione specifica per il campo utente (solo lettere)
    if (!/^[a-zA-Z\s]*$/.test(utente)) {
        alert("Il campo utente accetta solo lettere e spazi.");
        btn.disabled = false; // Riabilita il pulsante se c'è un errore di validazione
        return;
    }

    // Divisione della data in parti e creazione di un oggetto Data
    let dataParts = data.split('-');
    let dataValue = new Date(dataParts[0], dataParts[1] - 1, dataParts[2]);

    let dataFormatted = formatDate(dataValue);

    // Invia l'email solo se tutti i campi sono validi
    let params = {
        utente: utente,
        telefono: telefono,
        materia: materia,
        livello: livello,
        data: dataFormatted,
        ora: ora,
        modalita: modalita
    };

    emailjs.send("service_r2wctlq", "template_1zmgr3s", params)
    .then(function(response) {
        alert("L'email è stata inviata con successo!");
    }, function(error) {
        alert("Si è verificato un errore durante l'invio dell'email: " + JSON.stringify(error));
        btn.disabled = false; // Riabilita il pulsante in caso di errore di invio
    });
}
