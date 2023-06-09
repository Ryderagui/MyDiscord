class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']

    def index
        self.current_user
        @user = @current_user;
        render :show
    end

    def show
        @user = User.find_by(id: params[:id])
        render :show
    end

    def create 
        @user = User.new(user_params)
        if(@user.save)
            login!(@user)
            render json: {}
        else
            render json: { errors: @user.errors.full_messages}, status: :unprocessable_entity 
        end
    end

    private

    def user_params
        params.require(:user).permit(:email, :username, :password)
    end
end
