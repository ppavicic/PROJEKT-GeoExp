module Api
  class QuestionsController < ApplicationController
    before_action :authenticate
    before_action :set_city, only: :answer_check
    before_action :set_cities, only: :answer_check

    def answer_check
      if @city.question.correct_answer.eql?(user_answer)
        correct_answer
      else
        wrong_answer
      end
    end

    private

    def correct_answer
      update_status
      render json: { data: { info: 'Correct answer!' } }, status: :ok
    end

    def wrong_answer
      render json: { data: { info: 'Wrong answer! Please try again.' } }, status: :ok
    end

    def update_status
      @user_cities.find_by(city_id: city_id).update(status: 'active')
    end

    def set_city
      @city = City.find(city_id)
      authorize @city, :question?
    end

    def set_cities
      @user_cities = policy_scope(UserCity)
    end

    def city_id
      params['city-id']
    end

    def user_answer
      params['answer']
    end
  end
end
