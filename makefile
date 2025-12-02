h = 0
m = 40
s = 0

down :
	@ reset && python3 down.py $h $m $s

up :
	@ reset && python3 new_up.py $m

test :
	@ reset && python3 test.py