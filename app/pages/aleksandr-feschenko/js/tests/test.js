var assert = chai.assert;
var expect = chai.expect;

describe("А.Фещенко - Результаты тестирования", function () {
    describe("setHobbies()_af", function() {
        it("Функция возвращает массив", function (){
            expect(setHobbies_af()).to.be.an('Array');
        });
        it("Массив значений не пустой", function (){
            expect(setHobbies_af()).to.not.empty;
        });

        function makeTest(arrElem) {
            it("Элемент массива: [" + i + "] - строка", function (){
                expect(arrElem).to.be.an('String');
            });
        }
        var expected = setHobbies_af();
        for (var i = 0; i < expected.length; i++) {
            makeTest(expected[i]);
        }
    });

    describe("displayNews(arrNews)", function() {
        it("Если не передан массив новостей, возвращает false", function (){
            expect(displayNews_af()).to.be.false;
        });
        it("Если массив пустой, возвращает false", function (){
            expect(displayNews_af([])).to.be.false;
        });
        it("Если вместо массива - передана строка, возвращает false", function (){
            expect(displayNews_af("string")).to.be.false;
        });
        it("Если вместо массива - передана цифра, возвращает false", function (){
            expect(displayNews_af(1232312)).to.be.false;
        });
    });

});





