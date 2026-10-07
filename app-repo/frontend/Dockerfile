FROM nginx:1.27-alpine
COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY app.js /usr/share/nginx/html/app.js
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]














# Base image: Official Nginx web server on lightweight Alpine Linux
# FROM nginx:1.27-alpine

# Copies the HTML dashboard file from host machine to Nginx web root directory
# COPY index.html /usr/share/nginx/html/index.html

# Copies the custom CSS styling stylesheet into Nginx web root directory
# COPY style.css /usr/share/nginx/html/style.css

# Copies the JavaScript application logic into Nginx web root directory
# COPY app.js /usr/share/nginx/html/app.js

# Documents that this container listens on HTTP port 80 at runtime
# EXPOSE 80

# Default command executed when container starts: launches Nginx in foreground mode
# CMD ["nginx", "-g", "daemon off;"]
