# Use the official NGINX image
FROM nginx:alpine

# Copy custom NGINX configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
