import './style.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import getRecords from './apiRequests/getRecords';

// For keeping track of our markers
let mapMarkers = [];
// Limit the map to generally around Japan
const bounds = [
  // Southwest Bound
  [110.627288, 20.895425], 
  // Northeast bound
  [164.992687, 51.682263]
];

const fetchAndDisplayMapData = async () => {
  // First reset markers
  clearMarkers()
  // Get our data from Kintone
  const kintoneData = await getRecords()
  // For each record...
  kintoneData.records.forEach(record => {
    //  We can create markers one by one programmatically
    //  create a popup and give it some text
    let popup = new maplibregl.Popup({ offset: 25 }).setText(
      `${record.title.value} ${record.address.value}`
    );
    // Add the marker to the map
    let marker = new maplibregl.Marker().setLngLat([record.lon.value, record.lat.value]).setPopup(popup).addTo(map)
    // Keep track of all markers in an array, for clearing, animating, etc. later
    mapMarkers.push(marker)
  });
}

// Removes all markers from the map
const clearMarkers = () => {
  mapMarkers.forEach((marker) => marker.remove())
  mapMarkers = []
}

// Run our fetch request on page load
fetchAndDisplayMapData()

// Initialize Map, centered on Tokyo
const map = new maplibregl.Map({
  container: 'map', // container id
  style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json', // style URL
  center: [139.767, 35.681],
  zoom: 3,
  maxBounds: bounds
});

// Add a function to refresh the map markers
document.getElementById('refresh').addEventListener('click', () => {
  fetchAndDisplayMapData()
});

// MapLibre has a lot of easy to use features, such as movement animations...
document.getElementById('fly').addEventListener('click', () => {
  map.flyTo({
    center: [
      139.767,
      35.681
    ],
    zoom: 10,
    essential: true
  });
});
