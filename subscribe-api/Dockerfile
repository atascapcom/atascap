# Matches how the rest of this VPS runs its services (Docker + OpenLiteSpeed
# proxy). No dependencies to install — the service uses only Node built-ins.
FROM node:22-alpine

WORKDIR /app
COPY server.mjs token.mjs ./

# Never run as root inside the container.
USER node

ENV NODE_ENV=production
EXPOSE 3010

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3010)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.mjs"]
