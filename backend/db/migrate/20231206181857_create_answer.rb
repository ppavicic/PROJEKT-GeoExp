class CreateAnswer < ActiveRecord::Migration[6.1]
  def change
    create_table :answers do |t|
      t.string :correct, null: false
      t.string :value1, null: false
      t.string :value2, null: false
      t.string :value3, null: false
      t.belongs_to :question
      t.timestamps
    end
  end
end
