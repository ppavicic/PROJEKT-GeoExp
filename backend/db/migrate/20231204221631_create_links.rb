class CreateLinks < ActiveRecord::Migration[6.1]
  def change
    create_table :links do |t|
      t.string :link, null: false
      t.belongs_to :city, foreign_key: true, index: true
      t.timestamps
    end
  end
end
