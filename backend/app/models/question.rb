class Question < ApplicationRecord
  belongs_to :city

  validates :text, presence: true
end
