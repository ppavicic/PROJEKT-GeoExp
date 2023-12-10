# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_12_06_181857) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.string "correct", null: false
    t.string "value1", null: false
    t.string "value2", null: false
    t.string "value3", null: false
    t.bigint "question_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["question_id"], name: "index_answers_on_question_id"
  end

  create_table "cities", force: :cascade do |t|
    t.string "name", null: false
    t.float "longitude", null: false
    t.float "latitude", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_cities_on_name", unique: true
  end

  create_table "descriptions", force: :cascade do |t|
    t.text "text", null: false
    t.bigint "city_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["city_id"], name: "index_descriptions_on_city_id"
  end

  create_table "links", force: :cascade do |t|
    t.string "link", null: false
    t.bigint "city_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["city_id"], name: "index_links_on_city_id"
  end

  create_table "questions", force: :cascade do |t|
    t.text "text", null: false
    t.bigint "city_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["city_id"], name: "index_questions_on_city_id"
  end

  create_table "trivia", force: :cascade do |t|
    t.text "value", null: false
    t.bigint "city_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["city_id"], name: "index_trivia_on_city_id"
  end

  create_table "user_cities", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "city_id"
    t.string "status", default: "inactive", null: false
    t.string "score", default: "0"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["city_id"], name: "index_user_cities_on_city_id"
    t.index ["user_id"], name: "index_user_cities_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.integer "points", default: 0
    t.string "password_digest", null: false
    t.string "token"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index "lower((name)::text)", name: "index_users_on_lower_name", unique: true
    t.index ["name"], name: "index_users_on_name", unique: true
    t.index ["token"], name: "index_users_on_token", unique: true
  end

  add_foreign_key "descriptions", "cities"
  add_foreign_key "links", "cities"
  add_foreign_key "questions", "cities"
  add_foreign_key "trivia", "cities"
  add_foreign_key "user_cities", "cities"
  add_foreign_key "user_cities", "users"
end
