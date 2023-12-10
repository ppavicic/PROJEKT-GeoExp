class UserCitySerializer < Blueprinter::Base
  fields :status, :score, :created_at, :updated_at
  association :city, blueprint: CitySerializer
end
