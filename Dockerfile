FROM oven/bun:alpine
WORKDIR /yaass
COPY . .
RUN bun install
CMD bun run src/yaass.ts