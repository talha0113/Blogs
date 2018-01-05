FROM node:9.1.0-slim

RUN apt-get update && apt-get install -yq libgconf-2-4
RUN apt-get install -y python python-dev python-pip python-virtualenv
RUN apt-get update && apt-get install -y wget --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge --auto-remove -y curl \
    && rm -rf /src/*.deb

RUN mkdir -p /e2e
WORKDIR /e2e
COPY package.json .
COPY .npmrc .
RUN npm install
RUN rm -f .npmrc

RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \    
	&& chown -R pptruser:pptruser /e2e/node_modules

USER pptruser