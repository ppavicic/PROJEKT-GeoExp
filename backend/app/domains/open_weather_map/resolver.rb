require 'json'
module OpenWeatherMap
  module Resolver
    def self.city_id(city_name)
      city_ids_json = JSON.parse(File.read(CITY_PATH_FILE))
      city_id = city_ids_json.find { |city| city['name'].eql?(city_name) }

      city_id['id'] if city_id
    end
  end
end
