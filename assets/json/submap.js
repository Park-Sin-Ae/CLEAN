
//지도 그리기
function drawSubMap(target, jsonFile, dotFile, dotSubFile, w, h, scale, initx, inity) {
    var width = w; //지도의 넓이
    var height = h; //지도의 높이
    var initialScale = scale; //확대시킬 값
    var initialX = initx; //초기 위치값 X
    var initialY = inity; //초기 위치값 Y
    var labels;

    var projection = d3.geo
        .mercator()
        .scale(initialScale)
        .translate([initialX, initialY]);
    var path = d3.geo.path().projection(projection);
    var zoom = d3.behavior
        .zoom()
        .translate(projection.translate())
        .scale(projection.scale())
        .scaleExtent([height, 800 * height])
        .on('zoom', zoom);

    var svg = d3
        .select(target)
        .append('svg')
        .attr('width', width + 'px')
        .attr('height', height + 'px')
        .attr('id', 'map')
        .attr('class', 'map');

    var states = svg
        .append('g')
        .attr('id', 'states');
        // .call(zoom);

    states
        .append('rect')
        .attr('class', 'background')
        .attr('width', width + 'px')
        .attr('height', height + 'px');

    //geoJson데이터를 파싱하여 지도그리기
    d3.json(jsonFile, function(json) {
        states
            .selectAll('path') //지역 설정
            .data(json.features)
            .enter()
            .append('path')
            .on('click', function (d) {
                // mapClick(d.properties.name_eng);
            })
            .attr('d', path)
            .attr('id', function(d) {
                return 'path-' + d.properties.name_eng;
            })
            .attr('class', 'sub_path');
    });

    var placeSub = svg.append('g').attr('id', 'places').attr('class', 'places');
    d3.csv(dotFile, function(data) {
        placeSub.selectAll('circle')
            .data(data)
            .enter().append('circle')
            .on('click', function (d) {
                alert("mini map dot click d.info : " + d);
            })
            .attr('cx', function(d) { return projection([d.lon, d.lat])[0]; })
            .attr('cy', function(d) { return projection([d.lon, d.lat])[1]; })
            .attr('r', 4);
        placeSub.selectAll("text")
            .data(data)
            .enter().append("text")
            .attr("x", function(d) { return projection([d.lon, d.lat])[0] + 8; })
            .attr("y", function(d) { return projection([d.lon, d.lat])[1] + 4; })
            .text(function(d) { return d.name });
    });

    var placeMini = svg.append('g').attr('id', 'places').attr('class', 'sub_places');
    d3.csv(dotSubFile, function(data) {
        placeMini.selectAll('circle')
            .data(data)
            .enter().append('circle')
            .on('click', function (d) {
                alert("mini map dot click d.info : " + d);
            })
            .attr('cx', function(d) { return projection([d.lon, d.lat])[0]; })
            .attr('cy', function(d) { return projection([d.lon, d.lat])[1]; })
            .attr('r', 4);
        placeMini.selectAll("text")
            .data(data)
            .enter().append("text")
            .attr("x", function(d) { return projection([d.lon, d.lat])[0] + 8; })
            .attr("y", function(d) { return projection([d.lon, d.lat])[1] + 4; })
            .text(function(d) { return d.name });
    });

    //텍스트 위치 조절 - 하드코딩으로 위치 조절을 했습니다.
    function translateTolabel(d) {
        var arr = path.centroid(d);
        if (d.properties.code == 31) {
            //서울 경기도 이름 겹쳐서 경기도 내리기
            arr[1] +=
                d3.event && d3.event.scale
                    ? d3.event.scale / height + 20
                    : initialScale / height + 20;
        } else if (d.properties.code == 34) {
            //충남은 조금 더 내리기
            arr[1] +=
                d3.event && d3.event.scale
                    ? d3.event.scale / height + 10
                    : initialScale / height + 10;
        }
        return 'translate(' + arr + ')';
    }

    function zoom() {
        projection.translate(d3.event.translate).scale(d3.event.scale);
        states.selectAll('path').attr('d', path);
        console.log(d3.event.scale);
        console.log(d3.event.translate);
        // labels.attr('transform', translateTolabel);
    }

}