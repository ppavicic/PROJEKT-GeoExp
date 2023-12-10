class CreateUserCities < ActiveRecord::Migration[6.1]
  def change
    create_table :user_cities do |t|
      t.belongs_to :user, foreign_key: true, index: true
      t.belongs_to :city, foreign_key: true, index: true
      t.string :status, null: false, default: 'inactive'
      t.string :score, default: 0
      t.timestamps
    end
  end
end
