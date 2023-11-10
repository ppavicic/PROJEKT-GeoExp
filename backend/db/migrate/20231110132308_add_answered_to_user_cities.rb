class AddAnsweredToUserCities < ActiveRecord::Migration[6.1]
  def change
    add_column :user_cities, :answered, :string, default: 'false'
  end
end
