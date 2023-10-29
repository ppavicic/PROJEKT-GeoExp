module Api
  class CitiesController < ApplicationController
    before_action :authenticate
    before_action :set_city, only: :question

    def question
      render json: QuestionSerializer.render(city_question, root: :question)
    end

    private

    def set_city
      @city = City.find(city_id)
      authorize @city, :question?
    end

    def city_question
      @city&.question
    end

    def city_id
      params['city-id']
    end
  end
end
