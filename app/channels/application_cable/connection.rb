module ApplicationCable
  class Connection < ActionCable::Connection::Base

  def connect 
    puts "connecting"
  end 

  end
end
