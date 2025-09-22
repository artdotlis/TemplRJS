FROM docker.io/rockylinux:9

ARG BUN_BIN
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=${USER_UID}
ARG WORK_DIR=/workspace
ARG HOME_MAIN="/HOME_MAIN/${USERNAME}"
ENV CONTAINER="container"
ENV PATH="${HOME_MAIN}/${BUN_BIN}:${HOME_MAIN}/.local/bin:${PATH}"

ARG BIN_DEPLOY_PREP
ARG BIN_DEPLOY_REQ

COPY . /tmp/app

WORKDIR /tmp/app

RUN bash "./${BIN_DEPLOY_PREP}" && bash "./${BIN_DEPLOY_REQ}"

WORKDIR /

RUN rm -rf /tmp/app

RUN groupadd --gid ${USER_GID} ${USERNAME} \
    && useradd --uid ${USER_UID} --gid ${USER_GID} -m -d ${HOME_MAIN} ${USERNAME} 

RUN mkdir -p ${WORK_DIR} && \
    chown ${USERNAME}:${USERNAME} -R ${WORK_DIR} && \
    chown ${USERNAME}:${USERNAME} -R ${HOME_MAIN}

RUN git config --global --add safe.directory ${WORK_DIR}

HEALTHCHECK --interval=60s --timeout=6s --retries=1 CMD exit 0

USER ${USERNAME}

ENTRYPOINT ["/bin/sh", "/entry_dev.sh"]