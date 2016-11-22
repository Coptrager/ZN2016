(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
        },

        paint: function () {
            if (typeof this.paySession.payInfo.id === 'string') {
                maratl.testId(this.paySession.payInfo.id, delegate(this, function () {
                    UI.loadFile.config('./config/' + this.paySession.payInfo.id + '.js', delegate(this, function (err, cfg) {
                        if (err) return this.error({ type: 'cantLoadFile', additional: { fileName: err.file } });
                        var config = guiConfig(cfg),
                            pay = config.getPayData();
                        if (pay.id == this.paySession.payInfo.id) {
                            processProvider.call(this, config, pay);
                        } else {
                            maratl.testId(pay.id, delegate(this, function () {
                                processProvider.call(this, config, pay);
                            }), delegate(this, showMessageDeny));
                            emulator.start('test_provider_id');
                        }
                    }));
                }), delegate(this, showMessageDeny));
                emulator.start('test_provider_id');
            }
            else {
                this.error({ type: 'interfaceError', userText: 'отсутствует id провайдера' });
            }

            function showMessageDeny() {
                this.next('error', { sessionInfo: { errorInfo: { userText: 'Прием платежа для данного провайдера запрещен' } } });
            }

            function processProvider(config, pay) {
                if (config.isCellular()) {
                    this.pageConfig.skip = true;
                    this.next('cellular');
                } else if (config.isTag('rostelecom')) {
                    this.pageConfig.skip = true;
                    this.next('rostelecom', {});
                }  else if (config.prvPage.length) {
                    pay.id = config.id;
                    maratl.sendPay(pay);
                    storage.set('provider', config.id);
                    this.exitToCustomPage(config.prvPage);
                } else if (config.isTag('charity')) {
                    this.pageConfig.skip = true;
                    this.next('charity', { payInfo: { config: config } });
                } else {
                    this.pageConfig.skip = true;
                    this.next('input', { payInfo: { config: config } });
                }
            }
        }
    });
});