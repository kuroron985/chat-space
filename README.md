# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|e_mail|string|null: false|
|password|string|null: false|
|user_name|string|null: false|

### Association
- has_many :messeges
- has_many :grops_users
- has_many :grops, through: :grops_users

## messeges テーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belong_to :grop

## gropsテーブル
|Column|Type|Options|
|------|----|-------|
|grop_name|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|messege_id|integer|null: false, foreign_key: true|

### Association
- has_many :users, through: :grops_users
- has_many :messeges
- has_many :grops_users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user