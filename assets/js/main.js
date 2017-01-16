main = function() {
    var colorData, eventData = [];

    $.ajax({
        type: 'GET',
        url: 'assets/data/colorData.json',
        data: { get_param: 'value' },
        dataType: 'json',
        async: false,
        success: function(data) {
            colorData = data;
        }
    });

    $.ajax({
        type: 'GET',
        url: 'assets/data/events.json',
        data: { get_param: 'value' },
        dataType: 'json',
        async: false,
        success: function(data) {
            for (var i = 0; i < data.length; ++i) {
                eventData.push({title: data[i].Holiday, start:data[i].Date});
            }
        }
    });

    $('#calendar').fullCalendar({
        contentHeight: 400,
        header: {
            left: 'title',
            center: '',
            right: 'prev,next'
        },
        titleFormat: 'MMMM',
        defaultDate: moment('2014-04-01'),
        //events: eventData,
        /*eventMouseover: function(event, jsEvent, view) {
            var lookUp = event.start._d.toString().split(' ')[0]+' '+event.start._d.toString().split(' ')[1]+' '+event.start._d.toString().split(' ')[2];
            if (colorData.filter(function (chain) {return chain.Date === lookUp;})[0]) {
                var poo = colorData.filter(function (chain) {
                    return chain.Date === lookUp;
                })[0];
                $('.hover-tag').text(Math.round(poo.Color*100)+'%');
                console.log(poo);
            }
        },*/
        dayRender: function (date, cell) {
            console.log(cell.prevObject);
            var bits = date._d.toString().split(' ');
            var lookUp = bits[0]+' '+bits[1]+' '+bits[2]+' '+bits[3];
            console.log(date._d);

            var alpha, patients, poo;
            for (var i = 0; i < colorData.length; i++) {
                if (colorData[i].Date === lookUp) {
                    poo = colorData[i];
                    alpha = poo.Color;
                    patients = Math.round(alpha * 100);
                    cell.css({'opacity': alpha * alpha});
                }
            }
            if (!poo) {
                alpha = 0.0;
                patients = 0.0;
                cell.css({'opacity': alpha});
            }
            /*if (colorData.filter(function (chain) {return chain.Date === lookUp;})[0]) {
                var poo = colorData.filter(function (chain) {
                    return chain.Date === lookUp;
                })[0];
                console.log(poo);
                alpha = poo.Color;
                patients = Math.round(alpha * 100);
                cell.css({'opacity': alpha * alpha});
            }
            else {
                alpha = 0.0;
                patients = 0.0;
                cell.css({'opacity': alpha});
            }*/
            cell.css({'background-color': 'red'});
            cell.css({'box-shadow': '5px 5px 5px #888888'});
            $(cell).hover(function() {
                $('.hover-tag').text('{ '+patients+'%'+' }');
                $(cell).css({'box-shadow': 'none'});
                //$('.hover-tag').css( { left:event.clientX, top: event.clientY } );
            }, function() {
                $('.hover-tag').text('{ emergency likelihood }');
                $(cell).css({'box-shadow': '5px 5px 5px #888888'});
            });
        }
    })
};

$(document).ready(main);