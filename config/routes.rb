Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json} do
    resources :users, only: [:create, :index, :show]
    resources :community, only: [:index,:show,:create,:destroy, :update] do
      resources :channels, only: [:index,:show,:create,:destroy,:update]
    end
    resource :session, only: [:show,:create,:destroy]
  end
  
  get '*path', to: 'static_pages#frontend'

end
