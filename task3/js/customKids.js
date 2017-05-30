/**
 * Created by STEVIS on 5/30/2017.
 */
(function () {
    "use strict";

    function Kid(name, age, color, game, food, imgUrl) {
        this.name = name;
        this.age = age;
        this.color = color;
        this.game = game;
        this.food = food;
        this.imgUrl = imgUrl;
    }

    Kid.prototype.toHTML = function() {
        var loadHtml =
        "<div class=\"kid\">\n" +
        "          <div class=\"panel panel-info\">\n" +
        "            <div class=\"panel-heading\">\n" +
        "              <h3>" + this.name + "</h3>\n" +
        "            </div>\n" +
        "            <div class=\"panel-body\">\n" +
        "              <div class=\"col-sm-4\">\n" +
        "                <img class=\"img-responsive\" src=\"" + this.name + ">\n" +
        "              </div>\n" +
        "              <div class=\"col-sm-8\">\n" +
        "                <ul>\n" +
        "                  <li><h5>" + this.age + "</h5></li>\n" +
        "                  <li><h5>" + this.color + "</h5></li>\n" +
        "                  <li><h5>" + this.game + "</h5></li>\n" +
        "                  <li><h5>" + this.food + "</h5></li>\n" +
        "                </ul>\n" +
        "              </div>\n" +
        "            </div>\n" +
        "          </div>\n" +
        "        </div>\n" +
        "      </div>\n" +
        "    </div>\n"


        return loadHtml;
    };

    var childrenDB = [];

    $.getJSON('js/kids.json', function(data) {


        data.forEach(function(obj) {
            var kid = new Kid(obj.name, obj.age, obj.color, obj.game, obj.food, obj.imgUrl);
            childrenDB.push(kid);
        });

        showKids(childrenDB);
    });

    function showKids(kids) {
        var dbContainer = $("#kids");
        dbContainer.empty();

        kids.forEach(function(kid) {
            dbContainer.append(kid.toHTML());
        });
    }


    $(".form-control").on("keyup", function () {
        var searchText = this.value;

        if (searchText && searchText.length > 2) {
            filtered = childrenDB.filter(function (film) {
                var searchable = [childrenDB.food, childrenDB.game, childrenDB.name].join(":::").toLowerCase();
                return searchable.indexOf(searchText.toLowerCase()) >= 0;
            });
        }
        showKids(filtered);
    });

    function sort(list, property) {
        return list.sort(function (a, b) {
            if (a[property] > b[property]) {
                return 1;
            }
            if (a[property] < b[property]) {
                return -1;
            }
            return 0;
        });

    }
    
    

})();