FROM denoland/deno:alpine-2.2.3
WORKDIR /yaass

# cache dependencies
COPY deno.json .
RUN deno install

# ! broken with deno 2.2.3 for some reason
#USER deno

# internally cache compiled source
COPY . .
RUN deno cache ./src/yaass.ts

CMD deno task start