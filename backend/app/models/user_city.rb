class UserCity < ApplicationRecord
  belongs_to :user
  belongs_to :city

  validates :status, inclusion: { in: ['active', 'inactive'] }
end
