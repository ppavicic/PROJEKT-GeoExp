class CreateCities < ActiveRecord::Migration[6.1]
  def change
    create_table :cities do |t|
      t.string :name, null: false, index: {unique: true}
      t.text :description
      t.float :longitude
      t.float :latitude
      t.timestamps
    end
  end
end
