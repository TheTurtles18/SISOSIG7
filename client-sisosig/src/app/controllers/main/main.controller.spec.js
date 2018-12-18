(function () {
    'use strict';

    describe('Main Controller', function () {
        var controller;

        beforeEach(module('main-app'));

        beforeEach(inject(function (_$rootScope_, _$controller_) {
            controller = _$controller_('MainController', {
                $scope: _$rootScope_.$new()
            });
        }));


        it('should be defined', function(){
            expect(controller).not.to.equal(null);
        });
    });
})();