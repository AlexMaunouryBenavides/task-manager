
create table user (
  id int AUTO_INCREMENT primary key,
  name varchar(100) not null,
  lastname varchar(100),
  email varchar(255) not null unique,
  password varchar(255) not null,
  role enum('admin', 'collaborator') not null
);

create table project (
  id int AUTO_INCREMENT primary key,
  title varchar(100) not null,
  description text,
  created_at datetime default current_timestamp
);

create table task (
  id int AUTO_INCREMENT primary key,
  title varchar(100) not null,
  description text,
  status ENUM('todo','in_progress','done') DEFAULT 'todo',
  created_at datetime default current_timestamp,
  project_id int not null,

  constraint fk_task_project
    foreign key(project_id) references project(id) on delete cascade
);

-- fake données généré avec IA 
-- Insert fake user
INSERT INTO user (name, lastname, email, password, role)
VALUES (
  'John',
  'Doe',
  'john.doe@email.com',
  '1234',
  'admin'
);
-- Insert fake project
INSERT INTO project (title, description)
VALUES (
  'Task Manager App',
  'Application de gestion de projets et de tâches'
);
-- Insert fake task
INSERT INTO task (title, description, status, project_id)
VALUES (
  'Créer la base de données',
  'Mettre en place le schema SQL',
  'todo',
  1
);
