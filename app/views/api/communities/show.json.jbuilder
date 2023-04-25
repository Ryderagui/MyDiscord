json.community do 
    json.extract! @community,:id, :title, :type,:user_id, :created_at, :updated_at
end