@messages.each do |message|
    json.set! message.id do
        json.extract! message,:id, :body, :channel_id, :author_id, :created_at, :updated_at
        json.username message.author.username
    end
end