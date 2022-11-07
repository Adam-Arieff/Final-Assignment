const cityForm = document.querySelector("#weatherForm");

var city=document.getElementById("weatherForm").value;
const getWeatherConditions = async(city) => {
 
  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
       
      let div = document.createElement("div");                     //place ,windspeed, coordinate, humidity, 
        div.setAttribute("id", "conditions");
        let city = document.createElement("h2");
        let cityNode = document.createTextNode(data.name);
        city.appendChild(cityNode);

        let temp = document.createElement("div");
        let tempNode = document.createTextNode((data.main.temp - 273).toFixed(2) + " °C  ");
        temp.appendChild(tempNode);
        
        let desc = document.createElement("div");
        let descNode = document.createTextNode( "\t   "+data.weather[0].description);
        temp.appendChild(descNode);
        
        let coord = document.createElement("div");
        let coordNode = document.createTextNode('Coordinate :- ' +'Longitude = '+data.coord.lon+', '+'Latitude = '+data.coord.lat);
        coord.appendChild(coordNode);

        let wind = document.createElement("div");
        let windNode = document.createTextNode('Wind Conditions :- ' +'Speed = ' +data.wind.speed+', '+'Degree = '+data.wind.deg);
        wind.appendChild(windNode);

        let main = document.createElement("div");
        let mainNode = document.createTextNode('Humidity = ' +data.main.humidity);
        main.appendChild(mainNode);

       

        div.appendChild(city);
        div.appendChild(temp);
        div.appendChild(desc);
        div.appendChild(coord);
        div.appendChild(wind);
        div.appendChild(main);
        document.querySelector("main").appendChild(div);

    }).catch(err => console.log(err))}

document.addEventListener("DOMContentLoaded", (e) => {
    cityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if(document.querySelector("#name").value != ""){
            let conditionsDiv = document.querySelector("#conditions");
            if(conditionsDiv){
                document.querySelector("main").removeChild(conditionsDiv);
            }
            getWeatherConditions(document.getElementById("name").value);
        }else{
            console.log("You must provide a city");
        }
    })
})