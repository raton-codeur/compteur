test :
	@ c++ a.cpp
	@ reset
	@./a.out

clean :
	rm a.out