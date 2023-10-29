class UserCityPolicy < ApplicationPolicy
  def question?
    user_cities = user.user_cities.where(city_id: record.city_id)
    user_cities.present?
  end

  class Scope < Scope
    def resolve
      if user
        scope.where(user: user)
      else
        scope.none
      end
    end
  end
end
