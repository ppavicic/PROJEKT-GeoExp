module Api
  class UserCitiesController < ApplicationController
    before_action :authenticate
    before_action :set_cities, only: :index

    def index
      render json: UserCitySerializer.render(@user_cities, root: :data), status: :ok
    end

    private

    def set_cities
      @user_cities = policy_scope(UserCity)
    end

    def user_points
      @user_cities.first.user.points
    end

    def city_id
      params['city-id']
    end
  end
end
