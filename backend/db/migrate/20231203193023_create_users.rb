class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name, null: false, index: { unique: true }
      t.index 'lower(name)', unique: true
      t.integer :points, default: 0

      t.string :password_digest, null: false
      t.string :token, index: { unique: true }
      t.timestamps
    end
  end
end
