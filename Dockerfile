FROM denoland/deno:2.1.9
WORKDIR /yaass
COPY . .
CMD deno task start