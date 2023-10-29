class CitySerializer < Blueprinter::Base
  identifier :id

  fields :name, :description, :longitude, :latitude, :created_at, :updated_at
end
