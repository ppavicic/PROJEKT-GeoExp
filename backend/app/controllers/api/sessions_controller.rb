module Api
  class SessionsController < ApplicationController
    before_action :authenticate, only: [:destroy]

    def create
      user = User.find_by(name: user_name)
      if user&.authenticate(user_password)
        render_token(user)
      else
        render_credentials_error
      end
    end

    def destroy
      current_user.regenerate_token
      head :no_content
    end

    private

    def user_name
      params.dig('session', 'name')
    end

    def user_password
      params.dig('session', 'password')
    end

    def render_token(user)
      render json: { session: { token: user.token, user: user_data(user) } }, status: :created
    end

    def render_credentials_error
      render json: { errors: { credentials: ['are invalid'] } }, status: :bad_request
    end

    def user_data(user)
      JSON.parse(UserSerializer.render(user))
    end
  end
end
