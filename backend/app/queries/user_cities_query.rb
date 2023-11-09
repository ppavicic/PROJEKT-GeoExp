class UserCitiesQuery
  def initialize(user_id)
    @relation = UserCity
    @user_id = user_id
  end

  def update_user_cities
    City.find_each { |city| create_record(city.id) }
    initial_active
  end

  def initial_active
    relation.where(user_id: user_id).sample.update(status: 'active')
  end

  private

  attr_accessor :relation, :user_id

  def create_record(city_id)
    relation.create(city_id: city_id, user_id: @user_id, status: 'inactive')
  end
end
