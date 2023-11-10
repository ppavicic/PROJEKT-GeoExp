class UserCity < ApplicationRecord
  belongs_to :user
  belongs_to :city

  validates :status, inclusion: { in: ['active', 'inactive'] }
  validates :answered, inclusion: { in: ['true', 'false'] }
end
