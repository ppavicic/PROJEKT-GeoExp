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
      render json: { data: { info: 'Wrong answer! Please try again.' } }, status: :ok
    end

    # potrebno je uzeti neki random grad od korisnika koji posjeduje i njemu promjeniti status
    # prije odabira grada napravit shuffle
    def update_status
      city = inactive_city
      return all_done if cities.empty?

      city.update(status: 'active')
      render json: { data: { info: `Congratulations! You unlocked #{city.name}` } }, status: :ok
    end

    def all_done
      render json: { data: { info: 'Congratulations! You unlocked all cities!' } }, status: :ok
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
      params['city-id']
    end

    def user_answer
      params['answer']
    end
  end
end
