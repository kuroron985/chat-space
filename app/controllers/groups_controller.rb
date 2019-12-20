class GroupsController < ApplicationController
 def new
    @group = Group.new
    @group.users << current_user
  end

  def create
  end
  
  def update
  end

  private
  
end

