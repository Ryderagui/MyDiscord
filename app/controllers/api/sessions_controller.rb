class Api::SessionsController < ApplicationController
  def show
    if(current_user)
      @user = current_user
      render json: {user: @user[:username]}
    else 
      render json: {message:"No User"}
    end
  end

  def create
    credential = params[:credential]
    password = params[:password]
    @user = User.find_by_credentials(credential,password)
    if(@user)
      login!(@user)
      render json: {user: @user[:username]}
    else
      render json: { message: 'Fail' }, status: :unauthorized
    end

  end

  def destroy
    if(current_user)
        logout!
        render json: {message: 'success'}
    else
      render json: {message: 'No Login'}
    end
  end
end
