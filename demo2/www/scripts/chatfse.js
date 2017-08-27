window.onload = function() {
    var chatfse = new chatfse();
    chatfse.init();
};

var ChatFSE = function() {
    this.socket = null;
};

ChatFSE.prototype = {
    init: function() {
        var that = this;
        this.socket = io.connect();
        this.socket.on('connect', function() {
            document.getElementById('info').textContent = 'get yourself a nickname :)';
            document.getElementById('nickWrapper').style.display = 'block';
            document.getElementById('nicknameInput').focus();
        });
    }
};