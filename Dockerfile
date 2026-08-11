# --- Stage 1: Build the React Application ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files to leverage caching for dependencies
COPY package*.json ./

# Install all dependencies cleanly
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the app (Vite generates optimized static assets in the 'dist' folder)
RUN npm run build


# --- Stage 2: Serve with Ultra-Lightweight Nginx ---
FROM nginx:alpine

# Copy only the compiled production files from the builder stage to Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]