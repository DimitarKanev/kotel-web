// Езици на приложението: bg, en, it, de. Ключът е българският текст (както в index.html).
// Изборът се пази в този браузър (localStorage 'kotel_lang'); по подразбиране - езикът на телефона.
(function () {
  const LANGS = ['bg', 'en', 'it', 'de'];
  const NAMES = { bg: 'Български', en: 'English', it: 'Italiano', de: 'Deutsch' };
  // bg: [en, it, de]
  const D = {
    'Котел': ['Boiler', 'Caldaia', 'Kessel'],
    'Меню': ['Menu', 'Menu', 'Menü'],
    'Вход': ['Log in', 'Accedi', 'Anmelden'],
    'Регистрация': ['Sign up', 'Registrati', 'Registrieren'],
    'Имейл': ['Email', 'Email', 'E-Mail'],
    'Парола (поне 8 знака)': ['Password (at least 8 characters)', 'Password (almeno 8 caratteri)', 'Passwort (mind. 8 Zeichen)'],
    'Нямате акаунт? Изберете „Регистрация“.': ['No account? Choose “Sign up”.', 'Nessun account? Scegli “Registrati”.', 'Kein Konto? „Registrieren“ wählen.'],
    'Вече имате акаунт? Изберете „Вход“.': ['Already have an account? Choose “Log in”.', 'Hai già un account? Scegli “Accedi”.', 'Schon ein Konto? „Anmelden“ wählen.'],
    'Добавяне на термостат': ['Add a thermostat', 'Aggiungi un termostato', 'Thermostat hinzufügen'],
    'Най-лесно: на дисплея отворете Детайли → Сервиз → „QR за телефон“ и сканирайте кода с камерата. Или въведете номера и кода, изписани под QR кода.':
      ['Easiest: on the display open Details → Service → “Phone QR” and scan the code with the camera. Or enter the number and code shown under the QR code.',
       'Più semplice: sul display apri Dettagli → Assistenza → “QR telefono” e inquadra il codice con la fotocamera. Oppure inserisci numero e codice scritti sotto il QR.',
       'Am einfachsten: am Display Details → Service → „QR fürs Handy“ öffnen und den Code mit der Kamera scannen. Oder Nummer und Code unter dem QR-Code eingeben.'],
    'Номер': ['Number', 'Numero', 'Nummer'],
    'Код': ['Code', 'Codice', 'Code'],
    'напр. 1a2b3c4d': ['e.g. 1a2b3c4d', 'es. 1a2b3c4d', 'z. B. 1a2b3c4d'],
    'Добави': ['Add', 'Aggiungi', 'Hinzufügen'],
    'Назад': ['Back', 'Indietro', 'Zurück'],
    'Термостат': ['Thermostat', 'Termostato', 'Thermostat'],
    'В стаята': ['Room', 'Stanza', 'Raum'],
    'Навън': ['Outdoor', 'Esterno', 'Außen'],
    'Отопление': ['Heating', 'Riscaldamento', 'Heizung'],
    'По-студено': ['Colder', 'Più freddo', 'Kälter'],
    'По-топло': ['Warmer', 'Più caldo', 'Wärmer'],
    'Летен режим': ['Summer mode', 'Modalità estate', 'Sommerbetrieb'],
    'Топла вода': ['Hot water', 'Acqua calda', 'Warmwasser'],
    'По-студена вода': ['Colder water', 'Acqua più fredda', 'Kälteres Wasser'],
    'По-топла вода': ['Warmer water', 'Acqua più calda', 'Wärmeres Wasser'],
    'Мощност': ['Power', 'Potenza', 'Leistung'],
    'Регулиране': ['Control', 'Regolazione', 'Regelung'],
    'График': ['Schedule', 'Programma', 'Zeitplan'],
    'Стаен термостат': ['Room thermostat', 'Termostato ambiente', 'Raumthermostat'],
    'Фиксирана': ['Fixed flow', 'Mandata fissa', 'Fester Vorlauf'],
    'Крива': ['Curve', 'Curva', 'Kurve'],
    'Крива (няма външна темп.)': ['Curve (no outdoor temp.)', 'Curva (nessuna temp. esterna)', 'Kurve (keine Außentemp.)'],
    'Изкл': ['Off', 'Spento', 'Aus'],
    'Дневен': ['Daily', 'Giornaliero', 'Täglich'],
    'Седмичен': ['Weekly', 'Settimanale', 'Wöchentlich'],
    'Редактор на графика': ['Schedule editor', 'Editor del programma', 'Zeitplan bearbeiten'],
    'Ден': ['Day', 'Giorno', 'Tag'],
    'Всеки ден (режим Дневен)': ['Every day (Daily mode)', 'Ogni giorno (modalità Giornaliero)', 'Jeden Tag (Modus Täglich)'],
    'Понеделник': ['Monday', 'Lunedì', 'Montag'],
    'Вторник': ['Tuesday', 'Martedì', 'Dienstag'],
    'Сряда': ['Wednesday', 'Mercoledì', 'Mittwoch'],
    'Четвъртък': ['Thursday', 'Giovedì', 'Donnerstag'],
    'Петък': ['Friday', 'Venerdì', 'Freitag'],
    'Събота': ['Saturday', 'Sabato', 'Samstag'],
    'Неделя': ['Sunday', 'Domenica', 'Sonntag'],
    'От час · температура': ['From · temperature', 'Dalle · temperatura', 'Ab · Temperatur'],
    '+ Добави период': ['+ Add period', '+ Aggiungi periodo', '+ Zeit hinzufügen'],
    'Запази': ['Save', 'Salva', 'Speichern'],
    'Подаваща вода': ['Flow water', 'Acqua mandata', 'Vorlaufwasser'],
    'Връщаща вода': ['Return water', 'Acqua ritorno', 'Rücklaufwasser'],
    'Налягане': ['Pressure', 'Pressione', 'Druck'],
    'Връзка с котела': ['Boiler link', 'Collegamento caldaia', 'Kesselverbindung'],
    'Авария': ['Fault', 'Guasto', 'Störung'],
    'Промените тук се виждат веднага и на дисплея, и в Home Assistant.':
      ['Changes here appear at once on the display and in Home Assistant.',
       'Le modifiche qui compaiono subito sul display e in Home Assistant.',
       'Änderungen hier erscheinen sofort am Display und in Home Assistant.'],
    '📲 Инсталирай приложението': ['📲 Install the app', '📲 Installa l\'app', '📲 App installieren'],
    'За да го инсталирате на iPhone: бутон „Сподели“ (□↑) в Safari → „Добави към началния екран“.':
      ['To install on iPhone: “Share” button (□↑) in Safari → “Add to Home Screen”.',
       'Per installarla su iPhone: pulsante “Condividi” (□↑) in Safari → “Aggiungi alla schermata Home”.',
       'Installation auf dem iPhone: „Teilen“ (□↑) in Safari → „Zum Home-Bildschirm“.'],
    '🔒 Заключи дисплея': ['🔒 Lock the display', '🔒 Blocca il display', '🔒 Display sperren'],
    '🔒 Заключи дисплея (защита от деца)': ['🔒 Lock the display (child lock)', '🔒 Blocca il display (sicurezza bambini)', '🔒 Display sperren (Kindersicherung)'],
    '🔓 Отключи дисплея': ['🔓 Unlock the display', '🔓 Sblocca il display', '🔓 Display entsperren'],
    '🔔 Включи известията': ['🔔 Turn on notifications', '🔔 Attiva le notifiche', '🔔 Benachrichtigungen ein'],
    '🔕 Спри известията': ['🔕 Turn off notifications', '🔕 Disattiva le notifiche', '🔕 Benachrichtigungen aus'],
    '🔔 Пробно известие': ['🔔 Test notification', '🔔 Notifica di prova', '🔔 Testbenachrichtigung'],
    '🔔 Известия: първо добавете приложението към началния екран':
      ['🔔 Notifications: first add the app to the home screen', '🔔 Notifiche: prima aggiungi l\'app alla schermata Home', '🔔 Benachrichtigungen: zuerst App zum Home-Bildschirm hinzufügen'],
    '🔔 Известията не се поддържат тук': ['🔔 Notifications are not supported here', '🔔 Notifiche non supportate qui', '🔔 Benachrichtigungen hier nicht unterstützt'],
    '➕ Добави термостат': ['➕ Add thermostat', '➕ Aggiungi termostato', '➕ Thermostat hinzufügen'],
    '➖ Махни този термостат от акаунта': ['➖ Remove this thermostat from the account', '➖ Rimuovi questo termostato dall\'account', '➖ Dieses Thermostat vom Konto entfernen'],
    '↩ Изход': ['↩ Log out', '↩ Esci', '↩ Abmelden'],
    'Затвори': ['Close', 'Chiudi', 'Schließen'],
    '🌐 Език / Language': ['🌐 Language / Език', '🌐 Lingua / Language', '🌐 Sprache / Language'],
    // --- динамични ---
    'Няма връзка с интернет': ['No internet connection', 'Nessuna connessione a internet', 'Keine Internetverbindung'],
    'Грешка': ['Error', 'Errore', 'Fehler'],
    'Свързване…': ['Connecting…', 'Connessione…', 'Verbinden…'],
    'Свързано': ['Connected', 'Connesso', 'Verbunden'],
    'Няма връзка': ['No connection', 'Nessuna connessione', 'Keine Verbindung'],
    'Термостатът е офлайн': ['Thermostat is offline', 'Termostato offline', 'Thermostat ist offline'],
    'влажност': ['humidity', 'umidità', 'Feuchte'],
    'няма': ['none', 'nessuno', 'keine'],
    'Няма връзка с адаптера': ['No link to adapter', 'Adattatore non collegato', 'Keine Verbindung zum Adapter'],
    'Котелът не отговаря': ['Boiler not responding', 'La caldaia non risponde', 'Kessel antwortet nicht'],
    'Отопление + БГВ': ['Heating + hot water', 'Riscaldamento + ACS', 'Heizung + Warmwasser'],
    'В покой': ['Idle', 'In attesa', 'Bereit'],
    'Цел': ['Target', 'Obiettivo', 'Soll'],
    'Отопление: изкл': ['Heating: off', 'Riscaldamento: off', 'Heizung: aus'],
    'Отопление: вкл': ['Heating: on', 'Riscaldamento: on', 'Heizung: ein'],
    'Летен режим: вкл': ['Summer mode: on', 'Modalità estate: on', 'Sommerbetrieb: ein'],
    'Вода': ['Water', 'Acqua', 'Wasser'],
    'Топла вода: вкл': ['Hot water: on', 'Acqua calda: on', 'Warmwasser: ein'],
    'Топла вода: изкл': ['Hot water: off', 'Acqua calda: off', 'Warmwasser: aus'],
    'Последна промяна:': ['Last change:', 'Ultima modifica:', 'Letzte Änderung:'],
    'няма адаптер': ['no adapter', 'nessun adattatore', 'kein Adapter'],
    'котелът не отговаря': ['boiler not responding', 'la caldaia non risponde', 'Kessel antwortet nicht'],
    'да': ['yes', 'sì', 'ja'],
    'Да махна ли този термостат от вашия акаунт? Самият термостат продължава да работи.':
      ['Remove this thermostat from your account? The thermostat itself keeps working.',
       'Rimuovere questo termostato dal tuo account? Il termostato continua a funzionare.',
       'Dieses Thermostat von Ihrem Konto entfernen? Das Thermostat selbst arbeitet weiter.'],
    'Летен режим: отоплението спира, работи само топлата вода. Включване?':
      ['Summer mode: heating stops, only hot water works. Turn on?',
       'Modalità estate: il riscaldamento si ferma, funziona solo l\'acqua calda. Attivare?',
       'Sommerbetrieb: Heizung aus, nur Warmwasser. Einschalten?'],
    'Изтрий периода': ['Delete period', 'Elimina periodo', 'Zeit löschen'],
    'Графикът още не е получен от термостата…': ['Schedule not yet received from the thermostat…', 'Programma non ancora ricevuto dal termostato…', 'Zeitplan noch nicht vom Thermostat empfangen…'],
    'Има незаписани промени. Да ги загубя ли?': ['There are unsaved changes. Discard them?', 'Ci sono modifiche non salvate. Scartarle?', 'Es gibt ungespeicherte Änderungen. Verwerfen?'],
    'Най-много 8 периода на ден.': ['At most 8 periods per day.', 'Al massimo 8 periodi al giorno.', 'Höchstens 8 Zeiten pro Tag.'],
    'Проверете часовете и температурите (5–30°).': ['Check the times and temperatures (5–30°).', 'Controlla orari e temperature (5–30°).', 'Zeiten und Temperaturen prüfen (5–30°).'],
    'Изпратено ✓': ['Sent ✓', 'Inviato ✓', 'Gesendet ✓'],
    'Известията са забранени в настройките на браузъра.': ['Notifications are blocked in the browser settings.', 'Le notifiche sono bloccate nelle impostazioni del browser.', 'Benachrichtigungen sind in den Browsereinstellungen blockiert.'],
    'Известия': ['Notifications', 'Notifiche', 'Benachrichtigungen'],
    'Не се изпрати - опитайте да изключите и включите известията.': ['Not sent - try turning notifications off and on.', 'Non inviata - prova a disattivare e riattivare le notifiche.', 'Nicht gesendet - Benachrichtigungen aus- und wieder einschalten.'],
    // нулиране на авария
    'Нулиране (Reset)': ['Reset', 'Reset', 'Reset'],
    'Да нулирам ли аварията на котела? Ако се повтаря, потърсете сервиз.':
      ['Reset the boiler fault? If it keeps coming back, call a service technician.',
       'Ripristinare il guasto della caldaia? Se si ripete, chiama l\'assistenza.',
       'Kesselstörung zurücksetzen? Wenn sie wiederkehrt, den Service rufen.'],
    'Изпратено...': ['Sent...', 'Inviato...', 'Gesendet...'],
    'Котелът е нулиран': ['Boiler has been reset', 'Caldaia ripristinata', 'Kessel zurückgesetzt'],
    'Котелът не поддържа нулиране отдалеч': ['Boiler does not support remote reset', 'La caldaia non supporta il reset remoto', 'Kessel unterstützt keinen Fern-Reset'],
    'Котелът отказа нулирането': ['Boiler refused the reset', 'La caldaia ha rifiutato il reset', 'Kessel hat den Reset abgelehnt'],
    'Няма отговор от котела': ['No answer from the boiler', 'Nessuna risposta dalla caldaia', 'Keine Antwort vom Kessel'],
    'Твърде много нулирания - изчакайте час': ['Too many resets - wait an hour', 'Troppi reset - attendi un\'ora', 'Zu viele Resets - eine Stunde warten'],
    'Няма авария за нулиране': ['No fault to reset', 'Nessun guasto da ripristinare', 'Keine Störung zum Zurücksetzen'],
    'Нулирането е като бутона Reset на котела.': ['The reset works like the boiler\'s Reset button.', 'Il reset funziona come il tasto Reset della caldaia.', 'Der Reset wirkt wie die Reset-Taste am Kessel.'],
    // източници на последната промяна (от дисплея)
    'дисплей': ['display', 'display', 'Display'],
    'телефон': ['phone', 'telefono', 'Handy'],
    'график': ['schedule', 'programma', 'Zeitplan'],
    'HA/уеб': ['HA/web', 'HA/web', 'HA/Web'],
    // грешки от облачната услуга (cloud/src/index.js)
    'Не сте влезли': ['You are not logged in', 'Non hai effettuato l\'accesso', 'Nicht angemeldet'],
    'Сесията е изтекла - влезте отново': ['Session expired - please log in again', 'Sessione scaduta - accedi di nuovo', 'Sitzung abgelaufen - bitte erneut anmelden'],
    'Няма такъв акаунт': ['No such account', 'Account inesistente', 'Kein solches Konto'],
    'Невалиден имейл': ['Invalid email', 'Email non valida', 'Ungültige E-Mail'],
    'Паролата трябва да е поне 8 знака': ['The password must be at least 8 characters', 'La password deve avere almeno 8 caratteri', 'Das Passwort muss mind. 8 Zeichen haben'],
    'Невалиден номер на устройство': ['Invalid device number', 'Numero dispositivo non valido', 'Ungültige Gerätenummer'],
    'Вече има акаунт с този имейл': ['An account with this email already exists', 'Esiste già un account con questa email', 'Es gibt bereits ein Konto mit dieser E-Mail'],
    'Грешен имейл или парола': ['Wrong email or password', 'Email o password errata', 'Falsche E-Mail oder falsches Passwort'],
    'Грешен номер или код': ['Wrong number or code', 'Numero o codice errato', 'Falsche Nummer oder falscher Code'],
    'Невалиден абонамент': ['Invalid subscription', 'Iscrizione non valida', 'Ungültiges Abonnement'],
    'Вътрешна грешка': ['Internal error', 'Errore interno', 'Interner Fehler'],
  };

  function detect() {
    let l = null;
    try { l = localStorage.getItem('kotel_lang'); } catch {}
    if (LANGS.includes(l)) return l;
    for (const n of navigator.languages || [navigator.language || '']) {
      const p = String(n).slice(0, 2).toLowerCase();
      if (LANGS.includes(p)) return p;
    }
    return 'en';
  }
  const LANG = detect();
  const idx = LANGS.indexOf(LANG) - 1;

  // Превод (ако няма - българският текст)
  const t = (s) => (idx >= 0 && D[s] && D[s][idx]) || s;

  // Превежда текстовете и атрибутите в DOM-а (стартиране)
  function applyDom(root) {
    if (idx < 0) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (w.nextNode()) nodes.push(w.currentNode);
    for (const n of nodes) {
      const s = n.nodeValue.trim().replace(/\s+/g, ' ');
      if (s && D[s]) n.nodeValue = n.nodeValue.replace(n.nodeValue.trim(), t(s));
    }
    for (const el of root.querySelectorAll('[placeholder],[aria-label],[title]')) {
      for (const a of ['placeholder', 'aria-label', 'title']) {
        const v = el.getAttribute(a);
        if (v && D[v]) el.setAttribute(a, t(v));
      }
    }
  }

  // „телефон 14:32“ -> „phone 14:32“
  const trLast = (s) => {
    const i = String(s).lastIndexOf(' ');
    return i < 0 ? t(s) : t(s.slice(0, i)) + s.slice(i);
  };

  function setLang(l) {
    try { localStorage.setItem('kotel_lang', l); } catch {}
  }

  window.I18N = { LANG, LANGS, NAMES, t, applyDom, trLast, setLang };
})();
