class ApplicationController < ActionController::API

    def current_user 
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def require_logged_in 
        if logged_in? == false
            render json: { message: 'Please Login'}, status: :unauthorized
        end
    end

    def require_logged_out
        if logged_in?
            render json: { message: 'Already logged in'}, status: :unauthorized
        end
    end

    def logged_in?
        !!current_user
    end

    def login!(user)
       session[:session_token] = user.reset_session_token!
        @current_user = user
        return true 
    end

    def logout!
        if logged_in?
            @current_user.reset_session_token!
            @current_user = nil
            session[:session_token] = nil
        end

    end


    
    

end
