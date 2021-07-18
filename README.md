===========================================
        Plateforme de paiement en ligne
        Projet Scolaire ESGI 2021
===========================================

# Projet Node, React, Mongo

## Installation avec docker

```
docker-compose build --no-cache
docker-compose up -d 
docker-compose run --rm server npm uninstall nodemon
docker-compose run --rm server npm install nodemon --include=dev
docker-compose run --rm server npm start
```

## Client 

```
docker-compose run --rm client npm start
```

## Server 

```
docker-compose run --rm server npm start
```

## Mongo

```
docker-compose exec mongo mongo -u root -p password
docker-compose exec mongorestore mongo -u root -p password
```

## Participants

- Yanis FENICHE
- Abdellatif CHALAL
- Johan TRAVERT
- Mohamed El Amine BOUHADJAR


