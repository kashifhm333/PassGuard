# --- Stage 1: Build and Install Production Dependencies ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies cleanly
RUN npm ci --only=production

# Copy the rest of the backend source code
COPY . .m


# --- Stage 2: Ultra-Lightweight & Secure Distroless Runtime ---
FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /app

# Copy the pre-built node_modules and source files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.js ./

# Expose the application port
EXPOSE 3000

# Distroless node images have 'node' set as the entrypoint, 
# so you only need to pass the script path as the argument.
CMD ["server.js"]