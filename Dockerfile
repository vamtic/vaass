FROM denoland/deno:2.1.9
WORKDIR /yaass
COPY . /yaass
CMD deno task start