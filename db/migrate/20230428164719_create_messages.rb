class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :body, null:false 
      t.references :author, null:false
      t.references :channel, null:false, foreign_key: true 
      t.timestamps
    end
    add_foreign_key :messages, :users, column: :author_id, primary_key: "id"
  end
end
