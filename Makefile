ifeq ($(CONTAINER),container)
$(info Makefile enabled, proceeding ...)
else	
$(error Error: Makefile disabled, exiting ...)
endif

ROOT_MAKEFILE:=$(abspath $(patsubst %/, %, $(dir $(abspath $(lastword $(MAKEFILE_LIST))))))

include $(ROOT_MAKEFILE)/.env
include $(PRES_ENV)

export

BUN_DIR=$(HOME)/$(BUN_DIR_R)
BUN_BIN=$(HOME)/$(BUN_BIN_R)
BUN=$(BUN_BIN)/bun

export PATH:=$(PATH):$(BUN_BIN)

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
	rm -rf $(ROOT_MAKEFILE)/$(CACHE_DIR)

uninstall: clean
	[ -f "$(BUN)" ] && $(BUN) pm cache rm || echo "not installed"
	rm -rf $(BUN_DIR)

runAct: 
	echo "starting environment"
	bash

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

runPreCommit: NODE_ENV = development
runPreCommit: createBuild 
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
export_runUpdate: clean
	echo "UPDATE NODE -> $(NODE_ENV)"
	rm -f $(ROOT_MAKEFILE)/*.lock
	$(BUN) update
