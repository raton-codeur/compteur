#include <iostream>
#include <unistd.h>
#include <thread>
#include <chrono>

#define A "\033[31m"
#define B "\033[32m"
#define C "\033[33m"
#define D "\033[34m"
#define E "\033[35m"
#define F "\033[36m"
#define RESET "\033[0m"

#define MAX_MINUTES 60

void watch_for_enter()
{
    std::string input;
	std::getline(std::cin, input);
	execlp("make", "make", "--no-print-directory", nullptr);
}

int main()
{
    int seconds = 0;
    int minutes = 0;

    std::thread input_thread(watch_for_enter);

    while (minutes < MAX_MINUTES)
    {
		std::cout << '\r' << minutes << " : " << seconds << " " << std::flush;
		std::this_thread::sleep_for(std::chrono::seconds(1));
		seconds++;
		if (seconds == 60)
		{
			seconds = 0;
			minutes++;
		}
	}
	while (true)
	{
		std::cout << A << "PRESS ENTER ";
		std::cout << B << "PRESS ENTER ";
		std::cout << C << "PRESS ENTER ";
		std::cout << D << "PRESS ENTER ";
		std::cout << E << "PRESS ENTER ";
		std::cout << F << "PRESS ENTER " << RESET;
	}
    return 0;
}
