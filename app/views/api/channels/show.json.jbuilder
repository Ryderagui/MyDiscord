json.set! "channel" do
    json.extract! @channel,:id, :title, :communities_id, :created_at, :updated_at
end 

json.set! "messages" do 
    @messages.each do |message|
        json.set! message.id do
            json.extract! message,:id, :body, :channel_id, :author_id, :created_at, :updated_at
        end
    end
end
