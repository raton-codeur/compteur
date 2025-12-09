import time, sys, select

heures = int(sys.argv[1])
minutes = int(sys.argv[2])
secondes = int(sys.argv[3])
print(f"compte à rebours de {heures:02d}:{minutes:02d}:{secondes:02d}")

total = heures * 3600 + minutes * 60 + secondes

while total >= 0 :
   h = total // 3600
   m = (total % 3600) // 60
   s = total % 60
   print(f"\r{h:02d}:{m:02d}:{s:02d}", end="", flush=True)
   time.sleep(1)
   total -= 1
print()

RED     = "\033[31m"
GREEN   = "\033[32m"
YELLOW  = "\033[33m"
BLUE    = "\033[34m"
MAGENTA = "\033[35m"
CYAN    = "\033[36m"
RESET   = "\033[0m"

# while True :
#    for color in [RED, GREEN, YELLOW, BLUE, MAGENTA, CYAN] :
#       print(f"{color}DONE{RESET} ", end="", flush=True)
#       time.sleep(0.01)

print("press enter to stop...")

# notes sur la fonction select : select.select(liste_lecture, liste_ecriture, liste_erreur, timeout)
# renvoie : (lisibles, ecrivables, erreurs)

while True:
    if sys.stdin in select.select([sys.stdin], [], [], 0)[0]: # stdin contient une ligne
        sys.stdin.readline()  # vider le buffer
        break

    for color in [RED, GREEN, YELLOW, BLUE, MAGENTA, CYAN]:
        print(f"{color}DONE{RESET} ", end="", flush=True)
        time.sleep(0.01)

print("\ndone")
