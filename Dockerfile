FROM denoland/deno:alpine-2.2.1
WORKDIR /eien

# cache dependencies
COPY deno.json .
RUN deno install

USER deno

# internally cache compiled source
COPY . .
RUN deno cache ./src/eien.ts

CMD deno task start