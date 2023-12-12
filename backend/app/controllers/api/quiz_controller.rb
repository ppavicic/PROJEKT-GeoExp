module Api
  class QuizController < ApplicationController
    before_action :authenticate
    before_action :set_cities

    def questions
      render json: processed_data, status: :ok
    end

    private

    def city_id
      params['city_id']
    end

    def set_cities
      @user_cities = policy_scope(UserCity)
    end

    def current_city
      @user_cities.find_by(city_id: city_id).city
    end

    def question_set
      raise ActiveRecord::RecordNotFound if city_id.nil?

      current_city.questions
    end

    def processed_data
      data = []

      question_set.each do |question|
        data.push({ id: question.id,
                    text: question.text,
                    options: question_options(question),
                    correctAnswer: question.answer.correct })
      end
      data
    end

    def question_options(question)
      answer = question.answer

      [answer.correct, answer.value1, answer.value2, answer.value3]
    end
  end
end
