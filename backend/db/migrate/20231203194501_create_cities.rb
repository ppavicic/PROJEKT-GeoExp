class CreateCities < ActiveRecord::Migration[6.1]
  def change
    create_table :cities do |t|
      t.string :name, null: false, index: { unique: true }
      t.float :longitude, null: false
      t.float :latitude, null: false
      t.timestamps
    end
  end
end
