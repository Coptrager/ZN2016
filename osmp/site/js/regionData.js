﻿(function () {
    var data = {
        id_0:{ name : "Улица", sname : "ул.", type : 0},
        id_1:{ name : "Государство", sname : "Гос-во", type : 0},
        id_2:{ name : "Федеральный округ", sname : "ФО", type : 1},
        id_3:{ name : "Автономный округ", sname : "АО", type : 1},
        id_4:{ name : "Автономная область", sname : "Аобл", type : 1},
        id_5:{ name : "Город", sname : "г.", type : 0},
        id_6:{ name : "Край", sname : "край", type : 1},
        id_7:{ name : "Область", sname : "обл.", type : 1},
        id_8:{ name : "Республика", sname : "Респ", type : 0},
        id_9:{ name : "Округ", sname : "округ", type : 1},
        id_10:{ name : "Район", sname : "р-н", type : 1},
        id_11:{ name : "Улус", sname : "у", type : 1},
        id_12:{ name : "Территория", sname : "тер.", type : 1},
        id_13:{ name : "Поселок городского типа", sname : "пгт.", type : 0},
        id_14:{ name : "Рабочий поселок", sname : "рп.", type : 0},
        id_15:{name : "Курортный поселок", sname : "кп.", type : 0},
        id_16:{name : "Дачный поселок", sname : "дп", type : 0},
        id_17:{name : "Сельсовет", sname : "с/с", type : 0},
        id_18:{name : "Сельская администрация", sname : "с/а", type : 0},
        id_19:{name : "Сельский округ", sname : "с/о", type : 1},
        id_20:{name : "Волость", sname : "волость", type : 1},
        id_21:{name : "Почтовое отделение", sname : "п/о", type : 0},
        id_22:{name : "Сельское поселение", sname : "с/п", type : 1},
        id_23:{name : "Аал", sname : "аал", type : 1},
        id_24:{name : "Аул", sname : "аул", type : 1},
        id_25:{name : "Выселки(ок)", sname : "высел", type : 1},
        id_26:{name : "Деревня", sname : "д.", type : 0},
        id_27:{name : "Железнодорожная будка", sname : "ж/д будка", type : 0},
        id_28:{name : "Железнодорожная казарма", sname : "ж/д казарм", type : 0},
        id_29:{name : "ж/д останов. (обгонный) пункт", sname : "ж/д оп.", type : 1},
        id_30:{name : "Железнодорожный пост", sname : "ж/д пост.", type : 1},
        id_31:{name : "Железнодорожный разъезд", sname : "ж/д рзд.", type : 1},
        id_32:{name : "Железнодорожная станция", sname : "ж/д ст.", type : 0},
        id_33:{name : "Заимка", sname : "заимка", type : 0},
        id_34:{name : "Казарма", sname : "казарма", type : 0},
        id_35:{name : "Местечко", sname : "м", type : 0},
        id_36:{name : "Микрорайон", sname : "мкр.", type : 1},
        id_37:{name : "Населенный пункт", sname : "нп.", type : 1},
        id_38:{name : "Остров", sname : "остров", type : 0},
        id_39:{name : "Поселок", sname : "п.", type : 0},
        id_40:{name : "Планировочный район", sname : "п/р", type : 0},
        id_41:{name : "Поселок и(при) станция(и)", sname : "п/ст", type : 0},
        id_42:{name : "Починок", sname : "починок", type : 0},
        id_43:{name : "Промышленная зона", sname : "промзона", type : 1},
        id_44:{name : "Разъезд", sname : "рзд.", type : 1},
        id_45:{name : "Село", sname : "с", type : 0},
        id_46:{name : "Слобода", sname : "сл.", type : 1},
        id_47:{name : "Станция", sname : "ст.", type : 0},
        id_48:{name : "Станица", sname : "ст-ца", type : 0},
        id_49:{name : "Хутор", sname : "х", type : 0},
        id_50:{name : "Городок", sname : "городок", type : 0},
        id_51:{name : "Железнодорожная платформа", sname : "ж/д платф", type : 0},
        id_52:{name : "Квартал", sname : "кв-л", type : 0},
        id_53:{name : "Арбан", sname : "арбан", type : 0},
        id_54:{name : "Садовое неком-е товарищество", sname : "снт", type : 0},
        id_55:{name : "Леспромхоз", sname : "лпх", type : 0},
        id_56:{name : "Погост", sname : "погост", type : 1},
        id_57:{name : "Кордон", sname : "кордон", type : 1},
        id_58:{name : "Аллея", sname : "аллея", type : 1},
        id_59:{name : "Бульвар", sname : "б-р", type : 0},
        id_60:{name : "Въезд", sname : "въезд", type : 1},
        id_61:{name : "Дорога", sname : "дор", type : 1},
        id_62:{name : "Животноводческая точка", sname : "жт", type : 1},
        id_63:{name : "Заезд", sname : "заезд", type : 1},
        id_64:{name : "Километр", sname : "км", type : 1},
        id_65:{name : "Кольцо", sname : "кольцо", type : 1},
        id_66:{name : "Линия", sname : "линия", type : 1},
        id_67:{name : "Набережная", sname : "наб", type : 1},
        id_68:{name : "Парк", sname : "парк", type : 0},
        id_69:{name : "Переулок", sname : "пер", type : 0},
        id_70:{name : "Переезд", sname : "переезд", type : 1},
        id_71:{name : "Площадь", sname : "пл.", type : 0},
        id_72:{name : "Площадка", sname : "пл-ка", type : 1},
        id_73:{name : "Проезд", sname : "проезд", type : 1},
        id_74:{name : "Проспект", sname : "пр-кт", type : 1},
        id_75:{name : "Просек", sname : "просек", type : 0},
        id_76:{name : "Проселок", sname : "проселок", type : 1},
        id_77:{name : "Проулок", sname : "проулок", type : 1},
        id_78:{name : "Сад", sname : "сад", type : 1},
        id_79:{name : "Сквер", sname : "сквер", type : 1},
        id_80:{name : "Строение", sname : "стр.", type : 0},
        id_81:{name : "Тракт", sname : "тракт", type : 1},
        id_82:{name : "Тупик", sname : "туп", type : 1},
        id_83:{name : "Участок", sname : "уч-к", type : 1},
        id_84:{name : "Шоссе", sname : "ш", type : 1},
        id_85:{name : "Платформа", sname : "платф", type : 0},
        id_86:{name : "Полустанок", sname : "полустанок", type : 1},
        id_87:{name : "Спуск", sname : "спуск", type : 1},
        id_88:{name : "Канал", sname : "канал", type : 1},
        id_89:{name : "Гаражно-строительный кооператив", sname : "гск", type : 0},
        id_90:{name : "Проток", sname : "проток", type : 0},
        id_91:{name : "Коса", sname : "коса", type : 1},
        id_92:{name : "Вал", sname : "вал", type : 1},
        id_93:{name : "Ферма", sname : "ферма", type : 0},
        id_94:{name : "Мост", sname : "мост", type : 1},
        id_95:{name : "Автономная республика", sname : "АР", type : 0},
        id_96:{name : "Пляж", sname : "пляж", type : 1},
        id_97:{name : "Бухта", sname : "бухта", type : 1},
        id_98:{name : "Кооператив", sname : "кооп", type : 0},
        id_99:{name : "Причал", sname : "прич", type : 1},
        id_100:{ name: "Жилищный массив", sname: "ж/м", type: 0 },
        id_102:{name: "Province", sname: "province", type: 0 },
        id_103:{name: "Municipality", sname: "munic.", type: 0 },
        id_104:{name: "Town", sname: "town", type: 0 },
        id_105:{ name: "Населенный пункт (без 'нп')", sname: "", type: 0 },
        id_106:{name: "orasul", sname: "or.", type: 0 },
        id_107:{name: "sat", sname: "s.", type: 0 },
        id_108:{name: "Localitatie cu statie", sname: "loc. st.cf", type: 0 },
        id_109:{name: "bulevard", sname: "bd.", type: 0 },
        id_110:{name: "piata", sname: "piata", type: 0 },
        id_111:{name: "soseaua", sname: "sos.", type: 0 },
        id_112:{name: "stradela", sname: "str-la", type: 0 },
        id_113:{name: "strada", sname: "str.", type: 0 },
        id_114:{name: "prospectul", sname: "pr-t", type: 0 },
        id_115:{name: "promzona", sname: "promzona", type: 0 },
        id_116:{name: "localitatie", sname: "loc.", type: 0 },
        id_118:{name: "muicipiu", sname: "muicipiu", type: 0 },
        id_119:{name: "territory", sname: "", type: 0 },
        id_120:{name: "raionul", sname: "r-n", type: 0 },
        id_121:{name: "new", sname: "new", type: 0 },
        id_123:{name: "Жилой район", sname: "жилрайон", type: 0 },
        id_124:{name: "Автодорога", sname: "автодорога", type: 0 },
        id_125:{name: "Чувашия", sname: "Чувашия", type: 1 },
        id_126:{name: "Берег", sname: "берег", type: 0 },
        id_127:{name: "Дом", sname: "ДОМ", type: 0 },
        id_128:{name: "Абонентский ящик", sname: "а/я", type: 0 },
        id_129:{name: "Бугор", sname: "бугор", type: 0 },
        id_130:{name: "Жилая зона", sname: "жилзона", type: 0 },
        id_131:{name: "Кожуун", sname: "кожуун", type: 0 },
        id_132:{name: "Массив", sname: "массив", type: 0 },
        id_133:{name: "Просека", sname: "просека", type: 0 },
        id_134:{name: "Протока", sname: "протока", type: 0 },
        id_135:{name: "Ряды", sname: "ряды", type: 0 },
        id_136:{name: "Сельское муниципальное образ-е", sname: "с/мо", type: 0 },
        id_137:{name: "Сумон", sname: "сумон", type: 0 },
        id_138:{name: "Region", sname: "region", type: 0 },
        id_139:{name: "Province/State (no abbrev.)", sname: "", type: 0 },
        id_140:{name: "City/town (no abbrev.)", sname: "", type: 0 },
        id_141:{name: "City", sname: "city", type: 0 },
        id_142:{name: "aleja", sname: "aleja", type: 0 },
        id_143:{name: "bulvāris", sname: "bulvāris", type: 0 },
        id_144:{name: "dambis", sname: "dambis", type: 0 },
        id_145:{name: "gatve", sname: "gatve", type: 0 },
        id_146:{name: "gāte", sname: "gāte", type: 0 },
        id_147:{name: "iela", sname: "iela", type: 0 },
        id_148:{name: "krastmala", sname: "krastmala", type: 0 },
        id_149:{name: "laukums", sname: "laukums", type: 0 },
        id_150:{name: "prospekts", sname: "prospekts", type: 0 },
        id_151:{name: "skvērs", sname: "skvērs", type: 0 },
        id_152:{name: "sēta", sname: "sēta", type: 0 },
        id_153:{name: "šoseja", sname: "šoseja", type: 0 },
        id_154:{name: "pilsetas", sname: "", type: 0 },
        id_155:{name: "State", sname: "state", type: 0 },
        id_156:{name: "ceļš", sname: "ceļš", type: 0 },
        id_157:{name: "maģistrāle", sname: "maģistrāle", type: 0 },
        id_158:{name: "sala", sname: "sala", type: 0 },
        id_159:{name: "līnija", sname: "līnija", type: 0 },
        id_160:{name: "šķērsiela", sname: "šķērsiela", type: 0 },
        id_161:{name: "ostmala", sname: "ostmala", type: 0 },
        id_162:{name: "Vidusceļš", sname: "Vidusceļš", type: 0 },
        id_163:{name: "mols", sname: "mols", type: 0 },
        id_164:{name: "kraj", sname: "kraj", type: 0 },
        id_165:{name: "okres", sname: "okres", type: 0 },
        id_166:{name: "mesto", sname: "mesto", type: 0 },
        id_167:{name: "ulica", sname: "ulica", type: 0 },
        id_168:{name: "Дачное некоммерческое партнёрс", sname: "днп", type: 0 },
        id_169:{name: "Некоммерческое партнёрство", sname: "н/п", type: 0 },
        id_170:{name: "Фермерское хозяйство", sname: "ф/х", type: 0 }
    };


    window.regionData = {
        get: function (id) {
            return data.hasOwnProperty('id_' + id) ? data['id_' + id] : null;
        }
    }
})()