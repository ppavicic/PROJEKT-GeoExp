module Api
  class UsersController < ApplicationController
    def create
      user = User.new(user_params)
      if user.save
        render json: UserSerializer.render(user, root: :user), status: :created
      else
        render json: { errors: user.errors }, status: :bad_request
      end
    end

    private

    def user_params
      params.permit(:name, :password)
      # params.require(:user).permit(:name, :password)
    end
  end
end
