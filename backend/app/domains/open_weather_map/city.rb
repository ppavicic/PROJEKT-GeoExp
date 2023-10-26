module OpenWeatherMap
  class City
    attr_reader :id, :lat, :lon, :name

    def initialize(id:, lat:, lon:, name:, temp_k:)
      @id = id
      @lat = lat
      @lon = lon
      @name = name
      @temp_k = temp_k
    end

    def temp
      (temp_k - 273.15).round(2)
    end

    def <=>(other)
      [temp, name] <=> [other.temp, other.name]
    end

    def self.parse(city_json)
      new(
        id: city_json['id'],
        lat: city_json.dig('coord', 'lat'),
        lon: city_json.dig('coord', 'lon'),
        name: city_json['name'],
        temp_k: city_json.dig('main', 'temp')
      )
    end

    def nearby(count = 5)
      response = HTTParty.get(
        "#{BASE_URL}/find",
        query: { lat: lat, lon: lon, cnt: count, appid: APPID }
      )

      nearby_cities = JSON.parse(response.body)['list']
      nearby_cities.map { |city| City.parse(city) }
    end

    def coldest_nearby(count = 5)
      nearby(count).min
    end

    private

    attr_reader :temp_k
  end
end
