(function () {
    var langs = {
        rus: 0,
        eng: 1
    },
    currentLang = 0,
    strings = {
        buttonPay: [
            'Оплата услуг'
        ],
        buttonLk: [
            'VISA QIWI WALLET'
        ],
        buttonBunks: [
            'Пополнение карты'
        ],
        backspace: [
            'СТЕРЕТЬ'
        ],
        backButton: [
            'назад'
        ],
        homeButton: [
            'на главную'
        ],
        forwardButton: [
            'далее'
        ],
        payButton: [
            'оплатить'
        ],
        searchButton: [
            'поиск'
        ],
        postButton: [
            'отправить'
        ],
        wantHelpButton: [
            'Хочу помочь'
        ],
        findButton: [
            'Найти'
        ]
    };

    window.getUIString = function (stringName) {
        if (strings.hasOwnProperty(stringName)) {
            try {
                return strings[stringName][currentLang];
            }
            catch (e) {
                return strings[stringName][0];
            }
        }
        else {
            return '';
        }
    }
    window.changeUILang = function (lang) {
        if (langs.hasOwnProperty(lang)) {
            currentLang = langs[lang];
            return true;
        }
        else {
            return false;
        }
    }
})();
