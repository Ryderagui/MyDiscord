json.community do 
    json.extract! @community,:id, :title, :privacy,:user_id, :created_at, :updated_at
end