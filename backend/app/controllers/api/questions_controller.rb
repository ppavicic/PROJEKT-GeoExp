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
    end

    def wrong_answer
      render json: { info: 'Wrong answer! Please try again.' }, status: :ok
    end

    def update_status
      return answered_question unless updatable?

      city = inactive_city
      return all_done if city.nil?

      @user_cities.where(city_id: city_id).first.update(answered: 'true')
      city.update(status: 'active')
      render json: { info: "Congratulations! You unlocked #{city.city.name}" },
             status: :ok
    end

    def updatable?
      return true if @user_cities.where(city_id: city_id).first.answered.eql?('false')

      false
    end

    def all_done
      render json: { info: 'Congratulations! You unlocked all cities!' }, status: :ok
    end

    def answered_question
      render json: { info: 'Congratulations! Your answer is correct!' }
    end

    def inactive_city
      @user_cities.where(status: 'inactive').sample
    end

    def set_city
      @city = City.find(city_id)
      authorize @city, :question?
    end

    def set_cities
      @user_cities = policy_scope(UserCity)
    end

    def city_id
      params['requestBody']['city-id']
    end

    def user_answer
      params['requestBody']['answer']
    end
  end
end
