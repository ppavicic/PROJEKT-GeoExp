class QuestionSerializer < Blueprinter::Base
  identifier :id

  fields :text, :correct_answer, :offered_answers, :created_at, :updated_at
  association :city, blueprint: CitySerializer
end
