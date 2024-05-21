# Base de donnée

À des fins pédagogiques, ce projet utilise une base de donnée faite maison en C++.

Dans un premier temps, cette base de donnée va juste charger un fichier en mémoire et effectuer des opération CRUD dessus. L'objectif à terme est d'améliorer ce système jusqu'à obtenir un système à peu près complet.

# Objectifs

## Premier jet

Données stockées en ascii, la base de donnée de permet que de faire des CRUDs simples sur une table à la fois. La base de donnée est stockée en entière dans la RAM.

Statut: _OK_

## Deuxième jet

* Ajout de clefs primaires et étrangères
* Tout "binariser"
  * Les lignes doivent avoir la même taille => les textes sont stoqués sur un morceau de mémoire différent des lignes
  * utilisation d'un allocateur mémoire personalisé (plus rapide que malloc car même taille + pas d'interface avec l'OS)
  * "séréalisation" des données en "petit boutiste" sur un fichier
* préférer une interface "iterateur" (inspiré de la STL) plutôt que de reconstruire des tables à chaque requête

## Troisième jet

* Optimisations: préparation des requêtes
  * Principe: il est possible d'associer à certain champs des tables une relation d'ordre, utiliser une structure arboréscente pour "pré trier" la table et calculer certaines requêtes en O(log(N)) plutôt que O(N)

## Quatrième jet

* Front-end: implémenter une interface SQL au "back"