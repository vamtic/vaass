FROM oven/bun:1.2.10-alpine
WORKDIR /yaass
COPY . .
RUN bun install --production
CMD bun run src/yaass.ts