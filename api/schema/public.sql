set client_min_messages to warning;

create extension if not exists "uuid-ossp";

create schema if not exists public;
create schema if not exists trigger;


-- RLS
-- =============================================================================

-- Reset RLS
-- -----------------------------------------------------------------------------

drop owned by anonymous;
drop role anonymous;

revoke all on all functions in schema public from public cascade;
revoke all on schema public from public cascade;

-- Create Roles
-- -----------------------------------------------------------------------------

create role anonymous;

-- General Permissions
-- -----------------------------------------------------------------------------

grant usage on schema public to anonymous;
grant execute on all functions in schema public to anonymous;


-- Tables
-- =============================================================================

-- Tasks
-- -----------------------------------------------------------------------------

create table if not exists public.tasks (
  id         uuid primary key default public.uuid_generate_v1mc(),
  text       text not null,
  complete   boolean not null default false,
  created_at timestamp without time zone not null
);

alter table public.tasks add column completed_at timestamp without time zone;

comment on table public.tasks is E'@omit update,delete';
comment on column public.tasks.created_at is E'@omit create';
comment on column public.tasks.completed_at is E'@omit create';

grant all on table public.tasks to anonymous;


-- Functions
-- =============================================================================

-- Complete
-- -----------------------------------------------------------------------------

create or replace function public.complete (id uuid) returns void as $$
  update public.tasks
  set complete = true,
      completed_at = 'now'
  where id = $1
$$ language sql volatile;

grant execute on function public.complete (uuid) to anonymous;

-- Uncomplete
-- -----------------------------------------------------------------------------

create or replace function public.uncomplete (id uuid) returns void as $$
  update public.tasks
  set complete = false,
      completed_at = null
  where id = $1
$$ language sql volatile;

grant execute on function public.uncomplete (uuid) to anonymous;


-- Triggers
-- =============================================================================

-- Created At
-- -----------------------------------------------------------------------------

create or replace function trigger.set_created_at() returns trigger as $$
begin
  new.created_at = now();
  return new;
end;
$$ language plpgsql volatile;

drop trigger if exists set_created_at on public.tasks;
create trigger set_created_at before insert on public.tasks for each row
  execute procedure trigger.set_created_at();
