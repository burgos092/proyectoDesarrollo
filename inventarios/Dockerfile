# Base image para Java
FROM eclipse-temurin:20-jdk-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/main

# Copiar los archivos de configuración de Maven (pom.xml)
COPY ["pom.xml", "./"]

# Instalar las dependencias del proyecto (almacenado en caché para eficiencia)
RUN apk add --no-cache maven && \
    mvn dependency:go-offline -B

# Copiar todo el código fuente al contenedor
COPY . .

# Construir la aplicación con Maven
RUN mvn clean package -DskipTests

# Exponer el puerto que usará la aplicación
EXPOSE 8083

# Cambiar el usuario a uno menos privilegiado (opcional, para seguridad)
RUN addgroup -S spring && adduser -S spring -G spring
USER spring

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "InventariosApplication"]