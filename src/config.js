export default {
  GEODATA_API_ENDPOINT: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
  GEODATA_FETCH_INTERVAL: 30000, // Fetch updated geodata every 30 seconds
  GEODATA_ROUND_TIME_TO_MS: 5 * 60 * 1000, // Round geodata time to 5 minutes
  AUDIO_TICK_DURATION: 200, // Fire an audio tick (and possibly play a sound) every 200ms
}
