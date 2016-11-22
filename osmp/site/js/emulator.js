window.emulator = {
    active: true,
    timers: [],
    start: function (page) {
        if (this.active)
            switch (page) {
                case 'zero':
                    this.timers.push(setTimeout(function () {
                        mset('PrtStatus', '');
                        mset('TermID', '12345678');
                    }, 100));
                    break;
                case 'index':
                    this.timers.push(setTimeout(function () {
                        mset('SupportPhone', 'qqqqqqq wwwwwwwwwwww eeeeeeeeeeeee rrrrrrrrrr');
                    }, 200));
                    break;
                case 'test_provider_id':
                    this.timers.push(setTimeout(function () {
                        mset('PrvAllow', 'true');
                    }, 100));
                    break;
                case 'cellular':
                    this.timers.push(setTimeout(function () {
                        mset('getProviderByPhone', '{"result":0, "providerId": 3}');
                    }, 1000));
                    break;
                case 'provider_online':
                    this.timers.push(setTimeout(function () {
                        mset('OnlineResponse', '{"resultCode":0, "fields":{ "disp1": "qwe" }}');
                    }, 1000));
                    break;
                case 'pay_init':
                    //this.timers.push(setTimeout(delegate(this, function () {
                    //    mset('system.getforbiddenbanknotes', '[{"value": 500}]'); // 
                    //    mset('MinCash', '20');
                    //    mset('MaxCash', '10000');
                    //    mset('CommissionsInfo', '[{"commissionInfo" : [{"commissionFix" : 0.0,"commissionMax" : "inf","commissionMin" : 0.0,"commissionPercent" : 4.0,"fromAmount" : 0.0,"toAmount" : 5},{"commissionFix" : 0.0,"commissionMax" : "inf","commissionMin" : 0.0,"commissionPercent" : 6.0,"fromAmount" : 5.0,"toAmount" : 10}, {"commissionFix" : 0.0,"commissionMax" : "inf","commissionMin" : 0.0,"commissionPercent" : 8.0,"fromAmount" : 10,"toAmount" : 100}, {"commissionFix" : 0.0,"commissionMax" : "inf","commissionMin" : 0.0,"commissionPercent" : 8.0,"fromAmount" : 100.0,"toAmount" : "inf"}],"providerId" : 40042},{"commissionInfo" : [{"commissionFix" : 0.0,"commissionMax" : "inf","commissionMin" : 0.0,"commissionPercent" : 8.0,"fromAmount" : 0.0,"toAmount" : "inf"}],"providerId" : 7406},{"commissionInfo" : [{"commissionFix" : 0.0,"commissionMax" : "inf","commissionMin" : 0.0,"commissionPercent" : 8.0,"fromAmount" : 0.0,"toAmount" : "inf"}],"providerId" : "3"}]');
                        
                    //    mset('NominalCommissionInfo', 'type_coin;nominal_0.05;percent_3|type_coin;nominal_0.5;percent_0|type_coin;nominal_0.01;percent_0|type_coin;nominal_0.1;percent_0|type_coin;nominal_1;percent_0|type_coin;nominal_5;percent_0|type_coin;nominal_10;percent_0|type_coin;nominal_2;percent_0');
                    //}), 200));
                    this.timers.push(setTimeout(delegate(this, function () {
                        mset('ValOn', 'false'); // 
                    }), 200));
                    this.timers.push(setTimeout(function () {
                        mset('CashSumm', '10');
                        mset('PaySumm', '9');
                        mset('PaySumm2', '99');
                        mset('CommisSumm', '1');
                        mset('CommisSumm2', '11');
                        mset('CommProfileLine', '1');
                        mset('NominalCommissionInfo', 'TotalAmount:50.00|DetailInfo:nominal_10.00;type_bill;count_1;percent_0.00;amount_0.00|TotalCommAmount:1.00');
                    }, 1000));
                    break;
                case 'pay_exit':
                    this.timers.push(setTimeout(delegate(this, function () {
                        mset('DeficientAmountResult', 'руб,0');
                    }), 100));
                    this.timers.push(setTimeout(function () {
                        mset('CashSumm', '20');
                        mset('PaySumm', '18');
                        mset('CommisSumm', '2');
                    }, 1000));
                    break;
                case 'pay_fiscal':
                    this.timers.push(setTimeout(delegate(this, function () {
                        mset('FiscalReceipt', 'wait');
                    }), 100));
                    this.timers.push(setTimeout(delegate(this, function () {
                        mset('FiscalReceipt', 'true');
                        mset('PaySuccess', 'true');
                    }), 5000));
                    break;
                case 'search_list':
                    this.timers.push(setTimeout(function () {
                        mset('SearchProviders', '1|Российский фонд помощи^Российский фонд помощи|1712762880870662855|visible,charity;2389|РОЗА ВЕТРОВ.Турист^РОЗА ВЕТРОВ|rozavetrovtur.gif|visible,change;47826|РОШАЛЬ ОНЛАЙН|internet.gif|commissions,freepayment,visible,allow_freepay_provider_by_root_agent,freepay_test,custom;5031|Российский Красный Крест КРО^Российский Красный Крест|prv5031_a683bb68.gif|charity;818|Росинтел|rosintel.gif|quasi-online;5105|РОЛ.WIFI^оплата услуг WIFI|prv5105_1fe3e2c0.gif|visible;3442|Росмобайл|prv3442_pic.gif|visible;4839|Росреестр|prv4839_62849325.gif|visible,НЕ_ДЛЯ_РИ_light;10672|Росток^Росток|prv10672_f559affa.gif|;3294|РОССЕЛЬХОЗБАНК^Россельхоз банк|rosselhoz.gif|visible,НЕ_ДЛЯ_РИ_light,Disable_retxn_prv_group;5802|Российский Красный Крест МГО^Российский Красный Крест МГО|prv5802_61e7105f.gif|visible,charity;8895|РосХостер^РосХостер|prv8895_c7e67d8b.gif|;3288|РОСБАНК^Росбанк|rosbank.gif|visible,НЕ_ДЛЯ_РИ_light,Disable_retxn_prv_group;11485|Ростелеком Домашние услуги|3421171406437462570|visible;1|Российский фонд помощи^Российский фонд помощи|1712762880870662855|visible,charity;2389|РОЗА ВЕТРОВ.Турист^РОЗА ВЕТРОВ|rozavetrovtur.gif|visible,change;47826|РОШАЛЬ ОНЛАЙН|internet.gif|commissions,freepayment,visible,allow_freepay_provider_by_root_agent,freepay_test,custom;5031|Российский Красный Крест КРО^Российский Красный Крест|prv5031_a683bb68.gif|charity;818|Росинтел|rosintel.gif|quasi-online;5105|РОЛ.WIFI^оплата услуг WIFI|prv5105_1fe3e2c0.gif|visible;3442|Росмобайл|prv3442_pic.gif|visible;4839|Росреестр|prv4839_62849325.gif|visible,НЕ_ДЛЯ_РИ_light;10672|Росток^Росток|prv10672_f559affa.gif|;3294|РОССЕЛЬХОЗБАНК^Россельхоз банк|rosselhoz.gif|visible,НЕ_ДЛЯ_РИ_light,Disable_retxn_prv_group;5802|Российский Красный Крест МГО^Российский Красный Крест МГО|prv5802_61e7105f.gif|visible,charity;8895|РосХостер^РосХостер|prv8895_c7e67d8b.gif|;3288|РОСБАНК^Росбанк|rosbank.gif|visible,НЕ_ДЛЯ_РИ_light,Disable_retxn_prv_group;11485|Ростелеком Домашние услуги|3421171406437462570|visible;');
                    }, 1));
                    break;
                case 'search_empty':
                    this.timers.push(setTimeout(function () {
                        mset('SearchProviders', '');
                    }, 1));
                    break;
                case 'info_details_load':
                    this.timers.push(setTimeout(function () {
                        mset('ProvList', '<records AllProvData="1"><record sName="МТС " jName="ОАО &quot;Мобильные ТелеСистемы&quot;" jDocNum="2599/03" jDocDate="18.07.2003" supportPhone="8-800-250-0890, узнай баланс *100#"/><record sName="Билайн " jName="ОАО &quot;Вымпел-Коммуникации&quot;" jDocNum="06782/08" jDocDate="30.06.2008" supportPhone="0611. Оплатили не на тот номер - звоните 0611. Баланс: *102#"/><record sName="МегаФон Столичный филиал" jName="ОАО &quot;МегаФон&quot; Столичный филиал" jDocNum="25/08-10" jDocDate="01.09.2010" supportPhone="8-800-550-70-95, узнай баланс *100#"/><record sName="Матрикс Телеком" jName="ООО &quot;Матрикс Телеком&quot;" jDocNum="053/04" jDocDate="14.04.2004" supportPhone="(495) 544 55-55"/><record sName="Зебра Телеком (баланс)" jName="ЗАО &quot;Зебра Телеком&quot;" jDocNum="06/2009-ВК" jDocDate="10.10.2014" supportPhone="(800)100-17-50"/><record sName="НТВ +" jName="ОАО &quot;НТВ-Плюс&quot;" jDocNum="Н-ДУ-060802-ЖАО-01" jDocDate="07.08.2002" supportPhone="8 (495) 755-67-89, 8 (495) 755-56-69"/><record sName="МегаФон Северо-Западный филиал" jName="ОАО &quot;МегаФон&quot; Северо-Западный филиал" jDocNum="25/08-10" jDocDate="01.09.2010" supportPhone="8-800-550-70-95, узнай баланс *100#"/><record sName="МегаФон Сибирский филиал" jName="ОАО &quot;МегаФон&quot; Сибирский филиал " jDocNum="25/08-10" jDocDate="01.09.2010" supportPhone="8-800-550-70-95, узнай баланс *100#"/><record sName="СкайЛинк Москва" jName="ОАО Московская Сотовая Связь" jDocNum="07/003/06" jDocDate="16.03.2006" supportPhone="8(495)973-73-73"/><record sName="МегаФон Кавказский филиал" jName="ОАО &quot;МегаФон&quot; Кавказский филиал " jDocNum="25/08-10" jDocDate="01.09.2010" supportPhone="8-800-550-70-95, узнай баланс *100#"/><record sName="МГТС" jName="ОАО &quot;Московская городская телефонная сеть&quot;" jDocNum="М-ДА-060904-ПАВ-01/13767" jDocDate="22.10.2004" supportPhone="8(495)636-0-636"/><record sName="МТС " jName="ОАО &quot;Мобильные ТелеСистемы&quot;" jDocNum="2599/03" jDocDate="18.07.2003" supportPhone="8-800-250-0890, узнай баланс *100#"/><record sName="Билайн " jName="ОАО &quot;Вымпел-Коммуникации&quot;" jDocNum="06782/08" jDocDate="30.06.2008" supportPhone="0611. Оплатили не на тот номер - звоните 0611. Баланс: *102#"/><record sName="МегаФон Столичный филиал" jName="ОАО &quot;МегаФон&quot; Столичный филиал" jDocNum="25/08-10" jDocDate="01.09.2010" supportPhone="8-800-550-70-95, узнай баланс *100#"/><record sName="Матрикс Телеком" jName="ООО &quot;Матрикс Телеком&quot;" jDocNum="053/04" jDocDate="14.04.2004" supportPhone="(495) 544 55-55"/><record sName="Зебра Телеком (баланс)" jName="ЗАО &quot;Зебра Телеком&quot;" jDocNum="06/2009-ВК" jDocDate="10.10.2014" supportPhone="(800)100-17-50"/><record sName="НТВ +" jName="ОАО &quot;НТВ-Плюс&quot;" jDocNum="Н-ДУ-060802-ЖАО-01" jDocDate="07.08.2002" supportPhone="8 (495) 755-67-89, 8 (495) 755-56-69"/><record sName="МегаФон Северо-Западный филиал" jName="ОАО &quot;МегаФон&quot; Северо-Западный филиал" jDocNum="25/08-10" jDocDate="01.09.2010" supportPhone="8-800-550-70-95, узнай баланс *100#"/><record sName="МегаФон Сибирский филиал" jName="ОАО &quot;МегаФон&quot; Сибирский филиал " jDocNum="25/08-10" jDocDate="01.09.2010" supportPhone="8-800-550-70-95, узнай баланс *100#"/><record sName="СкайЛинк Москва" jName="ОАО Московская Сотовая Связь" jDocNum="07/003/06" jDocDate="16.03.2006" supportPhone="8(495)973-73-73"/><record sName="МегаФон Кавказский филиал" jName="ОАО &quot;МегаФон&quot; Кавказский филиал " jDocNum="25/08-10" jDocDate="01.09.2010" supportPhone="8-800-550-70-95, узнай баланс *100#"/><record sName="МГТС" jName="ОАО &quot;Московская городская телефонная сеть&quot;" jDocNum="М-ДА-060904-ПАВ-01/13767" jDocDate="22.10.2004" supportPhone="8(495)636-0-636"/></records>');
                    }, 400));
                    break;
                case 'validatorOff_false':
                    this.timers.push(setTimeout(function () {
                        
                        mset('ValOff', 'false');
                    }, 1));
                    break;
                case 'CashSumm_10':
                    this.timers.push(setTimeout(function () {
                        mset('CashSumm', '10');
                    }, 1000));
                    break;
                case 'epa':
                    this.timers.push(setTimeout(function () {
                        mset('StatusRequest', '0');
                        /*mset('disp1', '3\tМегаФон Столичный филиал\t9263592785\t12.03.2015 18:16:10\t-10.00\t-10.00\t83\t2\t3216321667');
                        mset('disp2', '3\tМегаФон Столичный филиал\t9263592785\t12.03.2015 18:16:10\t10.00\t10.00\t83\t1\t3216321667');
                        mset('disp3', '3\tМегаФон Столичный филиал\t9263592785\t12.03.2015 18:16:10\t10.00\t10.00\t83\t3\t3216321667');
                        mset('disp4', '3\tМегаФон Столичный филиал\t9263592785\t12.03.2015 18:16:10\t10.00\t10.00\t83\t0\t3216321667');
                        mset('disp5', '3\tМегаФон Столичный филиал\t9263592785\t12.03.2015 18:16:10\t10.00\t10.00\t83\t0\t3216321667');*/
                        mset('disp11', '0');/**/
                    }, 1000));
                    break;
                case 'epa_print_check':
                    this.timers.push(setTimeout(function () {
                        mset('DublCheckSuccess', 'true');
                    }, 1000));
                    break;
            }
    },
    stop: function () {
        var timer = null;
        while (this.timers.length) {
            timer = this.timers.pop();
            clearTimeout(timer);
            timer = null;
        }
    }
};