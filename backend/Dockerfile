FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY ./*.jar app.jar
EXPOSE 8080
#ENTRYPOINT ["java","-jar","/app.jar"]

# Use OpenJDK 17 as the base image
#FROM openjdk:17-jdk-slim

# Set the working directory inside the container
#WORKDIR /app

# Copy the built JAR file to the container
#COPY build/libs/your-app.jar app.jar  # Use "target/your-app.jar" for Maven

# Expose the port (make sure it matches your Spring Boot app's port)
#EXPOSE 8080

# Set the entry point command to run the JAR file
CMD ["java", "-jar", "app.jar"]
