ARG NODE_VER="22"

FROM docker.io/almalinux:9 AS appbuilder

ARG BIN_DEPLOY
ARG CONTAINER="container"

COPY . /tmp/app

WORKDIR /tmp/app

RUN dnf install -y bash
RUN bash "./${BIN_DEPLOY}"

FROM docker.io/almalinux:9 AS release

ARG USERNAME=runner
ARG USER_UID=1001
ARG USER_GID=${USER_UID}
ARG HOME_MAIN="/home/${USERNAME}"

RUN dnf install -y bash

RUN userdel -r ${USERNAME} 2>/dev/null || true
RUN groupdel ${USERNAME} 2>/dev/null || true 
RUN groupadd --gid ${USER_GID} ${USERNAME}
RUN useradd --uid ${USER_UID} --gid ${USER_GID} -m -d ${HOME_MAIN} ${USERNAME} 
RUN mkdir -p ${HOME_MAIN} \
    && chown ${USERNAME}:${USERNAME} -R ${HOME_MAIN}

ARG DOCKER_ENV_DIR
ARG BUN_VER
ARG BIN_DEPLOY_REQ_SERVER
ARG NODE_VER

COPY ./${BIN_DEPLOY_REQ_SERVER} /install.sh
RUN bash /install.sh && rm /install.sh

COPY --from=appbuilder /entry.sh  /entry.sh
COPY --from=appbuilder /health.sh  /health.sh
COPY --from=appbuilder $DOCKER_ENV_DIR/* $DOCKER_ENV_DIR/

RUN rm -rf /tmp/app

WORKDIR /var/www/

RUN rm -rf /var/www/*

COPY --from=appbuilder /var/www/ ./

RUN chown ${USERNAME}:${USERNAME} -R /var/www/

HEALTHCHECK --interval=30s --timeout=3s --retries=2 CMD /bin/bash /health.sh

USER ${USERNAME}

WORKDIR ${HOME_MAIN}

ENTRYPOINT ["/bin/bash", "/entry.sh"]