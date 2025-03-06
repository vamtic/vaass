FROM denoland/deno:alpine-2.2.3
WORKDIR /yaass

# cache dependencies
COPY deno.json .
RUN deno install

USER deno

# internally cache compiled source
COPY . .
RUN deno cache ./src/yaass.ts

CMD deno task start