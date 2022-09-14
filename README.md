# TemplRJS

[![release: 0.1.0](https://img.shields.io/badge/rel-0.1.0-blue.svg?style=flat-square)](https://gitlab.int.dsmz.de/artur.lissin/templrjs)
[![The Unlicense](https://img.shields.io/badge/License-Unlicense-brightgreen.svg?style=flat-square)](https://choosealicense.com/licenses/unlicense/)
[![Husky](https://img.shields.io/badge/Husky-enabled-brightgreen?style=flat-square)](https://github.com/typicode/husky)
[![Prettier Enabled](https://img.shields.io/badge/Prettier-enabled-brightgreen.svg?style=flat-square)](https://github.com/prettier/prettier)
[![ESLint Enabled](https://img.shields.io/badge/ESLint-enabled-brightgreen.svg?style=flat-square)](https://github.com/eslint/eslint)
[![Code Style: Airbnb](https://img.shields.io/badge/code%20style-Airbnb-brightgreen.svg?style=flat-square)](https://github.com/airbnb/javascript)

---

## Description

A template builder for a [reveal.js](https://revealjs.com/) presentation.

---

## Requirements

-   node: ~18.1
-   npm: ~8.8

---

## Docker

First build the image:

```shell
docker build -t pres .
```

For starting the presentation:

1. Simple presentation start:

    ```shell
    docker run --name simple_pres -d -p 8080:80 pres
    ```

2. Change nginx configurations:

    ```shell
    docker run --name simple_pres -d -p 8080:80 -v /new/nginx.conf:/etc/nginx/nginx.conf pres
    ```

    ```shell
    docker run --name simple_pres -d -p 8080:80 -v /new/nginx.d:/etc/nginx/conf.d/ pres
    ```

3. Change presentation configuration:

    ```shell
    docker run --name simple_pres -d -p 8080:80 -v /new/configs:/var/www/configs pres
    ```

4. Change presentation assets (like slides):

    ```shell
    docker run --name simple_pres -d -p 8080:80 -v /new/assets:/var/www/assets pres
    ```
