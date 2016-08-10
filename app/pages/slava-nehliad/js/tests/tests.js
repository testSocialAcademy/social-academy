describe ("scripts for index page", function () {
    
    describe("test loadNews() function", function () {
        it("first test", function () {
            assert.isNotOk(loadNews());
        });
    });
    
    describe("test loadNews() function", function () {
        it("second test", function () {
            assert.isUndefined(loadNews());
        });
    });

    
    describe("test showHobby() function", function () {
        it("first test", function () {
            assert.isTrue(showHobby());
        });
    });
});




