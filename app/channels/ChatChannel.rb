

class ChatChannel < ApplicationCable::Channel

    def subscribed 
        channel = Channel.find_by(id: params[:channel_id])
        stream_for(channel)
    end
    
end