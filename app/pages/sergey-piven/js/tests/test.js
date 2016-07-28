var expect = chai.expect;

describe("Results", function () {
    describe("setHobbiesInterests()", function () {
        it("Returns array", function () {
            expect(setHobbiesInterests()).to.be.an('Array');
        });
    });
});

describe("displayNews(json)", function() {
    it("If there is no argument, returns false", function (){
        expect(displayNews()).to.be.false;
    });
    it("If argument is a string, returns false", function (){
        expect(displayNews("blabla")).to.be.false;
    });
    it("If argument is a number, returns false", function (){
        expect(displayNews(123)).to.be.false;
    });
});
