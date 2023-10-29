class City < ApplicationRecord
  has_one :question, dependent: :destroy
  has_many :user_cities, dependent: :destroy
  has_many :users, through: :user_cities

  validates :name, presence: true, uniqueness: true
end
