describe("RhoSync use cases", function() {


    it("is able to be initialized with models", function() {
        var okHdlr = jasmine.createSpy('for ok');
        var errHdlr = jasmine.createSpy('for errors');

        expect(rhosync.init).toBeDefined();

        var models = [
            {name: 'Product', fields: [
                {name: 'name',      type: 'string'},
                {name: 'price',     type: 'int'},
                {name: 'available', type: 'boolean', defaultValue: true}
                ]},
            {name: 'Order', fields: [
                {name: 'unmber',       type: 'int'},
                {name: 'productName',  type: 'string'},
                {name: 'customerName', type: 'string'},
                {name: 'address',      type: 'string'},
                {name: 'phone',        type: 'string'}
                ]}
        ];

        rhosync.init(models/*, 'native'*/).done(okHdlr).fail(errHdlr);

        waitsForSpies([okHdlr, errHdlr], 'RhoSync init timeout', 3000);
        runs(function(){
            expect(errHdlr).not.toHaveBeenCalled();
            if(0 < errHdlr.callCount) {
                jasmine.log('errHdlr called with:');
                jasmine.log(errHdlr.mostRecentCall.args);
            }

            expect(rhosync.rho.models).toBeDefined('models map');
            expect(rhosync.rho.engine.sources).toBeDefined('sources map');

            expect(rhosync.rho.models.Product).toBeSet('Product model');
            expect(rhosync.rho.models.Product.name).toBeSet('Product model');
            expect(rhosync.rho.engine.sources.Product).toBeSet('Product model');
            expect(rhosync.rho.engine.sources.Product.name).toBeSet('Product model');
            expect(rhosync.rho.engine.sources.Product.id).toBeGreaterThan(0);
            expect(rhosync.rho.models.Product.name).toEqual(rhosync.rho.engine.sources.Product.name);
            jasmine.log(rhosync.rho.models.Product.name +' source id = ' +rhosync.rho.engine.sources.Product.id);

            expect(rhosync.rho.models.Order).toBeSet('Order model');
            expect(rhosync.rho.models.Order.name).toBeSet('Order model');
            expect(rhosync.rho.engine.sources.Order).toBeSet('Order model');
            expect(rhosync.rho.engine.sources.Order.name).toBeSet('Order model');
            expect(rhosync.rho.engine.sources.Order.id).toBeGreaterThan(0);
            expect(rhosync.rho.models.Order.name).toEqual(rhosync.rho.engine.sources.Order.name);
            jasmine.log(rhosync.rho.models.Order.name +' source id = ' +rhosync.rho.engine.sources.Order.id);

            expect(rhosync.rho.engine.sources.Product.name).not.toEqual(rhosync.rho.engine.sources.Order.name);
            expect(rhosync.rho.engine.sources.Product.id).not.toEqual(rhosync.rho.engine.sources.Order.id);
        });
    });

    it("should login ok with proper credentials", function() {
        var okHdlr = jasmine.createSpy('for ok');
        var errHdlr = jasmine.createSpy('for errors');

        expect(rhosync.login).toBeDefined();
        expect(rhosync.isLoggedIn).toBeDefined();

        runs(function(){
            rhosync.login("lars", "larspass").done(okHdlr).fail(errHdlr);
        });

        waitsForSpies([okHdlr, errHdlr], 'login timeout');
        runs(function(){
            expect(errHdlr).not.toHaveBeenCalled();
            if(0 < errHdlr.callCount) {
                jasmine.log('errHdlr called with:');
                jasmine.log(errHdlr.mostRecentCall.args);
            }
            expect(okHdlr).toHaveBeenCalled();
            expect(rhosync.isLoggedIn()).toBeTruthy();
        });
    });

    it("should logout ok", function() {
        var okHdlr = jasmine.createSpy('for ok');
        var errHdlr = jasmine.createSpy('for errors');

        expect(rhosync.login).toBeDefined();
        expect(rhosync.isLoggedIn).toBeDefined();

        runs(function(){
            rhosync.login("lars", "larspass").done(okHdlr).fail(errHdlr);
        });

        waitsForSpies([okHdlr, errHdlr], 'login timeout');
        runs(function(){
            expect(errHdlr).not.toHaveBeenCalled();
            if(0 < errHdlr.callCount) {
                jasmine.log('errHdlr called with:');
                jasmine.log(errHdlr.mostRecentCall.args);
            }
            expect(okHdlr).toHaveBeenCalled();
            expect(rhosync.isLoggedIn()).toBeTruthy();
        });

        runs(function(){
            rhosync.logout().done(okHdlr).fail(errHdlr);
        });

        waitsForSpies([okHdlr, errHdlr], 'logout timeout');
        runs(function(){
            expect(errHdlr).not.toHaveBeenCalled();
            if(0 < errHdlr.callCount) {
                jasmine.log('errHdlr called with:');
                jasmine.log(errHdlr.mostRecentCall.args);
            }
            expect(okHdlr).toHaveBeenCalled();
            expect(rhosync.isLoggedIn()).not.toBeTruthy();
        });
    });

    it("should fail to login with wrong credentials", function() {
        var okHdlr = jasmine.createSpy('for ok');
        var errHdlr = jasmine.createSpy('for errors');

        expect(rhosync.login).toBeDefined();
        expect(rhosync.isLoggedIn).toBeDefined();

        rhosync.login("not_lars", "not_larspass").done(okHdlr).fail(errHdlr);

        waitsForSpies([okHdlr, errHdlr], 'login timeout');
        runs(function(){
            expect(okHdlr).not.toHaveBeenCalled();
            if(0 < okHdlr.callCount) {
                jasmine.log('okHdlr called with:');
                jasmine.log(okHdlr.mostRecentCall.args);
            }
            expect(errHdlr).toHaveBeenCalled();
            expect(rhosync.isLoggedIn()).not.toBeTruthy();
        });
    });

});