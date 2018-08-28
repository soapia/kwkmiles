var travelLocations = {
    "HOME": "hi",
    "Los Angeles": "34.0536834, -118.2427669",
    "Denver": "39.7391428, -104.984696",
    "Phoenix": "33.4485866, -112.0773456",
    "New Orleans": "29.9499323, -90.0701156",
    "Albuquerque": "35.0841034, -106.6509851",
    "Atlanta": "33.7490987, -84.3901849",
    "San Francisco": "37.7792808, -122.4192363",
    "Baltimore": "39.2908816, -76.610759",
    "St. Louis": "38.74960255, -90.3702194368197",
    "Boston": "42.3602534, -71.0582912",
    "Dallas Fort-Worth": "32.7762719, -96.7968559",
    "Detroit": "42.3486635, -83.0567375",
    "Miami": "25.7742658, -80.1936589",
    "Tulsa": "36.1556805, -95.9929113",
    "Los Angeles": "34.0536834, -118.2427669",
    "Austin": "30.2711286, -97.7436995",
    "Buffalo": "42.8867166, -78.8783922",
    "Minneapolis": "44.9772995, -93.2654692",
    "Raleigh-Durham": "35.7803977, -78.6390989",
    "Philadelphia": "39.9524152, -75.1635755",
    "Portland": "45.5202471, -122.6741949",
    "Seattle": "47.6038321, -122.3300624",
    "Omaha": "41.2587317, -95.9378732",
    "Nashville": "36.1622296, -86.7743531",
    "Chicago": "41.8755616, -87.6244212",
    "New York": "40.7308619, -73.9871558",
}

Number.prototype.toRad = function() {
   return this * Math.PI / 180
}

function distanceFormula(lat1, lon1, lat2, lon2) {
    var R = 3958.756
    var x1 = lat2-lat1
    var dLat = x1.toRad()  
    var x2 = lon2-lon1
    var dLon = x2.toRad()  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon/2) * Math.sin(dLon/2)  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    var d = R * c
    return d
}

var x1st
var y1st
var x2nd
var y2nd

function getCoordinates(string1, string2) {
    var pointsArray = string1.split(", ")
    for (var i = 0; i < pointsArray.length; i++) {
        pointsArray[i] = parseFloat(pointsArray[i])
    }
    x1st = pointsArray[0]
    y1st = pointsArray[1]
    pointsArray = string2.split(", ")
    for (var i = 0; i < pointsArray.length; i++) {
        pointsArray[i] = parseFloat(pointsArray[i])
    }
    x2nd = pointsArray[0]
    y2nd = pointsArray[1]
}

var distanceTravelled = 0

function calcByLocation(locationsArray) {
    for (var i = 0; i < locationsArray.length - 1; i++) {
        getCoordinates(travelLocations[locationsArray[i]], travelLocations[locationsArray[i+1]])
        // console.log(distanceFormula(x1st, y1st, x2nd, y2nd))
        distanceTravelled += distanceFormula(x1st, y1st, x2nd, y2nd)
    }
    // console.log(distanceTravelled)
}


function myLocations() {
    var first = document.getElementById('firstSession')
    var second = document.getElementById('secondSession')
    var third = document.getElementById('thirdSession')
    var fourth = document.getElementById('fourthSession')
    var fifth = document.getElementById('fifthSession')
    var home = document.getElementById('homeCity')
    var newCoordinates = travelLocations[home.value]
    
    // console.log(newCoordinates)
    travelLocations["HOME"] = newCoordinates
    distanceTravelled = 0
    $("h2").empty()
    var answer = calcByLocation([first.value, second.value, "HOME", third.value, fourth.value, fifth.value, "HOME"])
    $("h2").append(`you travelled ${Math.round(distanceTravelled * 100) / 100} miles with kwk this summer :)`)
}

