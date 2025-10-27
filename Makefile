ifeq ($(CONTAINER),container)
$(info Makefile enabled, proceeding ...)
else	
$(error Error: Makefile disabled, exiting ...)
endif

SHELL := /bin/bash
ROOT_MAKEFILE:=$(abspath $(patsubst %/, %, $(dir $(abspath $(lastword $(MAKEFILE_LIST))))))

include $(ROOT_MAKEFILE)/.env
include $(PRES_ENV)

export
BUN_DIR=$(HOME)/$(BUN_DIR_R)
BUN_BIN=$(HOME)/$(BUN_BIN_R)
BUN=$(BUN_BIN)/bun --bun

export PATH:=$(PATH):$(BUN_BIN)
OLLAMA_MODEL?=gpt-oss:20b

dev: NODE_ENV = development
dev: setupGit setupBun postInstall
	$(BUN) install --frozen-lockfile
	$(BUN) run hook

build: NODE_ENV = production
build: setupBun postInstall 
	$(BUN) install --frozen-lockfile

setupGit:
	git config core.editor vim
	git lfs install --force

setupBun:	
	mkdir -p "${HOME}/.local/bin"
	bash $(ROOT_MAKEFILE)/$(BIN_INSTALL_BUN)	

postInstall:
	bash $(ROOT_MAKEFILE)/$(BIN_DEPLOY_FIX)

cleanBuild:
	rm -rf $(ROOT_MAKEFILE)/$(APP)

clean: cleanBuild
	rm -rf $(ROOT_MAKEFILE)/node_modules
	rm -rf $(ROOT_MAKEFILE)/$(PRES_PKG)/node_modules
	rm -rf $(ROOT_MAKEFILE)/$(CACHE_DIR)

uninstall: clean
	[ -f "$(BUN)" ] && $(BUN) pm cache rm || echo "not installed"
	rm -rf $(BUN_DIR)

createBuild: NODE_ENV = production
createBuild: cleanBuild
	$(BUN) run build || (echo "FAILED"; exit 1)

runChecks: NODE_ENV = development
runChecks: dev
	$(BUN) run lint
	$(BUN) run lint:dev
	$(BUN) run lint:pres
	$(BUN) run lint:shell
	$(BUN) run lint:format

runChecksNew: NODE_ENV = development
runChecksNew: dev 
	$(BUN) run lint

runBuild: build createBuild	

runStage: NODE_ENV = production
runStage: build createBuild		
	$(BUN) run serve || (echo "FAILED"; exit 1)

runDev: NODE_ENV = development
runDev: dev
	$(BUN) run dev ||(echo "FAILED"; exit 1)

runUpdate: %: export_% dev

export_runUpdate: NODE_ENV = development
export_runUpdate:
	echo "UPDATE NODE -> $(NODE_ENV)"
	rm -rf bun.lock
	$(BUN) install --lockfile-only --exact --no-cache
	$(BUN) update
	$(BUN) pm cache rm
	$(MAKE) clean

PROMPT=Generate a commit message in the Conventional Commits 1.0.0 format based on the following git diff. The commit message must: \n\
- Follow this structure: \n\
1. Commit type (e.g., feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert) \n\
2. Optional scope in parentheses (e.g., feat(auth):) \n\
3. A brief, lowercase description in present tense on the first line \n\
4. Optional body with detailed explanation (can use uppercase) \n\
5. Optional footer(s) with breaking changes, issue references (e.g., Closes \#123), or co-authors (e.g., Co-authored-by: Name) \n\
- Formatting rules: \n\
1. The first line must be entirely lowercase \n\
2. Body and footer may use uppercase letters \n\
3. Follow Conventional Commits 1.0.0 strictly \n\
4. Return only the commit message as plain text (no extra formatting, no markdown) \n\
5. Do NOT mention - no breaking changes \n\
6. Body lines must not be longer than 100 characters \n\
- Example: \n\
feat(auth): add user login API\n\
\n\
Added support for user login via OAuth2. This allows users to authenticate\n\
using their Google account.\n\
\n\
Closes \#42\n\

message:
	@if [ -z "$(COMMIT_MSG_FILE)" ]; then \
		echo "Error: COMMIT_MSG_FILE is not set"; \
		exit 1; \
	fi
	git diff --staged -- . ':(exclude)*bun.lock' | \
		jq -Rs --arg prompt "$(PROMPT)" '{"stream": false, "model": "$(OLLAMA_MODEL)", "prompt": (" <GIT_DIFF> " + . + " </GIT_DIFF> " + $$prompt)}' | \
		curl -s -X POST http://ollama:11434/api/generate \
			-H "Content-Type: application/json" \
			-d @- | \
		jq -r 'select(.done == true) | .response' > $(COMMIT_MSG_FILE)
	vim $(COMMIT_MSG_FILE)
	sed -i 's/^[ \t]*//; s/[ \t]*$$//' $(COMMIT_MSG_FILE)
	@if [ -s $(COMMIT_MSG_FILE) ]; then \
		$(BUN) run commitlint -e $(COMMIT_MSG_FILE); \
	else \
		echo "$(COMMIT_MSG_FILE) is empty, aborting."; \
		exit 1; \
	fi

runMessage: dev
	@if curl -sf http://ollama:11434; then \
		$(MAKE) message; \
	else \
		$(BUN) run cz --hook; \
	fi
