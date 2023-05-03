class CreateMemberships < ActiveRecord::Migration[7.0]
  def change
    create_table :memberships do |t|
      t.references :member, null:false
      t.references :community, null:false, foreign_key: true 
      t.timestamps
    end
    add_foreign_key :memberships, :users, column: :member_id, primary_key: "id"
  end
end
