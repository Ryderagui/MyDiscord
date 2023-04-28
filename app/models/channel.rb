class Channel < ApplicationRecord
    validates :title, length: {in:3..30}, presence: true
    validates :communities_id, presence: true

    belongs_to :community,
    foreign_key: :communities_id,
    class_name: :Community

    has_many :messages,
    foreign_key: :channel_id,
    class_name: :Channel 
    
end
