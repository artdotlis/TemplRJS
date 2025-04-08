# TemplRJS

[![release: 2025.04.0](https://img.shields.io/badge/rel-2025.04.0-blue.svg?style=flat-square)](https://github.com/artdotlis/TemplRJS)
[![MIT LICENSE](https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square)](https://choosealicense.com/licenses/mit/)
[![reveal.js](https://img.shields.io/badge/reveal.js-enabled-brightgreen?style=flat-square)](https://revealjs.com/)

[![Husky](https://img.shields.io/badge/Husky-enabled-brightgreen?style=flat-square)](https://github.com/typicode/husky)
[![Bun](https://img.shields.io/badge/Bun-enabled-brightgreen?style=flat-square)](https://github.com/oven-sh/bun)

---

## Description

A template builder for a [reveal.js](https://revealjs.com/) presentation.

---

## Requirements

### Default

- GNU/Linux
- GIT: ~2.49
- NODEJS: ~22

### Dev Container

- Docker
- Docker - Compose

---

## Docker

Use docker compose in project root:

```shell
docker compose up -d
```

The presentation is available at
`http://localhost:9080` by default. The port may vary based on your `.env` file's
`NGINX_PORT` setting.
