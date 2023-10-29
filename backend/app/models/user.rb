class User < ApplicationRecord
  has_secure_password
  has_secure_token

  has_many :user_cities, dependent: :destroy
  has_many :cities, through: :user_cities

  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { minimum: 2 }
end
