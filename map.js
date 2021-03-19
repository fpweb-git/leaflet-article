const svgBlue = '<svg width="26" height="41" viewBox="0 0 26 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 13.5C19 16.5376 16.5376 19 13.5 19C10.4624 19 8 16.5376 8 13.5C8 10.4624 10.4624 8 13.5 8C16.5376 8 19 10.4624 19 13.5Z" fill="white"/><path d="M13.3619 39.3378C13.2153 39.5682 13.0946 39.7565 13.0036 39.898C12.9126 39.7565 12.7919 39.5682 12.6452 39.3378C12.2905 38.7806 11.7835 37.9772 11.1752 36.9925C9.95834 35.023 8.33623 32.3293 6.71445 29.4318C5.09221 26.5334 3.47258 23.4351 2.25921 20.6553C1.04034 17.863 0.25 15.4322 0.25 13.8523C0.25 9.09195 1.87241 5.70244 4.2625 3.49961C6.6568 1.2929 9.84296 0.257417 13 0.250001C16.157 0.257417 19.3432 1.2929 21.7375 3.49961C24.1276 5.70244 25.75 9.09195 25.75 13.8523C25.75 15.4322 24.9601 17.863 23.7419 20.6554C22.5293 23.4351 20.9105 26.5335 19.2892 29.4318C17.6684 32.3294 16.0472 35.0231 14.831 36.9926C14.223 37.9772 13.7164 38.7807 13.3619 39.3378ZM13.0074 8.54761C10.379 8.54761 8.25114 10.6755 8.25114 13.3039C8.25114 15.932 10.3788 18.0601 13 18.0601C15.6278 18.0601 17.7637 15.9328 17.7637 13.3039C17.7637 10.6755 15.6358 8.54761 13.0074 8.54761Z" fill="#16AFD1" stroke="white" stroke-width="0.5"/></svg>';
const baseSvg = 'data:image/svg+xml;base64,' + btoa(svgBlue);

const svgDark = '<svg width="26" height="41" viewBox="0 0 26 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 13.5C19 16.5376 16.5376 19 13.5 19C10.4624 19 8 16.5376 8 13.5C8 10.4624 10.4624 8 13.5 8C16.5376 8 19 10.4624 19 13.5Z" fill="white"/><path d="M13.3619 39.3378C13.2153 39.5682 13.0946 39.7565 13.0036 39.898C12.9126 39.7565 12.7919 39.5682 12.6452 39.3378C12.2905 38.7806 11.7835 37.9772 11.1752 36.9925C9.95834 35.023 8.33623 32.3293 6.71445 29.4318C5.09221 26.5334 3.47258 23.4351 2.25921 20.6553C1.04034 17.863 0.25 15.4322 0.25 13.8523C0.25 9.09195 1.87241 5.70244 4.2625 3.49961C6.6568 1.2929 9.84296 0.257417 13 0.250001C16.157 0.257417 19.3432 1.2929 21.7375 3.49961C24.1276 5.70244 25.75 9.09195 25.75 13.8523C25.75 15.4322 24.9601 17.863 23.7419 20.6554C22.5293 23.4351 20.9105 26.5335 19.2892 29.4318C17.6684 32.3294 16.0472 35.0231 14.831 36.9926C14.223 37.9772 13.7164 38.7807 13.3619 39.3378ZM13.0074 8.54761C10.379 8.54761 8.25114 10.6755 8.25114 13.3039C8.25114 15.932 10.3788 18.0601 13 18.0601C15.6278 18.0601 17.7637 15.9328 17.7637 13.3039C17.7637 10.6755 15.6358 8.54761 13.0074 8.54761Z" fill="#307199" stroke="white" stroke-width="0.5"/></svg>';
const activeSvg = 'data:image/svg+xml;base64,' + btoa(svgDark);

const activeIcon = new L.Icon({
    iconUrl: activeSvg,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const baseIcon = new L.Icon({
    iconUrl: baseSvg,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const mymap = L.map('mapid',{
    minZoom : 4,
    zoomControl : false,
})

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

L.tileLayer(tileUrl, { 
    attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 20,
    zoomOffest: -1,
}).addTo(mymap)

let clickedMarker;

let geojson; 
// fetch the data and populate the map

fetch('./geojson-data.json')
.then(response => response.json())
.then(data => {
    geojson = data
    const eachFeatureCode = function(feature, layer){
        if(feature.geometry.type === 'Point'){
            layer.on('click', function(e){
                if(clickedMarker){
                    clickedMarker.setIcon(baseIcon);
                }
                e.target.setIcon(activeIcon);
                clickedMarker = e.target;
            })
        }
        const content = `
        <h2>${feature.properties.name }</h2>
        <p>${feature.properties.adress }<p>
        ` 
        layer.bindPopup(content);
    }

    const filterAll = document.getElementById("all");
    filterAll.checked = true
    filterAll.addEventListener('change', function(){
        mymap.addLayer(allRestaurant)
        mymap.removeLayer(italianRestaurant)
        mymap.removeLayer(nepalRestaurant)
    })

    const filterItalie = document.getElementById("italie");
    filterItalie.addEventListener('change', function(){
        mymap.addLayer(italianRestaurant)
        mymap.removeLayer(allRestaurant)
        mymap.removeLayer(nepalRestaurant)
    })

    const filterNepal = document.getElementById("nepal");
    filterNepal.addEventListener('change', function(){
        mymap.addLayer(nepalRestaurant)
        mymap.removeLayer(italianRestaurant)
        mymap.removeLayer(allRestaurant)
    })
    
    const allRestaurant = L.geoJson(geojson, {
        pointToLayer : function(geoJsonPoint, latlng){
                return L.marker(latlng,{
                icon : baseIcon,
                });
        },
        onEachFeature : eachFeatureCode,
    })
    
    const nepalRestaurant = L.geoJson(geojson, {
        filter: function(feature, layer) {
            return feature.properties.type == "nepal";
        },
        pointToLayer : function(geoJsonPoint, latlng){
                return L.marker(latlng,{
                icon : baseIcon,
                });
        },
        onEachFeature : eachFeatureCode,
    })
    
    const italianRestaurant = L.geoJson(geojson, {
        filter: function(feature, layer) {
            return feature.properties.type == "italie";
        },
        pointToLayer : function(geoJsonPoint, latlng){
                return L.marker(latlng,{
                icon : baseIcon,
                });
        },
        onEachFeature : eachFeatureCode,
    })
    

    allRestaurant.addTo(mymap)
    
    mymap.fitBounds(allRestaurant.getBounds(),{
        maxZoom : 6
    })
})
.catch(err => console.log(err))