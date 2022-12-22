
//지도 그리기
function drawMap(target, jsonFile, dotFile, w, h, scale, initx, inity) {
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
                mapClick(d.properties.name_eng);
            })
            .attr('d', path)
            .attr('id', function(d) {
                return 'path-' + d.properties.name_eng;
            });

        // labels = states
        //     .selectAll('text')
        //     .data(json.features) //라벨표시
        //     .enter()
        //     .append('text')
        //     .attr('transform', translateTolabel)
        //     .attr('id', function(d) {
        //         return 'label-' + d.properties.name_eng;
        //     })
        //     .attr('text-anchor', 'middle')
        //     .attr('dy', '.35em')
        //     .text(function(d) {
        //         return d.properties.name;
        //     });
    });

    var places = svg.append('g').attr('id', 'places').attr('class', 'places');
    d3.csv("/assets/json/mapCenter.csv", function(data) {
        places.selectAll('svg')
            .data(data)
            .enter().append('svg:image')
            .on('click', function (d) {
                alert("Big map dot click d.info : " + d);
            })
            .attr('width', 13)
            .attr('height', 13)
            .attr('x', function(d) { return projection([d.lon, d.lat])[0]; })
            .attr('y', function(d) { return projection([d.lon, d.lat])[1]; })
            .attr('xlink:href', ("../../assets/img/kins-ico.png"));
        places.selectAll("text")
            .data(data)
            .enter().append("text")
            .attr("x", function(d) { return projection([d.lon, d.lat])[0] + 14; })
            .attr("y", function(d) { return projection([d.lon, d.lat])[1] + 10; })
            .text(function(d) { return d.name });
    });

    d3.csv(dotFile, function(data) {
        places.selectAll('circle')
            .data(data)
            .enter().append('circle')
            .on('click', function (d) {
                alert("Big map dot click d.info : " + d);
            })
            .attr('cx', function(d) { return projection([d.lon, d.lat])[0]; })
            .attr('cy', function(d) { return projection([d.lon, d.lat])[1]; })
            .attr('r', 4);
        places.selectAll("text")
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

function mapClick(name) {
    let jsonFile = "";
    let dotFile = "";
    let dotSubFile = "";
    let scale = 0;
    let initx = 0;
    let inity = 0;
    switch (name) {
        default:
        case "Seoul":
            jsonFile = "seoul.json";
            dotFile = "seoulDot.csv";
            dotSubFile = "seoulSubDot.csv";
            scale = 55218;
            initx = -122125;
            inity = 39348;
            break;
        case "Gyeonggi-do":
            jsonFile = "gyunggi.geojson";
            dotFile = "mapDot.csv";
            scale = 14870;
            initx = -32739;
            inity = 10795;
            break;
        case "Incheon":
            jsonFile = "incheon.geojson";
            dotFile = "mapDot.csv";
            scale = 11440;
            initx = -24842;
            inity = 8326;
            break;
        case "Gangwon-do":
            jsonFile = "gangwon.geojson";
            dotFile = "mapDot.csv";
            scale = 10243;
            initx = -22679;
            inity = 7548;
            break;
        case "Sejong":
            jsonFile = "sejong.geojson";
            dotFile = "mapDot.csv";
            scale = 56391;
            initx = -124997;
            inity = 38968;
            break;
        case "Daejeon":
            jsonFile = "daejeon.geojson";
            dotFile = "mapDot.csv";
            scale = 64854;
            initx = -143965;
            inity = 44459;
            break;
        case "Chungcheongnam-do":
            jsonFile = "chungnam.geojson";
            dotFile = "mapDot.csv";
            scale = 16714;
            initx = -36756;
            inity = 11716;
            break;
        case "Chungcheongbuk-do":
            jsonFile = "chungbuk.geojson";
            dotFile = "mapDot.csv";
            scale = 16956;
            initx = -37603;
            inity = 11917;
            break;
        case "Gwangju":
            jsonFile = "gwangju.geojson";
            dotFile = "mapDot.csv";
            scale = 71309;
            initx = -157603;
            inity = 47027;
            break;
        case "Jeollanam-do":
            jsonFile = "jeonnam.geojson";
            dotFile = "mapDot.csv";
            scale = 9786;
            initx = -21348;
            inity = 6583;
            break;
        case "Jeollabuk-do":
            jsonFile = "jeonbuk.geojson";
            dotFile = "mapDot.csv";
            scale = 16474;
            initx = -36288;
            inity = 11238;
            break;
        case "Jeju-do":
            jsonFile = "jeju.geojson";
            dotFile = "mapDot.csv";
            scale = 32440;
            initx = -71402;
            inity = 20258;
            break;
        case "Busan":
            jsonFile = "busan.geojson";
            dotFile = "mapDot.csv";
            scale = 46200;
            initx = -103798;
            inity = 30587;
            break;
        case "Ulsan":
            jsonFile = "ulsan.geojson";
            dotFile = "mapDot.csv";
            scale = 51103;
            initx = -114999;
            inity = 34184;
            break;
        case "Gyeongsangnam-do":
            jsonFile = "gyungnam.geojson";
            dotFile = "mapDot.csv";
            scale = 16022;
            initx = -35650;
            inity = 10787;
            break;
        case "Daegu":
            jsonFile = "daegu.geojson";
            dotFile = "mapDot.csv";
            scale = 50537;
            initx = -113128;
            inity = 34116;
            break;
        case "Gyeongsangbuk-do":
            jsonFile = "gyungbuk.geojson";
            dotFile = "mapDot.csv";
            scale = 9221;
            initx = -20543;
            inity = 6543;
            break;
    }

    document.getElementById("sub").innerHTML = '';
    drawSubMap("#sub", "/assets/json/" + jsonFile,
        "/assets/json/" + dotFile,
        "/assets/json/" + dotSubFile,
        500, 500,  scale, initx, inity);
}