FROM oven/bun:1.2.15-alpine
WORKDIR /yaass
COPY . .
RUN bun install --production
CMD bun run src/yaass.ts