class UserCity < ApplicationRecord
  belongs_to :user
  belongs_to :city
  has_one :description, through: :city
  validates :status, inclusion: { in: ['active', 'inactive'] }
end
