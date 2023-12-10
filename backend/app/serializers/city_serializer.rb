class CitySerializer < Blueprinter::Base
  identifier :id

  fields :name, :longitude, :latitude, :created_at, :updated_at
  association :description, blueprint: DescriptionSerializer
  association :link, blueprint: LinkSerializer
  association :trivia, blueprint: TriviaSerializer
end
