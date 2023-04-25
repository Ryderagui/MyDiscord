class CreateCommunities < ActiveRecord::Migration[7.0]
  def change
    create_table :communities do |t|
      t.string :title, null:false
      t.boolean :type, null:false, default: true
      t.references :user, null:false, foreign_key: true 
      t.timestamps
    end
  end
end
