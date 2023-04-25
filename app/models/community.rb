class Community < ApplicationRecord
    validates :title, length: {in:3..30}, presence: true
    validates :type, inclusion: { in: [true,false]}, presence: true
    validates :user_id, presence: true

    belongs_to :author,
    foreign_key: :user_id,
    class_name: :User 

end
