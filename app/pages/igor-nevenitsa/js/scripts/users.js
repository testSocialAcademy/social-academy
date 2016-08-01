
    //----------------  get

     function usersReq(link) {
         var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
         var xhr = new XHR();
         var responseObject;
        xhr.open('GET', link, false);
        xhr.onload = function() {
            responseObject = JSON.parse(this.responseText).results;
        };
        xhr.onerror = function() {
            alert( 'Ошибка ' + this.status );
            responseObject = null;
        };
        xhr.send();

        return responseObject;
    }



    function Users() {
        var _this = this;
        this._users = null;

        this.getUsers = function(usersSource) {
            var response;

            response = usersReq(usersSource);
            if (typeof response != 'object') {
                alert('Didn"t get Users!');
            } else {
                _this._users = response;
            }
        };
    }

