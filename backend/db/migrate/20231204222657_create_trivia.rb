class CreateTrivia < ActiveRecord::Migration[6.1]
  def change
    create_table :trivia do |t|
      t.text :value, null: false
      t.belongs_to :city, foreign_key: true, index: true
      t.timestamps
    end
  end
end
