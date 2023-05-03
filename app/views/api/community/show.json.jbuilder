json.extract! @community,:id, :title, :privacy,:user_id, :created_at, :updated_at
json.default comm.channels.first