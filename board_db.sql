create database if not exists `board_db`;

USE `board_db`;

create table `Users` (
    id BIGINT primary key auto_increment,
    user_id VARCHAR(255) NOT NULL unique,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    phone varchar(255) NOT NULL,
    gender ENUM('M', 'F')
);


create table `Articles` (
	id bigint auto_increment primary key,
	title varchar(255) not null,
    content TEXT NOT NULL,
    author_id bigint not null,
    foreign key (author_id) references `Users` (id) ON delete cascade
);

create table `Comments` (
	id bigint auto_increment primary key,
    article_id bigint not null,
    commenter_id bigint not	null,
    content text not null,
    foreign key (article_id) references `Articles`(id) On delete cascade,
    foreign key (commenter_id) references `Users` (id) on delete cascade
);

select * from `Users`;
select * from `Articles`;
select * from `Comments`;