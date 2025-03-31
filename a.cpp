
#include <iostream>
#include <unistd.h>

int main()
{
	int secondes = 0;
	int minutes = 0;
    while (true)
	{
        std::cout << '\r' << minutes << " : " << secondes << std::flush;
        sleep(1);
		secondes++;
		if (secondes == 60)
		{
			secondes = 0;
			minutes++;
		}
    }
}
