var assert = chai.assert;
var expect = chai.expect;

describe("script for index page", function(){
    describe("check formElement", function() {
        it("should return a string when the function successfully completed", function() {
            expect(formHobbies()).to.be.a('String');
        });
    });
    describe("check displayHobbies", function() {
        it("should return 1 when hobbies were displayed", function() {
            expect(displayHobbies()).to.be.equal(1);
        });
        it("shouldn't be undefined when hobbies were displayed", function() {
            expect(displayHobbies()).to.not.be.undefined;
        });
    });
    describe("check displayNews", function() {
        it("should return false when News were not displayed", function() {
            expect(displayNews()).to.be.false;
        });
    });
    describe("check newsRequest", function() {
        it("should return undefined when request wasn't completed", function() {
            expect(newsRequest()).to.be.undefined;
        });
    });
});
