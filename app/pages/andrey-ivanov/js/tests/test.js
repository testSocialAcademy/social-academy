mocha.setup("bdd");
var assert = chai.assert;
var expect = chai.expect;



describe("Результаты тестирования", function () {
    describe("getHobby()", function() {
        it("Функция возвращает массив", function (){
            expect(getHobby()).to.be.a('Array');
        });
        it("Функция возвращает массив", function (){
            expect(getHobby()).to.not.be.a('String');
        });

        it("Длина массива равная семи", function (){
            expect(getHobby().length).to.be.equal(7);
        });
    });

    describe("loadNews()", function() {
        it("Массив передан", function (){
            expect(loadNews()).to.not.be.false;
            });
        it("Массив не пустой", function (){
            expect(loadNews([])).to.not.be.false;
        });
        it("Массив не строка", function (){
            expect(loadNews("string")).to.not.be.false;
        });
    });
    describe("newsDisplay(respText)", function() {
        it("Массив аргументов", function (){
            function newsDisplay(respText) {
                expect(respText).to.be.arguments;
            }
        });
    });
});







//mocha.run                                                                                                                                                                                                                                                                                                              