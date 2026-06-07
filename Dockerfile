# syntax=docker/dockerfile:1

ARG NODE_IMAGE=cgr.dev/chainguard/node:latest

FROM --platform=$BUILDPLATFORM ${NODE_IMAGE}-dev AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_SITE_URL=http://localhost:8080
ENV VITE_SITE_URL=${VITE_SITE_URL}

RUN pnpm exec vite build

FROM ${NODE_IMAGE} AS runtime

WORKDIR /app

COPY --from=builder --chown=65532:65532 /app/dist ./dist
COPY --chown=65532:65532 docker/server.mjs ./

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

USER 65532

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD ["/usr/bin/node", "-e", "fetch('http://127.0.0.1:8080/healthz').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]

ENTRYPOINT ["/usr/bin/node"]
CMD ["server.mjs"]
