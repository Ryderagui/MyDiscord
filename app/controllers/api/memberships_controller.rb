class Api::MembershipsController < ApplicationController

    def create
        puts params
        @user_id = params[:userId];
        @username = params[:username];
        @community_id = params[:communityId];
        if @username
            @user_id = User.find_by(username: @username).id 
        end
        @membership = Membership.new(member_id: @user_id, community_id: @community_id)

        if (@user && @membership.save)
            UserChannel.broadcast_to(@user,{
                message: "Added to server",
            })

            render json: {message:"Member Added"}
        else
            render json: {errors: ["Issue with adding membership"]}
        end

    end

    def destroy
        @membership = Membership.find_by(id: params[:id])
        if(Membership.destroy(@membership.id))
            UserChannel.broadcast_to(@user,{
                message: "Left server",
            })
            render json: {message:"Member Removed"}
        else 
            render json: {errors: ["Issue removing member"]}            
        end
    end

    private 

    def memberships_params 
        params.require(:membership).permit(:username, :community_id)
    end



end