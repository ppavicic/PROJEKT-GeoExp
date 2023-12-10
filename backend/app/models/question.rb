class Question < ApplicationRecord
  belongs_to :city
  has_one :answer, dependent: :destroy

  validates :text, presence: true
end
