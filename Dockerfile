FROM eclipse-temurin:17-jre
ENV PORT 8080
ENV CLASSPATH /opt/lib
EXPOSE 8080

# copy pom.xml and wildcards to avoid this command failing if there's no target/lib directory
COPY pom.xml target/lib* /opt/lib/
COPY startup.sh /opt/

# NOTE we assume there's only 1 jar in the target dir
# but at least this means we don't have to guess the name
# we could do with a better way to know the name - or to always create an app.jar or something
COPY target/*.jar /opt/app.jar
COPY target/static/* /opt/static/
COPY target/static/images/* /opt/static/images/


WORKDIR /opt

CMD /opt/startup.sh