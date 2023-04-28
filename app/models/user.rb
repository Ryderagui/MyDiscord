class User < ApplicationRecord
    has_secure_password

    validates :username, uniqueness: true, length: { in:2..30}
    validates :email, uniqueness: true, length: {in:3..50}, format: {with: URI::MailTo::EMAIL_REGEXP}
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: {in:6..100}, allow_nil: true

    before_validation :ensure_session_token

    def self.find_by_credentials(credentials,password)
        check = credentials =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
        user = User.find_by(check => credentials)
        if(user)
            return user.authenticate(password)
        else
            return false 
        end
    end

    def reset_session_token!
        token = generate_unique_session_token
        self.update!(session_token: token)
        token
    end

    has_many :created_communities,
        foreign_key: :user_id,
        class_name: :Community,
        dependent: :destroy

    private

    def generate_unique_session_token
        token = SecureRandom.urlsafe_base64
        while(User.exists?(session_token: token)) do
            token = SecureRandom.urlsafe_base64
        end
        token
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end
end
