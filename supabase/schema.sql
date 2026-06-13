create extension if not exists "uuid-ossp";

create table users (
  id text primary key,
  email text unique not null,
  name text not null,
  profile_image text not null default '',
  username text unique not null,
  bio text,
  stats jsonb not null default '{"logic":50,"gps":50,"social":50,"tech":50,"speed":50,"leadership":50}'::jsonb,
  created_at timestamptz not null default now(),
  last_login timestamptz not null default now()
);

create table quests (id uuid primary key default uuid_generate_v4(), title text not null, city text not null, duration_hours numeric not null, max_teams int not null default 2, min_players int not null default 3, max_players int not null default 5, description text not null, created_at timestamptz default now());
create table missions (id uuid primary key default uuid_generate_v4(), quest_id uuid references quests(id) on delete cascade, title text not null, description text not null, lat numeric not null, lng numeric not null, radius_meters int not null default 75, type text check (type in ('social','logic','exploration','physical','AR')), completion_rule text check (completion_rule in ('gps_check_in','manual_validation')), timer_minutes int, points int not null default 100, impact_bonus int not null default 0, sort_order int not null);
create table teams (id uuid primary key default uuid_generate_v4(), quest_id uuid references quests(id), name text not null, invite_code text unique not null, score int not null default 0, current_mission_index int not null default 0, created_at timestamptz default now());
create table team_members (team_id uuid references teams(id) on delete cascade, profile_id text references users(id) on delete cascade, role text default 'player', individual_score int not null default 0, primary key(team_id, profile_id));
create table mission_progress (id uuid primary key default uuid_generate_v4(), team_id uuid references teams(id), mission_id uuid references missions(id), profile_id text references users(id), status text not null default 'locked', gps_validated boolean default false, manual_validated boolean default false, points_awarded int default 0, completed_at timestamptz);
create table teammate_feedback (id uuid primary key default uuid_generate_v4(), mission_id uuid references missions(id), reviewer_id text references users(id), teammate_id text references users(id), contribution int check(contribution between 1 and 5), intelligence int check(intelligence between 1 and 5), impact int check(impact between 1 and 5), created_at timestamptz default now());
create table chat_messages (id uuid primary key default uuid_generate_v4(), team_id uuid references teams(id) on delete cascade, profile_id text references users(id), body text not null, created_at timestamptz default now());
