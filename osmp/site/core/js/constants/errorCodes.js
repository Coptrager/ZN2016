"use strict";System.register([],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _createClass;return{setters:[],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_export("default",new(function(){function _class(){_classCallCheck(this,_class)}return _createClass(_class,[{key:"getError",value:function(value){var code=this.ERROR_CODES.find(function(item){return item[0]==value});return code?code[1]:qiwi.i18n("errors.default")}},{key:"ERROR_CODES",get:function(){return[[0,"Ок"],[1,"Платеж в адрес этой компании временно недоступен"],[2,"Превышено число попыток"],[3,"Техническая ошибка, нельзя отправить запрос провайдеру"],[4,"Неверный формат счета/телефона"],[5,"Номер не принадлежит оператору"],[6,"Прием платежа запрещен, обратитесь в банк"],[7,"Прием платежа запрещен, обратитесь к оператору"],[8,"Прием платежа запрещен по техническим причинам"],[9,"Превышено время ожидания от провайдера"],[10,"Дублирование платежа"],[11,"Провайдера не существует"],[12,"Платеж не подтвержден клиентом"],[13,"Сервер занят, повторите запрос через минуту"],[15,"Нет подтверждения от банка-эмитента"],[16,"Превышен суточный лимит"],[20,"Ошибка банка"],[35,"Ключ paypal не действителен"],[36,"Ключ paypal не авторизован"],[71,"Домашний оператор не может принять платеж"],[72,"Счет платежной системы не доступен"],[73,"Домашний оператор не доступен"],[74,"Процессинговый центр не может принимать платежи."],[75,"Провайдер не идентифицировал процессинговый центр"],[76,"Платеж запрещен провайдером"],[77,"Прием платежа запрещен провайдером"],[78,"Провайдер не может провести платеж"],[79,"Счет абонента не активен"],[80,"VIP счет. Прием платежа запрешен."],[81,"Не найдено описание клиента"],[82,"Провайдер запретип прием платежа процессинговому центру"],[83,"В настоящее время прием платежа невозможен"],[84,"Номер не принадлежит оператору."],[85,"Отмена платежа невозможна"],[86,"Не определено состояние платежа"],[90,"Проведение платежа не окончено"],[100,"Ошибка сервера - JSP Error"],[101,"Нет такого файла для загрузки"],[110,"Ошибка сервера - PL/SQL Error"],[115,"PL/SQL - ошибка при создании запроса МТС"],[116,"Истекло время ожидания (Технические проблемы в МТС)"],[123,"Ошибка идентификации"],[130,"Платеж в адрес выбранного провайдера невозможен."],[131,"Платежи на выбранного провайдера запрещено проводить из данной страны."],[132,"Онлайн проверка для данного провайдера запрещена."],[133,"Нет прав на прием платежей"],[134,"Нет прав кассира"],[135,"Нельзя списывать средства с чужого счета"],[140,"Прием платежа невозможен из-за технического сбоя. Повторите позже"],[141,"Ошибка при отправке платежа в МТС"],[142,"Платеж отменен в МТС"],[150,"Неверный пароль"],[151,"Ошибка проверки подписи"],[152,"Запросы по данному протоку запрещены"],[154,"Техническая ошибка"],[155,"Прием платежа для данного провайдера запрещен"],[200,"JSP - неверное значение R"],[201,"Слишком много запросов с терминала. Подождите."],[202,"Ошибка в параметрах запроса"],[203,"Транзакция не найдена в базе данных"],[209,"Ошибка авторизации"],[210,"Нет такой транзакции в базе"],[211,"Неверный статус транзакции"],[212,"Не задана сумма платежа (или лимит терминала)"],[213,"Не задана сумма списания"],[215,"Транзакция с таким номером уже есть в базе"],[216,"Ошибка при сохранении транзакции на сервере"],[220,"Недостаточно средств "],[221,"Недостаточно средств на счете в банке"],[222,"Ошибка при запроса баланса в БелБанке"],[223,"Не заведен номер счета в БелБанке в системе"],[225,"Счёт уже отменен"],[230,"Ошибка при отправке запроса в МегаФон"],[231,"Неизвестная ошибка БиЛайн"],[232,"Не авторизовано Билайном"],[233,"Повторный платеж в течении часа"],[234,"Не прошло в Билайне"],[235,"Ошибка Корбины"],[236,"Договор с БиЛайн не зарегистрирован"],[237,"Нет связи с Билайном"],[238,"Номер телефона находится в неактивном состоянии"],[239,"Некоммерческий клиент"],[240,"Не проведена"],[241,"Сумма меньше минимальной"],[242,"Сумма платежа превышает максимальную"],[243,"Невозможно проверить состояние счета"],[244,"Терминал не зарегистрирован у оператора"],[245,"Неверный тип терминала"],[246,"Неверный PIN-код"],[247,"Ошибка при отправке запроса в Индиго"],[248,"Сумма платежа не соответствует сумме счета"],[249,"Номер Матрикс Мобайл"],[250,"Ошибка Матрикса"],[251,"Отказ от Матрикса"],[252,"Необходима повторная регистрация"],[260,"Сонет: ошибка сервера"],[261,"Сонет: ошибка связи"],[262,"Сонет: отказ"],[270,"Ошибка от провайдера"],[271,"Ошибка в ответе провайдера"],[272,"Временно нет связи с провайдером"],[274,"Сумма платежа должна быть целым числом"],[275,"Некорректная сумма платежа"],[276,"Коррекция! НЕ ПЕРЕПРОВОДИТЬ!"],[278,"Превышение максимального периода"],[280,"Недостаток средств у агента выше"],[290,"Ошибка блокировки баланса для списания средств"],[296,"Неверный владелец"],[297,"Неверная ссылка или ссылка уже была активирована"],[298,"Агента не существует в системе"],[299,"Пользователь уже зарегистрирован"],[300,"Техническая ошибка"],[301,"Неверный формат кода подтверждения"],[302,"Слишком простой пароль"],[303,"Неверный номер телефона"],[304,"Неверный номер карты"],[305,"Пользователь с другим номером карты зарегистрирован"],[306,"Неправильный код дилера"],[307,"Неправильный код точки приема"],[308,"Неправильный код оператора"],[309,"Доступ запрещен"],[310,"Неправильная ЭЦП"],[311,"Неправильный формат документа"],[312,"Сессия с таким номером не существует"],[313,"Запрос сделан с другого IP"],[314,"Не прошел CyberCheck (списание средств со счета дилера)"],[315,"Не было запроса из банка на создание агента"],[316,"Блокировка на 24 часа"],[317,"SMS с PIN-кодом уже было отослано"],[318,"Пользователь с таким номером не зарегистрирован"],[319,"Платеж невозможен "],[330,"Ошибка шифрования"],[331,"Нет задолженности за выбранный период"],[332,"Платеж отменен по USSD"],[333,"Пользователь не ответил на звонок"],[334,"Не найден ключ"],[335,"Требуется PIN-код"],[336,"PIN-код был выслан ранее"],[337,"Неверный формат PIN-кода"],[338,"ЛК отключен"],[339,"Не пройден IP-фильтр"],[340,"Платеж не завершен"],[341,"Неверные данные запроса"],[342,"Неправильная станция"],[343,"Нет поездов"],[344,"Нет подтверждения"],[345,"Отменено службой безопасности"],[346,"Ошибка ufs"],[347,"Ошибка concert.ru"],[348,"Ошибка суммы заказа"],[349,"Требуется PIN-код для входа"],[350,"Неверный магазин"],[351,"Истек срок действия карты"],[352,"Пользователь уже есть в системе"],[353,"Метод авторизации отключен"],[354,"Текст не соответствует изображению"],[355,"Бесплатное восстановление пароля доступно только 1 раз в день"],[364,"Отменен касиром"],[365,"Отменен при сверке"],[366,"Уже запланирован со счета Билайн"],[367,"Звонок не состоялся"],[368,"Сервис временно не доступен"],[399,"Не выдержан интервал между двумя попытками регистрации на один и тот же номер"],[402,"Отказ в предоставлении услуги абоненту"],[403,"Уведомление об истечении timeOut при покупке и резервировании"],[406,"Явный отказ абонента от покупки"],[407,"Недостаточно средств"],[408,"Отмена платежа по причине появления нового"],[410,"Превышение максимального значения таймаута при резервировании"],[411,"Запрос на завершение резервирования уже отработан"],[412,"Запрос на завершение покупки уже отработан"],[421,"Ошибка при получении информации об абоненте"],[449,"Неверно указан номер постановления"],[450,"Не пройден контроль по максимальной сумме покупки"],[451,"Не пройден контроль по сумме платежей за настроенное количество суток"],[452,"Не пройден контроль по количеству транзакций за настроенное количество суток"],[453,"Не пройден фрод-контроль по минимальному количеству времени между транзакциями"],[454,"Отказ от провайдера"],[455,"Не пройден контроль по минимальному остатку на счете"],[461,"Истечение периода, данного на подтверждение покупки пользователем"],[471,"Неустановленная ошибка при списании денег с основного счета"],[472,"На основном счете пользователя недостаточно средств для списания"],[473,"На вашем специальном авансовом счете недостаточно средств, а списание с основного счета невозможно"],[490,"Лимит количества СМС от пользователя"],[500,"По техническим причинам этот платеж не может быть выполнен. Для совершения платежа обратитесь, пожалуйста, в свой обслуживающий банк"],[501,"Истек срок действия ключа отправителя"],[502,"Ключ отправителя не зарегистрирован"],[503,"Ключ отправителя блокирован"],[504,"ЭЦП плательщика неверна"],[505,"Ключ плательщика блокирован"],[506,"Неверный логин/пароль при подключении к серверу"],[507,"ЭЦП отправителя неверна"],[508,"По техническим причинам данная операция не может быть выполнена. Для осуществления платежа обратитесь, пожалуйста, в свой обслуживающий банк"],[509,"По техническим причинам данная операция не может быть выполнена. Для осуществления платежа обратитесь, пожалуйста, в свой обслуживающий банк"],[510,"Необрабатываемый тип сообщения"],[511,"Неверный тип документа"],[512,"Неверный тип платежа"],[513,"Платеж не может быть проведен, регламентные работы"],[519,"Пополнение валютных счетов и карт запрещено"],[520,"Неверный БИК плательщика"],[521,"Неверный счет или БИК плательщика"],[522,"Неверный номер или срок действия карты получателя"],[523,"Неверный ИНН плательщика"],[524,"Неверный идентификатор плательщика"],[525,"Счет плательщика блокирован"],[526,"Карта плательщика блокирована"],[527,"Ошибка в сроке действия карты получателя"],[528,"Истек срок действия карты получателя"],[529,"Неверный номер договора плательщика"],[530,"Отсутствует ФИО или дата рождения получателя"],[531,"Отсутствует или неверный номер терминала"],[532,"Отсутствует aдрес терминала"],[533,"Отсутствует или неверный номер агента терминала"],[534,"Отсутствует наименование агента терминала"],[535,"Отсутствует код платежной системы"],[536,"Отсутствует внутренний номер платежа"],[537,"Неверный формат поля Дата рождения"],[538,"Неверный формат поля дата учета платежа"],[539,"Не заполнено поле  oper_type"],[540,"Неверный БИК получателя"],[541,"Неверно указаны реквизиты платежа. Пожалуйста, проверьте введенные данные или обратитесь за уточнением реквизитов в свой обслуживающий банк"],[542,"Неверный номер карты получателя"],[543,"Неверный ИНН получателя"],[544,"Неверный Идентификатор получателя"],[545,"Счет получателя блокирован"],[546,"Карта получателя блокирована"],[547,"Ошибка в сроке действия карты получателя"],[548,"Истек срок действия карты получателя"],[549,"Неверный номер договора получателя"],[550,"Неверное ФИО получателя"],[551,"Сумма слишком мала"],[552,"Сумма слишком велика/Превышен лимит платежей в день"],[553,"Неверный формат поля сумма платежа"],[554,"Неверный формат поля комиссия"],[555,"Сумма комиссии больше суммы платежа"],[556,"Превышен суточный лимит суммы платежей на один номер счета/карты/договора"],[557,"Сумма платежа = 0"],[558,"Превышен установленный лимит по сумме"],[559,"Невозможно идентифицировать получателя платежа"],[560,"Отвергнут оператором банка отправителя"],[561,"Платеж отвергнут оператором банка получателя"],[569,"Неверный формат поля Дата налогового платежа"],[571,"Неверный номер счета/договора получателя"],[572,"Неверный тип платежа"],[573,"Не заполнено или ошибочно значение поля КПП"],[574,"Не заполнено или ошибочно значение поля КБК"],[575,"Не заполнено или ошибочно значение поля ОКАТО"],[576,"Не заполнено или ошибочно значение поля Основание платежа"],[577,"Не заполнено или ошибочно значение поля Налоговый период"],[578,"Не заполнено или ошибочно значение поля Тип налогового платежа"],[579,"Не заполнено или ошибочно значение поля Статус налогового органа"],[580,"Не заполнено назначение платежа"],[581,"Платеж невозможно отменить"],[589,"Платеж принят на исполнение. Ожидается подтверждение"],[590,"Платеж принят на обработку"],[591,"Платеж не возможно отменить"],[592,"Истек срок действия подарочного сертификата"],[599,"Помещен в архив"],[600,"Отмена бронирования"],[650,"Номер Visa QIWI Wallet не принадлежит оператору, со счета которого производится оплата"],[651,"Платеж отменен в Мегафоне"],[652,"Платеж отменен по инициативе пользователя"],[653,"Оферта не подтверждена"],[654,"Профиль абонента блокирован"],[655,"Профиль абонента не найден"],[656,"Услуга для Вас недоступна. При возникновении вопросов обратитесь в службу сервиса по телефону 0500 (звонок бесплатный)"],[657,"Ошибка при проверке платежеспособности в банке"],[658,"Ошибка при запросе баланса у оператора"],[659,"Ошибка при запросе информации о клиенте у оператора"],[660,"Не удалось списать средства со счета абонента у оператора"],[661,"Номер не поддерживается оператором"],[662,"Приём платежей приостановлен по техническим причинам"],[663,'"В структуре меню получателей платежей произошли изменения. Пожалуйста, попробуйте найти нужного получателя через пункт ""Оплата услуг"""'],[664,"Платёж отменён по истечении времени ожидания подтверждения абонентом"],[665,"Не соблюдены ограничения на платеж"],[666,"Запрещено использование услуги. Пожалуйста, обратитесь в информационно-справочную службу Мегафон по телефону 0500 (звонок бесплатный)"],[667,"Оператор отказал в списании средств со счета абонента"],[668,'"Не активирована услуга ""Возврат средств на счет ПЦ"""'],[700,"Превышен лимит на платежи"],[701,"Превышен лимит на сумму операций за месяц для неидентифицированного пользователя"],[750,"Ошибка платежа"],[751,"Оплата со счета МТС с вашего номера недоступна"],[752,"Одновременно можно проводить только 1 платеж со счета МТС"],[753,"Неверный источник платежа"],[754,"Система приема платежей в МТС временно не доступна. Пожалуйста, повторите платеж позже."],[755,"Перевод на эту карту невозможен"],[756,"Превышен суточный лимит по количеству платежей"],[757,"Превышен установленный лимит по количеству платежей"],[758,"В ФИО плательщика недопустимые символы"],[759,"Возврат по этой карте невозможен"],[760,"CVV2 не заполнен либо введен неверно"],[761,"Превышен установленный лимит по сумме от 1 отправителя"],[762,"Превышен установленный лимит по сумме на 1 получателя"],[763,"Превышен суточный лимит по количеству платежей от 1 отправителя"],[764,"Превышен суточный лимит по количеству платежей на 1 получателя"],[765,"Превышен установленный лимит по количеству платежей на 1 получателя"],[766,"Превышен установленный лимит по количеству платежей от 1 отправителя"],[767,"Превышен суточный лимит по сумме на 1 отправителя"],[768,"Превышен суточный лимит по сумме на 1 получателя"],[769,"Оплата с банковской карты недоступна при данном типе входа"],[770,"Процессинг банка эмитента карты недоступен. Попробуйте выполнить операцию позднее"],[771,"Отправка реквизитов карты доступна только 1 раз в день."],[772,"Устаревшая версия клиентского приложения"],[773,"Принято неправильно зашифрованное сообщение."],[774,"Пользователь временно заблокирован"],[775,"Ошибка при регистрации терминала"],[776,"Ошибка допинформации платежа"],[777,"Невозможно выполнить операцию. Одноразовый пароль."],[778,"Невозможно выполнить операцию. Неодноразовый пароль."],[779,"Персона временно заблокирована. 10 неудачных попыток пароля."],[780,"Проведение платежа запрещено СБ"],[781,"Одинаковые номера терминальной транзакции в пакете"],[782,"Превышена максимальная сумма оплаты для терминала"],[783,"Недопустимая дополнительная комиссия"],[784,"Обработано РИК"],[785,"Обрабатывается РИК"],[786,"Документ проверен ОСМП"],[787,"Невозможно отправить в РИК"],[788,"Платеж на шлюз без комиссии ОСМП"],[789,"Ошибка при блокировке баланса"],[790,"Запрещенный запрос"],[791,"Платеж обработан банком"],[792,"Ошибка обработки платежа банком"],[793,"Отсутствуют необходимые данные для обработки платежа"],[794,"Невозможно отправить платеж в банк"],[795,"Платеж обрабатывается банком без проверки статуса"],[796,"Обрабатывается банком"],[797,"Платеж отменен. Сумма платежа возвращена на Ваш Visa QIWI Wallet."],[798,"Платёж отменён через отдел отмен"],[799,"Нет подтверждения от Мегафона"],[800,"Номер постановления не найден"],[801,"Для указанных ИНН и ОКАТО не найдены реквизиты платежа"],[802,"Игра не найдена"],[803,"Не удалось сверить стоимость билета"],[804,"Не удалось купить билет"],[805,"Код подтверждения не применим для этой карты"],[806,"Превышено количество попыток ввода информации по данному платежу"],[807,"Номер брони не найден."],[808,"Невозможно оплатить бронь, стоимость которой указана не в рублях."],[809,"Платеж не завершен"],[810,"Оплата принята Аэрофлотом, однако билет не был выпущен. Обратитесь в отделение Аэрофлота."],[811,"Уже есть активная карта"],[812,"Нельзя получить данные документа по этому платежу"],[813,"Нельзя получить данные документа по этому платежу. Для новых платежей документ станет доступен на следующий рабочий день"],[814,"Не заполнен или неверен номер(формат) телефона получателя"],[815,"Нет подтверждения платежа от мобильного оператора."],[816,"Не удалось получить адрес для подтверждения платежа в банке (ошибка банка)."],[817,'"Ваш заказ не может быть оплачен. Обратитесь в службу бронирования ОАО ""Аэрофлот"""'],[818,'"Время оплаты заказа истекло. Обратитесь в службу бронирования ОАО ""Аэрофлот"""'],[819,"Истекло время жизни счета"],[820,"Удаляемый избранный платёж не соответствует агенту"],[821,"Платеж с указанной валюты запрещен"],[822,"Указанная валюта не найдена"],[850,"Платеж с использованием заемных средств не найден или отменен"],[851,"Пополнение отменено, т.к. платеж не прошел"],[860,"Требуется пароль"],[861,"Неверный код активации"],[862,"Истек срок действия авторизации"],[863,"Исчерпано количество попыток ввода кода активации"],[864,"Не найден курс для указанной валюты."],[888,"Ведутся технические работы, повторите запрос позже"],[889,"Перевод не существует"],[890,"Неверный старый пароль"],[891,"Код активирован отправителем"],[892,"В связи с совершенствованием систем безопасности просим пройти авторизацию, следуя подсказкам приложения. Телефон call-центра 8 (800) 555-74-94"],[893,"Срок действия перевода истек"],[894,"Токен не активен"],[895,"Код отсутствует или уже активирован"],[896,"Карта уже активирована"],[897,"Не заполнено кодовое слово"],[898,"Не указан период, за который выполняется оплата"],[900,"Исчерпан лимит попыток ввода подтверждающего кода"],[901,"Истек срок действия подтверждающего кода"],[902,"Не удалось инициировать оплату с подтвеждением по SMS"],[903,"Неверный код подтверждения"],[904,"Код для пересылки недействителен"],[905,"Пожалуйста, дождитесь СМС сообщения"],[906,"Токен заблокирован"],[907,"Приложение не зарегистрировано"],[908,"Приложение заблокировано"],[909,"Неверный токен авторизации"],[910,"Пользователь уже имеет подписку"],[911,"Указанная карта была удалена. Обновите список карт."],[912,"Ошибка выполнения операции на стороне KAV."],[913,"Нельзя повторно активировать подписку"],[914,"Нельзя продлить отмененную либо неограниченную подписку"],[915,"Подписка уже отменена"],[916,"Подписка на этот продукт не доступна"],[917,"Подписка не найдена"],[918,"Нельзя изменить условия подписки сейчас, так как подписка уже оплачена до конца текущего месяца, Повторите запрос в начале следующего месяца."],[919,"Для этой подписки сейчас выполняется другая команда. Повторите запрос позже."],[920,"Указанный БИК не найден."],[921,"Данный способ оплаты для этого провайдера недоступен."],[922,"Срок подписки должен быть не менее 28 дней"],[923,"Внимание! Данный Банк-получатель не является участником системы срочных платежей (БЭСП). Пожалуйста, выберите выше Тип  «Обычный платеж» "],[924,"Внимание! Срочное исполнение платежа возможно по рабочим дням c 9-30ч. до 20-30 ч. по московскому времени. Пожалуйста, выберите выше Тип «Обычный платеж», или воспользуйтесь услугой позже."],[925,"Запрос принят и будет выполнен позже. Посмотрите результат выполнения в отчетах через несколько минут"],[926,"Невозможно совершить перевод на собственный номер"],[927,"Кошелька WebMoney не существует, заблокирован, либо не имеет требуемый уровень идетефикации"],[928,"Привязка WebMoney не найдена либо разорвана"],[929,"Пользователю не позволяется проводить одновременно больше одной операции пополнения счета/карты"],[930,"Перевод по указанным реквизитам временно не возможен"],[931,"По сообщению МЦИ Банка России платеж на данный счет временно невозможен"],[932,"Пользователь не настроил списание по доверию"],[933,"Недостаточно средств на балансе WebMoney"],[934,"сервис недоступен в стране пользователя"],[935,"Не закончена текущая операция по данной карте"],[936,"Операции с данным Электронным Билетом запрещены"],[937,"Сумма комиссии неверна"],[938,"Недопустимая валюта платежа"],[939,"Неверный код подтверждения. Проверьте введенные данные и повторите запрос"],[940,"Неверный код подтверждения. "],[941,"SMS с PIN-кодом можно запрашивать не чаще 1 раза в неделю"],[942,"Приложению с указанным CLIENT_TYPE запрещено получения кода авторизации через сервлет"],[999,"Неверный код авторизации"],[1e3,"Оплата с выбранного баланса не доступна"],[1001,"Провайдер не поддерживает указанную валюту"],[1002,"Отсутствует валютный счет, с которого производится оплата"],[1003,"Не удалось получить курс конвертации для данной пары валют"],[1004,"Не удалось создать баланс в выбранной валюте"],[1005,"Слишком большое количество сообщений, отправленных на конкретное устройство. Повторить через некоторое время."],[1006,"Слишком много сообщений, передаваемых на сервер. Повторить через некоторое время."],[1007,"Отсутствует или некорректный registration_id. Необходимо прекратить отправку сообщений на это устройство."],[1008,"Registration_id больше не действует, например, пользователь удалил приложение или выключить уведомления. Необходимо прекратить отправку сообщений на это устройство."],[1009,"Сообщение слишком велико. Необходимо уменьшить размер сообщения."],[1010,"Ошибка CollapseKey - ключа. Неоходимо проверить CollapseKey передаваемый в запросе."],[1011,"Ошибка в адресных реквизитах отправителя"],[1012,"Недопустимое ФИО плательщика, разрешены только буквы (в одной языковой раскладке), дефис"],[1013,"Недопустимое ФИО плательщика, разрешены только буквы (в одной языковой раскладке), знак дефиса"],[1014,"Платеж не может быть обработан. Ошибка при обработки реквизитов платежа"],[1015,"Отсутствует идентификатор задолженности в запросе"],[1016,"Превышена длина поля Кем выдан документ"],[1017,"Платёж приложению на данного провайдера запрещён"],[1018,"Пул номеров страны не активен"],[1019,"Не найден пул номеров"],[1020,"На счет в данной валюте платеж с привязанной карты не доступен"],[1021,"Ограничение на исходящие платежи"],[1022,"Пополнение чужого номера запрещено"],[1023,"Пользователь уже является бетта-тестером."],[1024,"Операция с указанным идентификатором уже зарегистрирована ранее"],[1025,"Нельзя отменить счет,так как пользователь уже начал его оплачивать"],[1026,"Истекло время ожидания ответа о резервировании д/с абонента"],[1027,"Старый пароль совпадает с новым"],[1028,"Ошибка данных запроса, не задан интерфейс"],[1029,"Отсутствует привязанный e-mail."],[1030,"Использование привязанного e-mail отключенно."],[1031,"Неверный код подтверждения."],[1032,"E-mail уже привязан."],[1033,"Код принадлежит другому пользователю."],[1034,"Истёк срок действия кода"],[1035,"Код устарел (использован один из предыдущих кодов)."],[1036,"Неверный формат e-mail."],[1037,"Использован код подтверждения, созданный для другого действия."],[1038,"Требуется e-mail подтверждение."],[1039,"Баланс с данной валютой отсутствует."],[1300,"Невозможно привязать данный WM-кошелек"],[1301,"Временно нельзя привязать данный WM-кошелек"],[1302,"Карта не найдена"],[1303,"Карта не активна"],[1304,"Не удалось списать деньги за первый платеж. Кредит отклонен."],[1305,"Код ОКТМО отсутствует в перечне"],[1306,'"По тех.причинам ""пополнение счета""  недоступно. Для совершения платежа выберите ""погашение кредита"" или ""пополнение карты"""'],[1307,'"Неверно указан счет. Для пополнения Visa QIWI Wallet воспользуйтесь разделом ""Перевод"""'],[1308,"В месяц допускается выпуск не более 2х карт QVC"],[1309,"Достигнут предел количества карт QVC"],[1310,"Срок действия карты указан неверно"],[1311,"Тип карты не указан или указан неверно"],[1312,"Ф.И.О. держателя карты не указано или указано неверно"],[1401,"Проблема с данными при распознавании квитанции."],[1402,"Невозможно удалить задание по распознаванию квитанции. Повторить через некоторое время."],[1403,"При обработке изображения произошла внутренняя программная ошибка."],[1404,"Проблема с форматом загруженного файла."],[1405,"Операция неуспешна. Попробуйте другой банкомат"],[1406,"Платеж отменен по инициативе пользователя"],[1407,"Неверный код страны в платеже"],[1408,"Акция завершена"],[1409,"Пользователь уже участвовал в акции"],[1410,"Параметры для считывания и записи файла неопределены"],[1411,"Ошибка в формировании строки"],[1412,"Неопределённый тип строки"],[1413,"Данные еще не получены. Повторите ввод."],[1414,"Карта не активирована"],[1415,"Нельзя совершить платеж на данного провайдера с данного источника."],[1416,"Неверны последние четыре цифры документа. Проверьте введенные данные и повторите запрос"],[1417,"Превышено количество попыток завершения идентификации. Заявка на идентификацию удалена"],[1418,"Ошибка в заполнении Ф.И.О."],[1419,"Нельзя изменить данные счета - он уже оплачивается либо оплачен."],[1420,"Ошибка обработки запроса"],[1421,"Срок действия PIN-кода истек. Новый PIN-код выслан в SMS"],[1777,"Платеж отменен"],[1778,"Платеж отменен"],[1779,"Не найдена транзакция по correlationID"],[1780,"Ошибка добавления записи в таблицу"],[1781,"Не найден файл в исходной папке"],[1782,"Ошибка считывании строки в исходном файле"],[1783,"Ошибка преобразования или проверки суммы в исходном файле"],[1784,"Ошибка удаления файла из исходной папки"],[1800,"Нельзя активировать карту: в QIWI Wallet может быть до 5 активных QVP"],[1801,"Нельзя приобрести карту: в Visa QIWI Wallet может быть до 5 активных QVP"],[1802,"Платёж отменён."],[2001,"Некорректно определён возвращаемый формат сообщения"],[2002,"Запрещено передавать параметры в URL, при POST запросах"],[2003,"Отсутствует метод обработки запроса"],[2004,"Ошибка при обработке параметров адресной строки"],[2005,"Ошибка при обработке параметров"],[3e3,"Требуется подтверждение со стороны пользователя с вводом кода (смс, email, ...)"],[4001,"deprecated"],[4006,"Операция запрещена для данного филиала"],[4007,"Невозможно принять запрос, повторите попытку позже"],[4008,"Реестр еще не сформирован"],[4009,"Превышено количество подключений"],[4010,"Сбой на стороне оператора"],[4011,"Операция запрещена оператором"],[4012,"Невозможно создать заявку на идентификацию"],[4013,"Провайдер не является мультивалютным"],[5e3,"Нельзя блокировать самого себя. ishop2"],[5001,"Пользователя с данным логином не существует. ishop2"],[5002,"Введен неверный email. ishop2"],[5003,"Введен неверный старый пароль. ishop2"],[5004,"Слишком простой новый пароль. ishop 2"],[5005,"Объект не найден, либо недостаточно прав доступа ishop 2"],[5006,"Несовместимые типы провайдера и контракта ishop 2"],[5007,"Данные для составления отчета неполны либо несовместимы между собой ishop 2"],[5008,"Данные для создания настроек протокола не полны либо имеют ошибочный формат ishop 2"],[5009,"Нельзя установить настройки протокола провайдеру, если они не были заморожены ishop 2"],[5010,"Нельзя редактировать замороженные настройки протокола ishop 2"],[5011,"Пароль технического пользователя слишком простой ishop 2"],[5012,"Неверные параметры для создания привязки технического пользователя к провайдеру ishop 2"],[5013,"Недостаточные или протеворечивые параметры поиска привязок технических пользователей к провайдерам ishop 2"],[5014,"Пользователь с данным email уже зарегистрирован ishop 2"],[5015,"Данные для поиска ежемесячных отчетов партнера указаны не полностью, либо протеворечивы ishop 2"],[5016,"Нельзья отменить одобрение или отклонение ежемесячного отчета партнера ishop 2"],[5017,"Телефон имеет неверный формат или номерная емкость не поддерживается ishop 2"],[5018,"Невозможно провести операцию по установке роли пользователя партнера ishop 2"],[5019,"Невозможно удалить самого себя ishop 2"],[5020,"Пользователь с данным email уже зарегистрирован ishop 2"],[5021,"Регистрационные данные не полны либо протеворечивы ishop 2"],[5022,"Данные для создания или изменения реестра по провайдеру не полны либо протеворечивы ishop 2"],[5023,"Данный реестр уже существует ishop 2"],[5024,"Магазин не имеет привязанного телефона для sms-подтверждений."],[5025,"Магазин уже имеет привязанный телефон для sms-подтверждений, нельзя привязать другой, не отвязав имеющийся."],[5026,"Пользователем введены некорректные данные ishop 2"],[5101,"Недопустимый email адрес"],[5102,"Неверная сумма комиссии"],[5103,"Неверный промо-код"],[5104,'" Для использования промо-кода необходимо выбрать режим доставки через ""Почту России"" "'],[5105,'"Введенный номер телефона не зарегистрирован в системе «Московский паркинг». Для регистрации отправите SMS с командой ""И"" на номер 7757"'],[5106,"Исходный платеж не найден"],[5107,"Платеж отменен ранее"],[5108,"Возврат на данный платеж не приходил"],[5109,"Карта заблокирована из-за неверных анкетных данных. Обратитесь в support@qiwi.ru"],[5110,"Проверьте номер парковочной зоны"]]}}]),_class}()))}}});