module Api
  class QuestionsController < ApplicationController
    before_action :authenticate
    before_action :set_cities

    def answer_check
      render json: update, status: :ok #unless update.nil?

      # render json: { info: 'Already answered' }
    end

    private

    def questions_answers
      params['requestBody']['questions']
      # params['questions']
    end

    def city_id
      params['requestBody']['city_id']
      # params['city_id']
    end

    def user_city
      @user_cities.find_by(city_id: city_id)
    end

    def city
      user_city.city
    end

    def check_answers # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
      data = { counter: 0 }
      questions_answers.each do |entry|
        binding.pry
        if answer(entry['id']).eql?(entry['answer'])
          data[:counter] += 1
          data[question(entry['id']).text] = 'true'
        else
          data[question(entry['id']).text] = 'false'
        end
      end
      update_user(data[:counter])
      data
    end

    def update_user(score)
      current_points = current_user.points
      current_user.update(points: current_points + score)
    end

    def question(question_id)
      city.questions.find(question_id)
    end

    def answer(question_id)
      question(question_id).answer.correct
    end

    def update
      return if user_city.status.eql?('inactive')

      data = check_answers
      user_city.update(status: 'inactive', score: data[:counter])
      data
    end

    def set_cities
      @user_cities = policy_scope(UserCity)
    end

    def inactive_city_count
      @user_cities.where(status: 'active').count
    end
  end
end
