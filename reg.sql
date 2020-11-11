drop table if exists registration_num,town;

create table town(
	id serial not null primary key,
	town_name text not null,
    reg_id text not null
);

create table registration_num (
	id serial not null primary key,
	reg_number text not null,
    town_id int not null,
	foreign key (town_id) references town(id)
);

delete from town;
insert into town (town_name,reg_id) values ('Kraaifontein', 'CF');
insert into town (town_name,reg_id) values ('Bellville', 'CY');
insert into town (town_name,reg_id) values ('Stellenboch', 'CL');
insert into town (town_name,reg_id) values ('Cape Town', 'CA'); 