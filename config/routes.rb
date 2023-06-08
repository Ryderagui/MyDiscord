Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post 'api/test', to: 'application#test'

  mount ActionCable.server => '/cable'

  namespace :api, defaults: { format: :json} do
    get '/users/community', to: "community#filter"
    resources :users, only: [:create, :index, :show]
    resources :community, only: [:index,:show,:create,:destroy, :update] do
      resources :channels, only: [:index,:show,:create,:destroy,:update] do
        resources :messages, only: [:index,:create,:update,:destroy]
      end
      resources :memberships, only: [:create,:destroy]
    end
    resource :session, only: [:show,:create,:destroy]
  end
  
  get '*path', to: 'static_pages#frontend'

end
