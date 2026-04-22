// Steuert die Sichtbarkeit der Adressfelder je nach Auswahl
function checkUebergabe() {
    const art = document.getElementById('uebergabeArt').value;
    const bereich = document.getElementById('adresseBereich');
    const plzInput = document.getElementById('plzInput');
    const strasseInput = document.getElementById('strasseInput');
    const hausnummerInput = document.getElementById('hausnummerInput');

    if (art === 'geschaeftsstelle') {
        // Felder ausblenden und Pflichtstatus entfernen
        bereich.classList.add('d-none');
        plzInput.removeAttribute('required');
        strasseInput.removeAttribute('required');
        hausnummerInput.removeAttribute('required');

        // Eingaben zurücksetzen
        plzInput.value = '';
        strasseInput.value = '';
        hausnummerInput.value = '';
    } else {
        // Felder einblenden und als Pflichtfeld setzen
        bereich.classList.remove('d-none');
        plzInput.setAttribute('required', 'required');
        strasseInput.setAttribute('required', 'required');
        hausnummerInput.setAttribute('required', 'required');
    }
}

// Hauptfunktion für die Registrierung
function registrieren(event) {
    event.preventDefault();

    const art = document.getElementById('uebergabeArt').value;
    const plz = document.getElementById('plzInput').value;
    const strasse = document.getElementById('strasseInput').value;
    const hausnummer = document.getElementById('hausnummerInput').value;
    const kleidung = document.getElementById('kleidungArt').value;
    const gebiet = document.getElementById('krisengebiet').value;
    const bestaetigung = document.getElementById('bestaetigung');
    const formular = document.getElementById('spendenForm');

    // PLZ-Prüfung bei Abholung
    if (art === 'abholung' && !plz.startsWith('12')) {
        alert("Abholung ist logistisch nur möglich, wenn die Postleitzahl mit '12' beginnt.");
        return;
    }

    // Datum und Uhrzeit separat erfassen
    const heute = new Date();
    const datum = heute.toLocaleDateString('de-DE');
    const uhrzeit = heute.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

    const ort = (art === 'abholung') ? `${strasse} ${hausnummer}, ${plz}` : "Übergabe an der Geschäftsstelle";

    // Bestätigungsmeldung sicher im DOM aufbauen (ohne innerHTML wegen XSS)
    bestaetigung.innerHTML = '';
    bestaetigung.classList.remove('d-none');

    const ueberschrift = document.createElement('h5');
    ueberschrift.textContent = 'Registrierung erfolgreich!';
    bestaetigung.appendChild(ueberschrift);

    const list = document.createElement('ul');
    list.style.listStyleType = 'none';
    list.style.padding = '0';
    list.style.marginTop = '10px';

    const daten = [
        { label: 'Art der Kleidung:', value: kleidung },
        { label: 'Krisengebiet:', value: gebiet },
        { label: 'Datum:', value: datum },
        { label: 'Uhrzeit:', value: uhrzeit + ' Uhr' },
        { label: 'Ort:', value: ort }
    ];

    daten.forEach(item => {
        const li = document.createElement('li');
        li.style.marginBottom = '5px';
        const strong = document.createElement('strong');
        strong.textContent = `${item.label} `;
        li.appendChild(strong);
        li.appendChild(document.createTextNode(item.value));
        list.appendChild(li);
    });

    bestaetigung.appendChild(list);

    // Eingabeformular nach Erfolg ausblenden
    formular.classList.add('d-none');
}

// Event-Listener beim Laden der Seite initialisieren
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('uebergabeArt').addEventListener('change', checkUebergabe);
    document.getElementById('spendenForm').addEventListener('submit', registrieren);

    // Initialer Check beim ersten Aufruf
    checkUebergabe();
});