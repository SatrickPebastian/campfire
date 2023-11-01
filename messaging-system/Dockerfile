# Verwenden Sie eine offizielle Node-Runtime als Basis-Image
FROM node:14

# Setzen Sie das Arbeitsverzeichnis in der Containerumgebung
WORKDIR /usr/src/app

# Kopieren Sie die package.json und package-lock.json (falls vorhanden) in das Arbeitsverzeichnis
COPY package*.json ./

# Installieren Sie die in package.json definierten Abhängigkeiten
RUN npm install

# Kopieren Sie den restlichen Anwendungscode in das Arbeitsverzeichnis
COPY . .

# Setzen Sie den Port, auf dem die Anwendung im Container laufen soll
EXPOSE 3001

# Definieren Sie den Befehl zum Ausführen der Anwendung
CMD [ "node", "index.js" ]