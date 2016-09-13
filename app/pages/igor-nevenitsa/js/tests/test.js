mocha.setup('bdd');
var assert = chai.assert;
var expect = chai.expect;


describe("Проверка Index", function () {
    describe( " Функция вытягивания ключей из Local Storage ", function () {
        it("Возвращает Undefinded  ", function (){
            expect(locStorStart_IN()).to.be.an('Undefined');
        });
    });


        describe( " Список Хобби ", function () {
        it("Возвращает массив  ", function (){
            expect(divText_IN()).to.be.an('Array');
            });

            it("Массив не пустой", function (){
                expect(divText_IN()).to.not.empty;
            });
        });


});

