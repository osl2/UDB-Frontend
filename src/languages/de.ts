const de = {
    home: {
        language: 'Sprache',
        langGerman: 'Deutsch',
        langEnglish: 'Englisch',
        logo: 'u<sup>DB</sup>',
        slogan: 'Du an die Macht der Datenbanken',
        descriptionTextFreeMode: 'Hier kannst du ganz ohne Anmelden, Datenbanken erstellen und Anfragen üben.',
        descriptionTextCourse: 'Tritt hier einem Kurs von deinem Lehrer bei.',
        descriptionTextTeacher: 'Lehrerbereich ermöglicht Kurse für die Schüler zu erstellen.',
        back: 'Zurück',
        login: 'Anmelden',
        register: 'Registrieren',
        enter: 'Beitreten',
        enterCourse: 'Kurs beitreten',
        courseId: 'Kurs-Id',
        alreadyLoggedIn: 'Beitreten als ',
        name: 'Nutzername',
        pw: 'Passwort',
        repeatedpw: 'Passwort wiederholen',
        cancel: 'Abbrechen',
        join: 'Beitreten',
        alertNoCourse:
            'Laden des Kurses ist fehlgeschlagen: Es wurde kein Kurs mit der eingegebenen ID gefunden. ' +
            'Bitte versuche es erneut.',
        errorCourseId: 'Gib eine Kurs-Id ein',
        errorUser: 'Gib einen Nutzernamen ein',
        errorPw: 'Gib ein Passwort ein',
        error2Pw: 'Gib beide Passwörter ein',
        errorPwEqual: 'Die Passwörter stimmen nicht überein',
        errorLogin: 'Anmeldung fehlgeschlagen',
        errorRegistration: 'Registrierung fehlgeschlagen',
        successRegistration: 'Registrierung erfolgreich',
    },
    sandbox: {
        titleStartPage: 'Freier Modus',
        resultText: 'Ergebnis des zuletzt ausgeführten SQL-Befehls',
        switchToPointAndClick: 'Point-and-Click Feature aktivieren',
        switchToPlainSQL: 'Zurück zum Textfeld',
    },
    teacher: {
        titleStartPage: 'Lehrerbereich',
        uploadDb: 'Datenbanken hochladen',
        notAuthorized: 'Kein Zugriff auf diese Seite.',
        alertCourse: 'Kurs',
        alertDatabase: 'Datenbank',
        alertDelete: 'wirklich löschen? Dies kann nicht mehr rückgängig gemacht werden.',
        alertName: 'Gib einen Namen für den Kurs an.',
    },
    course: {
        titleStartPage: 'Kursbereich',
        worksheets: 'Aufgabenblätter',
        solutionsheets: 'Lösungsblätter',
        alertDelete: 'Arbeitsblatt wirklich löschen? Dies kann nicht mehr rückgängig gemacht werden!',
        alertEditWorksheet:
            'Aufgabenblatt wirklich bearbeiten? Schüler können ihren aktuellen Bearbeitungsstand ' +
            'eventuell nicht mehr importieren, da die Aufgaben dann eventuell nicht mehr kompatibel sind.',
        alertName: 'Gib einen Namen für das Arbeitsblatt an',
    },
    courseViewStudent: {
        solveWorksheetButton: 'Blatt bearbeiten',
        showSolutionsheetButton: 'Blatt öffnen',
        solutionsheetText: 'Lösungsblatt zu: ',
    },
    navbar: {
        courseDropdown: 'Meine Kurse',
        databaseDropdown: 'Meine Datenbanken',
        profileDropdown: 'Profil',
        settings: 'Einstellungen',
        logout: 'Abmelden',
    },
    query: {
        executeButton: 'Ausführen',
    },
    database: {
        dropDatabase: 'Ziehe eine Datenbank Datei in dieses Feld oder klicke um eine Datei auszuwählen.',
        createDatabase: 'Falls Du noch keine Datenbank Datei hast, dann erstelle hier eine.',
        noDBYetCreateOne: 'Noch keine Datenbank zur Hand? Dann erstelle eine',
        createEmptyDB: 'leere Datenbank',
        orStartWith: 'oder starte mit einer',
        createExampleDB: 'Beispiel-Datenbank',
        emptyDatabaseMsg: 'Die Datenbank beinhaltet noch keine Tabellen.',
        downloadDB: 'Datenbank herunterladen',
        or: 'oder',
        reset: 'zurücksetzen',
        courseId: 'Kurs-Id',
    },
    helpMessages: {
        sandbox: 'Hier können SQLite Datenbanken hochgeladen werden.',
    },
    worksheetList: {
        worksheetOnline: 'Aufgabenblatt ist online',
        worksheetOffline: 'Aufgabenblatt ist offline',
        noSheets: 'Dieser Kurs enthält noch keine Aufgabenblätter',
        loadNew: 'Neu laden',
        delete: 'Löschen',
        edit: 'Bearbeiten',
        newSheet: 'Neues Aufgabenblatt',
        add: 'Hinzufügen',
        name: 'Name',
    },
    solutionsheetList: {
        solutionsheetOnline: 'Lösungsblatt ist online',
        solutionsheetOffline: 'Lösungsblatt ist offline',
    },
    buttonText: {
        delete: 'Löschen',
        changeView: 'Wechsel',
        showDatabase: 'Anzeigen',
    },
    hoverText: {
        switchToStudentsView: 'Hier klicken, um anzuzeigen, was die Schüler vom Kurs sehen werden.',
        switchBackToTeachersView: 'Zurück zur eigenen Übersicht.',
        saveMessageStudentWorksheet:
            'Die Lösung wird nur lokal gespeichert. Exportiere Deinen Bearbeitungsstand, ' +
            'bevor Du die Seite schließt. Sonst geht deine Lösung verloren.',
        compareSolutionMessage:
            'Die Eingabe, die mit der Musterlösung verglichen wird, ' + 'wird zuvor automatisch gespeichert.',
    },
    subtaskCreation: {
        typeInstruction: 'Erklärender Text',
        typeInstructionExtra: 'Erklärender Text, keine Bearbeitung für Schüler',
        typePlainText: 'Freitext Aufgabe',
        typeMultipleChoice: 'Multiple-Choice Aufgabe',
        typeSql: 'Sql Aufgabe',
        chooseType: 'Wähle die Art der Teilaufgabe aus',
        maximize: 'Optionen ausklappen',
        minimize: 'Optionen einklappen',
        instruction: 'Aufgabentext hier eingeben',
        verifiable: 'Ist eine Muserlösung vorhanden?',
        solution: 'Lösung hier eingeben',
        visible: 'Wird die Musterlösung zum Vergleichen freigegeben?',
        yes: 'Ja',
        no: 'Nein',
        answerOption: 'Antwortmöglichkeit hier eingeben',
        addAnswer: 'Antwort hinzufügen',
        rightAnswers: 'Wähle die richtigen Antwortmöglichkeiten aus',
        allowedSql: 'Welche Sql-Befehle dürfen verwendet werden?',
        noRestriction: 'Keine Einschränkungen',
        select: 'Select Anfragen',
        PandC: 'Ist das Point and Click Feature Nutzbar?',
        rowOrder: 'Ist die Reihenfolge der Reihen beim Vergleichen wichtig?',
        save: 'Teilaufgabe speichern',
        delete: 'Teilaufgabe löschen',
        alertAnswerOption: 'Bitte trage eine Antwortmöglichkeit ein',
        alertDelete: 'Teilaufgabe wirklich löschen? Dies kann nicht mehr rückgängig gemacht werden.',
    },
    taskCreation: {
        maximize: 'Aufgabe ausklappen',
        minimize: 'Aufgabe einklappen',
        name: 'Name der Aufgabe',
        newSql: 'Neue SQL-Aufgabe',
        newMc: 'Neue Multiple-Choice-Aufgabe',
        newText: 'Neue Freitextaufgabe',
        newInstruction: 'Neuer Erklärtext',
        chooseDb: 'Wähle eine Datenbank aus',
        alertDelete: 'Aufgabe wirklich löschen? Dies kann nicht mehr rückgängig gemacht werden.',
    },
    teacherWorksheet: {
        name: 'Name des Aufgabenblatts',
        sheetOnline: 'Ist das Aufgabenblatt für Schüler online?',
        solutionOnline: 'Ist das Lösungsblatt für Schüler einsehbar?',
        yes: 'Ja',
        no: 'Nein',
        new: 'Neue Aufgabe',
        toOverview: 'Zurück zur Kursübersicht',
        alertReturn:
            'zurück zu Übersicht? Stelle sicher, dass alle Teilaufgaben gespeichert wurden,' +
            ' ansonsten sind sie nicht im Aufgabenblatt enthalten',
    },
    studentWorksheet: {
        importSolution: 'Bearbeitungsstand importieren',
        exportSolution: 'Bearbeitungsstand exportieren',
        exportPdf: 'Lösung des eigenen Blattes als PDF exportieren',
        alertSolutionChange:
            'Wenn Aufgaben durch deinen Lehrer verändert wurden, ' + 'ist deine bisherige Lösung nicht mehr verfügbar!',
        alertSolutionWrong: 'Lösung passt nicht zum aktuellen Aufgabenblatt!',
        alertSolutionUndefined: 'Etwas ist schiefgelaufen, die Lösung ist nicht definiert',
        alertSave: 'Speichern erfolgreich',
        alertSolutionCorrect: 'Deine Lösung stimmt mit der von deinem Lehrer angegebenen Lösung überein',
        alertReset: 'Die Aufgabe wirklich zurücksetzen? Dieser Vorgang kann nicht rückgängig gemacht werden',
    },
    workSheetInstruction: {
        edit: 'Bearbeiten',
    },
    taskSolve: {
        subtask: 'Teilaufgabe',
        of: 'von',
        dbOverview: 'Übersicht über die Datenbanken:',
        prevSubtask: 'Vorherige Teilaufgabe',
        nextSubtask: 'Nächste Teilaufgabe',
        toOverview: 'Zurück zur Übersicht',
        resetTask: 'Aufgabe zurücksetzen',
    },
    taskComp: {
        instruction: 'Aufgabenstellung:',
        enterSolution: 'Antwort eingeben',
        save: 'Speichern',
        compare: 'Vergleich mit der Musterlösung',
    },
    sqlTaskComp: {
        save:
            'Wenn Du diesen Knopf drückst, wird die zuletzt ausgeführte Query gespeichert.' +
            ' Achte darauf, dass Du die Anfrage, die Du speichern willst, auch noch einmal ausführst. ' +
            'Die Lösung wird nur lokal gespeichert. Exportiere Deinen Bearbeitungsstand, bevor Du die Seite schließt. ' +
            'Sonst geht deine Lösung verloren.',
        select: 'Es dürfen nur Select Statements verwendet werden.',
        alertStatement:
            'Du hast einen SQL-Befehl verwendet, der für diese Aufgabe nicht erlaubt war.' +
            'Bitte versuche erneut die Aufgabe zu lösen.',
    },
    mcTask: {
        answerOptions: 'Antwortmöglichkeiten: ',
    },
    courseList: {
        name: 'Name',
        description: 'Beschreibung',
        add: 'Hinzufügen',
        id: 'Kurs-ID:',
        delete: 'Löschen',
        open: 'Kurs öffnen',
        new: 'Neuer Kurs',
    },
    apiError: {
        defaultMsg: 'ERROR: Etwas ist schiefgelaufen.',
        server500: 'ERROR: Es gab einen Fehler auf dem Server.',

        // Account
        register400: 'ERROR: Benutzername existiert bereits.',

        // Course
        course404: 'ERROR: Dieser Kurs existiert nicht.',
        courses404: 'ERROR: Kurse existieren nicht.',

        // Database
        databaseCreate: 'Beim Erstellen der Datenbank ist ein Fehler aufgetreten.',
        database404: 'ERROR: Diese Datenbank existiert nicht.',
        databases404: 'ERROR: Datenbanken existieren nicht.',

        // Worksheet
        worksheet404: 'ERROR: Dieses Aufgabenblatt existiert nicht.',
        worksheets404: 'ERROR: Aufgabenblätter existieren nicht.',

        // Task
        task404: 'ERROR: Diese Aufgabe existiert nicht.',
        tasks404: 'ERROR: Aufgaben existieren nicht.',

        // Subtask
        subtask404: 'ERROR: Diese Teilaufgabe existiert nicht.',
        subtasks404: 'ERROR: Teilaufgaben existieren nicht.',

        // Solution
        compare404: 'ERROR: Diese Teilaufgabe hat (noch) keine (öffentlich zugängliche) Lösung zum Vergleichen.',
    },
};
export default de;
