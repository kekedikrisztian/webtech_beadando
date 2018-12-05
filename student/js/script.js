$(document).ready(function () {

    // Don't push button
    document.querySelector('#btnDebil').onclick = function () {
        document.querySelector("#body").classList.toggle("debil");
        alert('I told you so...');
    };

    // Show manufacturers listing
    document.querySelector('#showManufacturers').onclick = function () {
        $('.form-title').empty();
        $('.form-title').append('Show manufacturers');
        $('.form-content').empty();
        $.get('/manufacturers', function (manufacturers) {
            for (var i = 0; i < manufacturers.length; i++) {
                $('.form-content').append('<div class="data-row"><div class="data-row-name" data-m="' + manufacturers[i].name + '"><strong>' + manufacturers[i].name + '</strong></div><div class="data-row-description">Founded in ' + manufacturers[i].country + ' on ' + manufacturers[i].founded + '</div></div>');
            }
        });
    };

    // add-manufacturer html loading
    document.querySelector('#addManufacturer').onclick = function () {
        $('.form-title').empty();
        $('.form-title').append('Add manufacturer');
        $('.form-content').empty();

        $.get("/menu/add-manufacturer.html", function (data) {
            $(".form-content").append(data);
        });
    };

    // add-car html loading
    document.querySelector('#addCar').onclick = function () {

        $('.form-title').empty();
        $('.form-title').append('Add car');
        $('.form-content').empty();

        $.get("/menu/add-car.html", function (data) {
            $(".form-content").append(data);
        });
    };

    // Listing unique modells per car types
    $(document).on('click', '.data-row-name', function () {
        var _this = $(this);

        if (_this.hasClass('selected')) {
            _this.find('.car-list').remove();
            _this.removeClass('selected');
            return;
        }
        document.cookie = 'name=' + _this.attr('data-m');
        _this.addClass('selected');
        $.get('/manufacturer', function (cars) {
            _this.append('<div class="car-list"></div>');
            for (var car of cars) {
                _this.find('.car-list').append('<div class="car-list-item">' + car.name + '</div>');
            }
        });
    });

    // Show all
    document.querySelector('#showAll').onclick = function () {
        $('.form-title').empty();
        $('.form-title').append('Show all');

        $('.form-content').empty();
        $.getJSON("cars", function(data){
            var table = $("<table></table>");
            table.append("<tr><th>Manufacturer</th><th>Name</th><th>Color</th><th>Year</th><th>Available</th><th>Consumption</th><th>Horsepower</th></tr>");

            $.each(data, function(key, value){
                var row = $("<tr></tr>");
                var manufacturerCell = $("<td>" + value.manufacturer + "</td>");
                var nameCell = $("<td>" + value.name + "</td>");
                var colorCell = $("<td>" + value.color + "</td>");
                var yearCell = $("<td>" + value.year + "</td>");
                var availableCell = $("<td>" + value.available + "</td>");
                var consumtionCell = $("<td>" + value.consumption + "</td>");
                var horsepowerCell = $("<td>" + value.horsepower + "</td>");

                row.append(manufacturerCell);
                row.append(nameCell);
                row.append(colorCell);
                row.append(yearCell);
                row.append(availableCell);
                row.append(consumtionCell);
                row.append(horsepowerCell);
                table.append(row);
            });

            $(".form-content").html(table);
        });
    };
});



