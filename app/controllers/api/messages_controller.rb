class Api::MessagesController < ApplicationController

    def index 
        @user = current_user
        @channel = Channel.find_by(id: params["channel_id"])
        @messages = Message.where(channel_id: @channel.id)
        render :index
    end

    def create
        @messages = Message.new(message_params);
        @user = User.find_by(id: @messages.author_id)
        @channel = Channel.find_by(id: params["channel_id"]);
        if(@messages.save)
            ChatChannel.broadcast_to(@channel,{
                type: "ADD_MESSAGE",
                payload:{
                    id: @messages.id,
                    body: @messages.body,
                    authorId: @messages.author_id,
                    channelId: @messages.channel_id,
                    createdAt: @messages.created_at,
                    username: @user.username
                },
                
            })
            render json: {}
        else
            render json: { errors: @messages.errors.full_messages}, status: :unprocessable_entity 
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
