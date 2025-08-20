FROM node:20-slim

RUN echo "deb http://deb.debian.org/debian bullseye main" > /etc/apt/sources.list.d/bullseye.list && \
    apt-get update && \
    apt-get install -y libssl1.1 && \
    rm -rf /var/lib/apt/lists/* && \
    rm /etc/apt/sources.list.d/bullseye.list

# Set working directory
WORKDIR /app

COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install
COPY prisma ./prisma
RUN npx prisma generate --schema=prisma/mainDB/schema.prisma

# Copy the rest of the application code
COPY . .

# Build the Next.js app
# RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js app
# CMD ["npm", "start"]

CMD ["npm","run","dev"]