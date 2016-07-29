mocha.setup('bdd');
var assert = chai.assert;
var expect = chai.expect;


describe("Проверка Index", function () {
    describe( " Функция удаления ключей из Local Storage ", function () {
        it("Возвращает True  ", function (){
            expect(locStorDel()).to.be.true;
            });

        });

        describe( " Список Хобби ", function () {
        it("Возвращает массив  ", function (){
            expect(divText()).to.be.an('Array');
            });

            it("Массив не пустой", function (){
                expect(divText()).to.not.empty;
            });

        });

    });
