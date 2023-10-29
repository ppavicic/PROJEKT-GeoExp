class CityPolicy < ApplicationPolicy
  def question?
    user_cities = user.user_cities.where(city_id: record.id)
    user_cities.present?
  end
end
