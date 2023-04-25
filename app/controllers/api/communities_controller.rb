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
  end

  def create
    @community = Community.new(community_params)
    @community.user_id = current_user.id
    if(@community.save)
        render json: { message: ["Successfully Made Channel"]}
    else
        render json: { errors: @community.errors.full_messages}, status: :unprocessable_entity 
    end
  end

  def update

  end

  def destroy

  end

  private

    def community_params
        params.require(:community).permit(:title, :type)
    end


end
