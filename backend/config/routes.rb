Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    get '/user/points', to: 'users#points'
    post '/submit', to: 'questions#answer_check'
    get '/city/questions', to: 'quiz#questions'
    get '/user/cities', to: 'user_cities#index'
    post '/users/register', to: 'users#create'
    post '/session', to: 'sessions#create'
    delete '/session', to: 'sessions#destroy'
    get '/city/description', to: 'cities#description'
  end
end
