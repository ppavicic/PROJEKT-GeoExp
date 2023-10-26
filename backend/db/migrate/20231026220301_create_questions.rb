class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.text :text, null: false
      t.string :correct_answer
      t.text :offered_answers
      t.belongs_to :city, foreign_key: true, index: true
      t.timestamps
    end
  end
end
