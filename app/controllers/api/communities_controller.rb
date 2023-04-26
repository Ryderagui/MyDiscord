class Api::CommunitiesController < ApplicationController
  before_action :require_logged_in

  def index 
    @user = current_user
    @community = Community.all
    # Add Active record to fetch all communities from Membership
    render :index
  end

  def show
    @community = Community.find_by(:id params[:id])
    render :show
  end

  def create
    @community = Community.new(community_params)
    @community.user_id = current_user.id
    if(@community.save)
        render :show
    else
        render json: { errors: @community.errors.full_messages}, status: :unprocessable_entity 
    end
  end

  def destroy
    @community = Community.find_by(:id params[:id])
    if(Community.destroy(@community.id))
      render :index
    else
      render json: { errors: ['Issue with Delete']}, status: :unprocessable_entity
    end
  end

  private

    def community_params
        params.require(:community).permit(:title, :privacy)
    end

end
