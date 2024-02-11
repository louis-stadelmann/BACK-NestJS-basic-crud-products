# Test technique API REST produit

Ce readme a pour objectif de clarifier et d'expliquer certains points de ce projet.

## Framework: NESTJS

> Lien: https://nestjs.com/
> 
## Structure

Un projet NESTJS se divise en plusieurs parties. \
La structure de base est controller -> service -> repository chacun étant responsable d'une partie
du traitement.

Le **controller** gère les routes d'apis. \
Le **service** fait l'intermédiaire entre le controller et le repository pour effectuer d'éventuelles vérifications. \
Le **repository** se charge des appels vers la DB.

Les fichiers modules permettent de spécifier les éléments utilisés dans le scope.

NestJS se base énormément sur les décorateurs et l'injection.
La structure peut rappeler ANGULAR.

## DTOs

Chaques propriétés des dtos est décorés avec les décorateurs fournis par le module class-validator.
Ainsi lorsque NestJs va sérialiser la payload en dto, une validation des propriétés sera effectuée
et cela renvera une erreur si une donnée n'est pas conforme.

## TEST

Le projet est composé de test unitaire et de test end-to-end. \
Les tests end-to-end tournent sur une db de test et non sur la db de prod.

## DOCKER

L'application est complètement dockerizé afin d'avoir le contrôle de l'environnement tant pour l'api
que pour les bases de données.

## POSTMAN

Une collection postman est disponible à la racine du projet, les payloads et params sont automatisé avec
les données de la réponse de la requête de création d'un produit.

## SWAGGER

L'application est aussi fourni avec un swagger

## DIVERS

Les catégories d'un produit n'ont pas de route d'api propre alors je les ai simplement représentées
comme un enum figé.

## EVOLUTIONS POSSIBLES

Intégration du versoning dans l'api.

# INSTRUCTIONS

1. Cloner le projet
2. Installer les packages

````
npm i
````

3. Créer un ficher .env à la racine et copier dedans les valeurs du ficher .env-dev
4. Avoir docker installé
5. Lancer le container

````
docker-compose up -d
````

- Url de base:  [localhost:4000/products](localhost:4000/products)
- Url du swagger:  [localhost:4000/api](localhost:4000/api)

6. Lancer les test unitaires

````
npm run test
````

7Lancer les test end-to-end

````
npm run test:e2e
````
