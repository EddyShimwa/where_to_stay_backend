Table students {
  id integer [primary key]
  username varchar
  campus varchar
  created_at timestamp
}

Table landlords {
  id integer [primary key]
  username varchar
  property_ownership varchar
  created_at timestamp
}

Table properties {
  id integer [primary key]
  street_address varchar
  status varchar
  district varchar
  sector varchar
  location varchar
  rental_price decimal
  property_type varchar
  number_of_rooms integer
  bedrooms integer
  rent_period varchar
  description text
  landlord_id integer [ref: > landlords.id]
  created_at timestamp
}

Table applications {
  id integer [primary key]
  property_id integer [ref: > properties.id]
  student_id integer [ref: > students.id]
  application_date timestamp
  status enum('Pending', 'Approved', 'Rejected')
}