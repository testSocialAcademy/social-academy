///////////////////////Homework 7//////////////////////////////////
var assert = chai.assert;
var expect = chai.expect;



describe("Результаты тестирования", function () {
    describe("getHobby_ai()", function() {
        it("Функция возвращает массив", function (){
            expect(getHobby_ai()).to.be.a('Array');
        });
        it("Функция возвращает массив", function (){
            expect(getHobby_ai()).to.not.be.a('String');
        });

        it("Длина массива равная семи", function (){
            expect(getHobby_ai().length).to.be.equal(7);
        });
    });

    describe("loadNews_ai()", function() {
        it("Массив передан", function (){
            expect(loadNews_ai()).to.not.be.false;
            });
        it("Массив не пустой", function (){
            expect(loadNews_ai([])).to.not.be.false;
        });
        it("Массив не строка", function (){
            expect(loadNews_ai("string")).to.not.be.false;
        });
    });
    describe("newsDisplay_ai(respText)", function() {
        it("Массив аргументов", function (){
            function newsDisplay_ai(respText) {
                expect(respText).to.be.arguments;
            }
        });
    });
});







