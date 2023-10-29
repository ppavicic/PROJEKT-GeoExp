Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    post '/question', to: 'questions#answer_check'
    get '/user/cities/question', to: 'cities#question'
    get '/user/cities', to: 'user_cities#index'
    post '/users/register', to: 'users#create'
    post '/session', to: 'sessions#create'
    delete '/session', to: 'sessions#destroy'
  end
end
