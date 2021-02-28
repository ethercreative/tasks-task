.DEFAULT_GOAL := help

# Include our local ENV file
include .env

# Variables
red=\033[31m
blue=\033[36m
grey=\033[37m
green=\033[32m
pink=\033[95m
blank=\033[0m
help_padding=10

## ======================
##     🎯 Tasks Task
## ----------------------

.PHONY: help
help:
	@grep -E '^([a-zA-Z_-]+:.*?## .*)|(^##.*\.?)$$' $(MAKEFILE_LIST) | awk '{gsub(/^Makefile:/,"")}; BEGIN {FS = "(:.*?## )"}; {gsub(/^## /,"\033[95m");} {gsub(/^### /,"\n\033[95m");} {gsub(/^##_/,"");} {printf "\033[36m%-$(help_padding)s\033[0m %s\n", $$1, $$2}'

### 🔗 Database

.PHONY: migrate
migrate: ## Migrate SQL Schema
	@echo "$(grey)Migrating schema...$(blank)"
	@make m file=public
	@echo "$(green)Migration complete (hopefully)!$(blank)"

m:
	@echo "$(blue)Migrating $(file)$(blank)"
	@docker-compose exec -T $(PGHOST) psql --quiet -U $(PGUSER) -d $(PGDATABASE) < ./schema/$(file).sql

### 🐳 Docker

.PHONY: up
up: ## Run docker
	@echo "$(grey)Raising docker containers from the dead$(blank)"
	@docker-compose up -d

.PHONY: down
down: ## Bring docker down
	@echo "$(grey)Taking the docker containers live on a farm$(blank)"
	@docker-compose down --remove-orphans

.PHONY: build
build: ## Pull and build docker
	@echo "$(grey)Attempting to pull docker at the bar$(blank)"
	@docker-compose pull;
	@docker-compose build --pull --no-cache;

.PHONY: prune
prune: ## Prune docker
	@echo "$(grey)Giving docker a good pruning$(blank)"
	@docker system prune -f;

##_
## =====================
