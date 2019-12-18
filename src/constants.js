const API_KEY = 'a853dd25b19367cdd633c26ac7d1bdcd'
export const api = {
  getForecast(lat, lon) {
    return `https://api.darksky.net/forecast/${API_KEY}/${lat},${lon}?units=si`
  },
}
