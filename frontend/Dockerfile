FROM nginx:alpine

# Eliminar archivos de configuración predeterminados de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar archivos estáticos
COPY . /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]