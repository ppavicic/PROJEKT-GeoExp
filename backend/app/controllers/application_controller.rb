class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  include Pundit::Authorization
  rescue_from Pundit::NotAuthorizedError, with: :render_forbidden

  def render_json(data, root_name)
    render json: blueprinter.render(data, root: root_name)
  end

  def current_user
    User.find_by(token: headers_token)
  end

  def render_unauthorized
    render json: { errors: { token: ['is invalid'] } }, status: :unauthorized
  end

  private

  def authenticate
    render_unauthorized if headers_token.nil? || current_user.nil?
  end

  def render_forbidden
    render json: { errors: { resource: ['is forbidden'] } }, status: :forbidden
  end

  def headers_token
    request.headers['Authorization']
  end

  def record_not_found(exception)
    render json: {
      errors: {
        database: ["#{exception.model} not found"]
      }
    }, status: :not_found
  end
end
