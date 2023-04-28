# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do
    Message.destroy_all
    Channel.destroy_all
    Community.destroy_all
    User.destroy_all
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('communities')
    ApplicationRecord.connection.reset_pk_sequence!('channels')
    ApplicationRecord.connection.reset_pk_sequence!('messages')

    User.create!(
        username: "Patrick",
        email: "Fitzgerald@gmail.com",
        password: "password"
    )

    User.create!(
        username: "Jane",
        email: "Tracy@gmail.com",
        password: "tiktok"
    )

    Community.create!(
        title: "App Academy",
        privacy: true,
        user_id: 1
    )

    Community.create!(
        title: "NBA",
        privacy: true,
        user_id: 1
    )

    Community.create!(
        title: "Golden State",
        privacy: true,
        user_id: 1
    )

    Community.create!(
        title: "Chess",
        privacy: true,
        user_id: 1
    )

    Channel.create!(
        title: "General",
        communities_id: 1
    )

    Channel.create!(
        title: "Help",
        communities_id: 1
    )

    Channel.create!(
        title: "Memes",
        communities_id: 1
    )

    Message.create!(
        body: "Hello World",
        author_id: 1,
        channel_id: 1
    )

end