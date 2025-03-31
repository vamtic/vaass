FROM oven/bun:alpine
WORKDIR /yaass
COPY . .
RUN bun install --production
CMD bun run src/yaass.ts