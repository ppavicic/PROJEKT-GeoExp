class AnswerSerializer < Blueprinter::Base
  identifier :id
  fields :correct, :value1, :value2, :value3, :question_id, :created_at, :updated_at
end
