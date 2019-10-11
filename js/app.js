window.onload = init;

function init() {
    var res = null;
    document.getElementById('send').addEventListener('click', add);

    function add() {
        var name = document.forms[0].name.value;
        var count = document.forms[0].count.value;
        var confirm = document.forms[0].confirme.checked;
        var g = { "name": name, "count": count, "confirmed": confirm };
        if (name != '') res.push(g);
        build(res, 'output');
    }

    function loadJSON(m, u, c) {
        var xHR = new XMLHttpRequest;
        xHR.open(m, u, true);
        xHR.onreadystatechange = function() {
            if (this.status == 200 && this.readyState == 4) {
                res = JSON.parse(this.response);
                c(res);
            }
        }
        xHR.send();
    }

    function build(d, id) {
        var html = "";
        for (var i = 0; i < d.length; i++) {
            if (d[i].confirmed) {
                html += '<div class="bg-success px-3 py-2 my-2 rounded text-white">';
                html += '<span>' + d[i].name + '</span>';
                html += '<span class="float-right">' + d[i].count + '</span>';
                html += '</div>';
            } else {
                html += '<div class="bg-danger px-3 py-2 my-2 rounded text-white">';
                html += '<span>' + d[i].name + '</span>';
                html += '<span class="float-right">' + d[i].count + '</span>';
                html += '</div>';
            }
        }
        document.getElementById(id).innerHTML = html;
    }
    loadJSON('GET', 'https://api.myjson.com/bins/14zh8x', function(data) {
        build(data, 'output');
    });
}