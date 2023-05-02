@community.each do |comm|
    json.set! comm.id do
        json.extract! comm,:id, :title, :privacy,:user_id, :created_at, :updated_at
        json.default comm.channels.first
    end
end