class Api::ChannelsController < ApplicationController

    def index 
        @user = current_user
        @community = Community.find_by(id: params["community_id"])
        @channels = Channel.where(communities_id: @community.id)
        # Add Active record to fetch all communities from Membership
        render :index
      end
    
      def show
        @channel = Channel.find_by(id: params["id"])
        @messages = Message.where(channel_id: @channel.id)
        render :show
      end
    
      def create
        @channel = Channel.new(channel_params);
        @community = Community.find_by(id: params["community_id"]);
        @channel.communities_id = @community.id;
        @messages = Message.where(channel_id: @channel.id)
        if(@channel.save)
            render :show
        else
            render json: { errors: @community.errors.full_messages}, status: :unprocessable_entity 
        end
      end
    
      def update
        @channel = Channel.find_by(id: params["id"])
        @messages = Message.where(channel_id: @channel.id)
        if(@channel && @channel.update(channel_params))
            render :show
        else
            render json: { errors: @channel.errors.full_messages}, status: :unprocessable_entity 
        end
      end
    
    
      def destroy
        @channel = Channel.find_by(id: params["id"])
        if(Channel.destroy(@channel.id))
          render json: {channelid: @channel.id}
        else
          render json: { errors: ['Issue with Delete']}, status: :unprocessable_entity
        end
      end
    
      private
    
        def channel_params
            params.require(:channel).permit(:title)
        end
    
end
