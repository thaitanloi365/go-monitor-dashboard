.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
.DEFAULT_GOAL := help

linter:
	@yarn run lint-staged
	
git_release_patch: linter
	@read -p "Enter commit: " commit; \
	read -p "Are you sure you want to push to current branch with commit = $$commit #patch, default is Yes: " answer;\
	answer=$${answer:-y};\
	if [ $$answer != "$${answer#[Yy]}" ] ;then\
		if [ -z "$$commit" ];then\
			echo "Using default commit, skip create tag";\
		else\
			echo "Using commit $$commit";\
			./scripts/increase_version.sh "$$commit #patch";\
		fi;\
	fi;

git_release_minor: linter
	@read -p "Enter commit: " commit; \
	read -p "Are you sure you want to push to current branch with commit = $$commit #minor, default is Yes:" answer; \
	answer=$${answer:-y};\
	if [ $$answer != "$${answer#[Yy]}" ] ;then\
		if [ -z "$$commit" ];then\
			echo "Using default commit, skip create tag";\
		else\
			echo "Using commit $$commit";\
			./scripts/increase_version.sh "$$commit #minor";\
		fi;\
	fi;

git_release_major: linter
	@read -p "Enter commit: " commit; \
	read -p "Are you sure you want to push to current branch with commit = $$commit #major, default is Yes: " answer; \
	answer=$${answer:-y};\
	if [ $$answer != "$${answer#[Yy]}" ] ;then\
		if [ -z "$$commit" ];then\
			echo "Using default commit, skip create tag";\
		else\
			echo "Using commit $$commit";\
			./scripts/increase_version.sh "$$commit #major";\
		fi;\
	fi;
