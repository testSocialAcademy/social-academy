var expect = chai.expect;

describe("Results", function () {
    describe("setHobbiesInterests()", function () {
        it("Returns array", function () {
            expect(setHobbiesInterests_sp()).to.be.an('Array');
        });
    });
});

describe("displayNews(json)", function() {
    it("If there is no argument, returns false", function (){
        expect(displayNews_sp()).to.be.false;
    });
    it("If argument is a string, returns false", function (){
        expect(displayNews_sp("blabla")).to.be.false;
    });
    it("If argument is a number, returns false", function (){
        expect(displayNews_sp(123)).to.be.false;
    });
});