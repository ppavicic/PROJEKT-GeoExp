module Api
  class UsersController < ApplicationController
    def create
      user = User.new(user_params)
      if user.save
        update_user_cities(user.id)
        render json: UserSerializer.render(user, root: :user), status: :created
      else
        render json: { errors: user.errors }, status: :bad_request
      end
    end

    private

    def update_user_cities(user_id)
      UserCitiesQuery.new(user_id).update_user_cities
    end

    def user_params
      params.require(:user).permit(:name, :password)
    end
  end
end
