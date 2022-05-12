FROM node:16-alpine as build


RUN npm install -g pnpm

WORKDIR /repo

COPY . .

RUN chmod +x entrypoint.sh

RUN pnpm install && pnpm release

FROM nginx:alpine
COPY --from=build /repo/public /etc/nginx/html
COPY --from=build /repo/nginx/conf.d/default.template /etc/nginx/conf.d/default.template
COPY --from=build /repo/entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]



