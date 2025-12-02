arguments par défaut dans le makefile :
- h : nombre d'heures
- m : nombre de minutes
- s : nombre de secondes

on peut modifier ces variables en faisant make <...> <h/m/s>=<...>

exemples :
- make down s=4 m=3
- make up m=40


make up

chronomètre + alerte visuelle au bout d'un certain temps


make down

minuteur + alerte visuelle à la fin

on utilise juste m, pas h ni s

