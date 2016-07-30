Rails.application.routes.draw do
  root to: 'home#index'

  namespace :api do
    namespace :v1 do
      get 'geocoder', to: 'geocoder#index'
    end
  end
end
