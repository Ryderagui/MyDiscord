



class CommunityChannel < ApplicationCable::Channel

    def subscribed 
        community = Community.find_by(id: params[:community_id])
        stream_for(community)
    end
    
end