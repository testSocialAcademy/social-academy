mocha.setup("bdd");
var assert = chai.assert;
var expect = chai.expect;



describe("Результаты тестирования", function () {
    describe("getHobby()", function() {
        it("Функция возвращает массив", function (){
            expect(getHobby()).to.be.a('Array');
        });
        it("массив не пустой", function (){
            expect(getHobby()).to.be.not.empty;
        });

    });
    describe("newsDisplay(responseText)", function() {
        it("массив", function (){
           // expect(newsDisplay( )).to.be.arguments;

        });

    });

});


mocha.run();