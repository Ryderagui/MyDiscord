class Community < ActiveRecord::Migration[7.0]
  def change
    rename_column :communities, :type, :privacy
  end
end
