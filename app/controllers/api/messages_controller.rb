class Api::MessagesController < ApplicationController

    def index 
        @user = current_user
        @channel = Channel.find_by(id: params["channel_id"])
        @messages = Message.where(channel_id: @channel.id)
        render :index
    end

    def create
        @message = Message.new(message_params);
        @channel = Channel.find_by(id: params["channel_id"]);
        @message.channel_id = @channel.id;
        if(@message.save)
            render :index
        else
            render json: { errors: @message.errors.full_messages}, status: :unprocessable_entity 
        end
    end

    def destroy
        @message = Message.find_by(id: params["id"])
        if(Message.destroy(@message.id))
          render json: {messageid: @message.id}
        else
          render json: { errors: ['Issue with Delete']}, status: :unprocessable_entity
        end
    end

    private 

    def message_params
        params.require(:message).permit(:body,:author_id,:channel_id)
    end
    
end
