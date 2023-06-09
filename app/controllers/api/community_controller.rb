class Api::CommunityController < ApplicationController
  before_action :require_logged_in

  def index 
    self.current_user
    @user = @current_user
    @community = Community.all
    # Add Active record to fetch all communities from Membership
    render :index
  end

  def filter
    self.current_user
    @user = @current_user
    @community = @user.communities
    # Add Active record to fetch all communities from Membership
    render :index
  end

  def show
    @community = Community.find_by(id: params["id"])
    render :show
  end

  def create
    self.current_user();
    @community = Community.new(community_params)
    @community.user_id = @current_user.id
    if(@community.save)
        Membership.create!(member_id: @current_user.id, community_id: @community.id)
        Channel.create!(title: "General", communities_id: @community.id)
        UserChannel.broadcast_to(@current_user,{
                message: "Added to server",
            })
        render :show
    else
        render json: { errors: @community.errors.full_messages}, status: :unprocessable_entity 
    end
  end

  def update
    @community = Community.find_by(id: params["id"])
    verify = @community.user_id & @current_user.id
    if(verify && @community && @community.update(community_params))
        render :show
    else
        render json: { errors: @community.errors.full_messages}, status: :unprocessable_entity 
    end
  end


  def destroy
    @community = Community.find_by(id: params["id"])
    puts @community
    if(Community.destroy(@community.id))
      UserChannel.broadcast_to(@current_user,{
                message: "Removed server",
      })
      render json: {communityId: @community.id}
    else
      render json: { errors: ['Issue with Delete']}, status: :unprocessable_entity
    end
  end

  private

    def community_params
        params.require(:community).permit(:title, :privacy)
    end

end
