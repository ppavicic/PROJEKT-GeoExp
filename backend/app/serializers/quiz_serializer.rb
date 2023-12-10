class QuizSerializer < Blueprinter::Base
  identifier :id
  fields :text, :city_id, :created_at, :updated_at
  association :answer, blueprint: AnswerSerializer
end
