module OpenWeatherMap
  CITY_PATH_FILE = File.expand_path('open_weather_map/city_ids.json', __dir__)
  APPID = Rails.application.credentials.open_weather_map_api_key
  BASE_URL = 'https://api.openweathermap.org/data/2.5'

  def self.city(city_name)
    city_id = Resolver.city_id(city_name)
    return if city_id.nil?

    response = HTTParty.get(
      "#{BASE_URL}/weather",
      query: { id: city_id, appid: APPID }
    )

    City.parse(JSON.parse(response.body))
  end

  def self.cities(city_names)
    city_ids = city_names.map { |name| Resolver.city_id(name) }.compact.uniq
    return [] if city_ids.empty?

    response = HTTParty.get(
      "#{BASE_URL}/group",
      query: { id: city_ids.join(','), appid: APPID }
    )

    cities = JSON.parse(response.body)['list']
    cities.map { |city| City.parse(city) }
  end
end
