FROM node:lts-alpine AS build
WORKDIR /genshin

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
RUN cp -R ./node_modules /tmp/node_modules
RUN yarn install --frozen-lockfile

ARG NEXT_PUBLIC_UMAMI_URL
ARG NEXT_PUBLIC_API_PUBLIC
ARG NEXT_PUBLIC_API_INTERNAL

ENV NEXT_PUBLIC_UMAMI_URL $NEXT_PUBLIC_UMAMI_URL
ENV NEXT_PUBLIC_API_PUBLIC $NEXT_PUBLIC_API_PUBLIC
ENV NEXT_PUBLIC_API_INTERNAL $NEXT_PUBLIC_API_INTERNAL

COPY . ./
RUN yarn build

FROM node:lts-alpine
WORKDIR /genshin

COPY --from=build /genshin/package.json ./
COPY --from=build /tmp/node_modules ./node_modules
COPY --from=build /genshin/.next ./.next
COPY --from=build /genshin/public ./public

EXPOSE 3000
CMD ["yarn", "start"]
