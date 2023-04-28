@channels.each do |channel|
    json.set! channel.id do
        json.extract! channel,:id, :title, :communities_id, :created_at, :updated_at
    end
end