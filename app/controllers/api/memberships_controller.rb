class Api::MembershipsController < ApplicationController

    def create
        puts params
        @user_id = params[:userId];
        @username = params[:username];
        @community_id = params[:community_id];
        if @username
            @user = User.find_by(username: @username)
        end
        @membership = Membership.new(member_id: @user.id, community_id: @community_id)

        if (@membership.save)
            puts "New Member"
            UserChannel.broadcast_to(@user,{
                message: "Added to server",
            })

            render json: {message:"Member Added"}
        else
            puts "Issue with saving Membership"
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
        params.require(:membership).permit(:username, :community_id,:userId)
    end



end