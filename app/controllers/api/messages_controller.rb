class Api::MessagesController < ApplicationController
    before_action :require_logged_in

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
                message: {
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

    def update
        @messages = Message.find_by(id: params[:id]);
        @user = User.find_by(id: @messages.author_id)
        @channel = Channel.find_by(id: params[:channel_id]);
        verify = @messages.author_id & @current_user.id
        if(@messages.update(message_params))
            ChatChannel.broadcast_to(@channel,{
                type: "ADD_MESSAGE",
                message: {
                    id: @messages.id,
                    body: @messages.body,
                    authorId: @messages.author_id,
                    channelId: @messages.channel_id,
                    createdAt: @messages.created_at,
                    updatedAt: @messages.updated_at,
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
        @channel = Channel.find_by(id: params[:channel_id]);
        if(Message.destroy(@message.id))
            ChatChannel.broadcast_to(@channel,{
                type: "REMOVE_MESSAGE",
                message:{
                    id: @message.id,
                    body: @message.body,
                    authorId: @message.author_id,
                    channelId: @message.channel_id,
                    createdAt: @message.created_at,
                    updatedAt: @message.updated_at,
                },
                
            })
          render json: {}
        else
          render json: { errors: ['Issue with Delete']}, status: :unprocessable_entity
        end
    end

    private 

    def message_params
        params.require(:message).permit(:body,:author_id,:channel_id)
    end
    
end
