class City < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_many :answers, through: :questions
  has_many :user_cities, dependent: :destroy
  has_many :users, through: :user_cities
  has_one :description, dependent: :destroy
  has_one :link, dependent: :destroy
  has_one :trivia, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end
