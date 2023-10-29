class UserCitySerializer < Blueprinter::Base
  identifier :id

  fields :status, :created_at, :updated_at
  association :city, blueprint: CitySerializer
  # association :user, blueprint: UserSerializer
end
