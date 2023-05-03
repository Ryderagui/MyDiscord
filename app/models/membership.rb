class Membership < ApplicationRecord
    validates :member_id, :community_id, presence: true 


    belongs_to :member,
    foreign_key: :member_id,
    class_name: :User

    belongs_to :community,
    foreign_key: :community_id,
    class_name: :Community


end
