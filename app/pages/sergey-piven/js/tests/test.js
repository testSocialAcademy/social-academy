describe('scripts for index page', function () {

    describe('pow', function () {

        function makeTest(x) {
            var expected = x * x * x;

            it('при возведении x в 3 степень результат:' + expected, function () {
                assert.equal(pow(x, 3), expected);
            });
        }

        for (var x = 1; x <= 5; x++) {
            makeTest(x);
        }
        it('при возведении в отрицательную степень результат NaN', function () {
            assert(isNaN(pow(2, -1)));
        });
        it('при возведении в дробную степень результат NaN', function () {
            assert(isNaN(pow(2, 1.5)));
        });

        it('при возведении 3 в 4 = 81', function () {
            assert.equal(pow(3, 4), 81);

        });

        describe('check Alpha', function () {
            it('should return true when the string has numeral', function () {
                expect(checkNonAlpha(213)).to.be.true;
            });
        });

        /* describe('check length', function () {
         it('should return true when the length has 8 and more elements', function () {
         expect(checkTooLong('ssssssssss')).to.have.length.of.at.least(8);
         });
         });*/

        describe('check first letter', function () {
            it('should return true ', function () {
                (checkFirstLetterNotUppercase(''))
            });
        });


        /*    describe('addtion', function (){
         it ('find addition between two parameters', function () {
         /!* var mock = sinon.spy(object, 'method2');
         object.method(2);

         expect(mock).to.have.been.calledOnce;*!/

         var result= sinon.stub(JQuery,'ajax').returns ({farr:'cry'});
         });
         })*/
    });
});