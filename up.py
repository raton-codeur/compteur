import sys
import time
import select

RED     = "\033[31m"
GREEN   = "\033[32m"
YELLOW  = "\033[33m"
BLUE    = "\033[34m"
MAGENTA = "\033[35m"
CYAN    = "\033[36m"
RESET   = "\033[0m"

MAX_MINUTES = int(sys.argv[1])
print(f"chronomètre jusqu'à {MAX_MINUTES:02d} minutes")

def wait_for_enter():
    print()
    print("press enter to reset...")

    while True:
        if sys.stdin in select.select([sys.stdin], [], [], 0)[0]: # si stdin contient une ligne
            sys.stdin.readline() # vider le buffer
            break

        for color in [RED, GREEN, YELLOW, BLUE, MAGENTA, CYAN]:
            print(f"{color}PRESS ENTER TO RESET{RESET} ", end="", flush=True)
            time.sleep(0.05)

minutes = 0
seconds = 0
while True:
	while minutes < MAX_MINUTES:
		print(f"\r{minutes:02d}:{seconds:02d}", end="", flush=True)
		time.sleep(1)
		seconds += 1
		if seconds == 60:
			seconds = 0
			minutes += 1

	wait_for_enter()

	minutes = 0
	seconds = 0
	print("\033[2J\033[H", end="")
	print(f"chronomètre jusqu'à {MAX_MINUTES:02d} minutes")

