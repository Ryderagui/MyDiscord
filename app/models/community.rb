class Community < ApplicationRecord
    validates :title, length: {in:3..30}, presence: true
    validates :privacy, inclusion: { in: [true,false]}
    validates :user_id, presence: true

    belongs_to :author,
    foreign_key: :user_id,
    class_name: :User

    has_many :channels,
    foreign_key: :communities_id,
    dependent: :destroy

    has_many :members,
    foreign_key: :community_id,
    class_name: :Membership,
    dependent: :destroy

    has_many :participants,
    through: :members,
    source: :member



end
