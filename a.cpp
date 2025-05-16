#include <iostream>
#include <thread>
#include <atomic>
#include <condition_variable>
#include <chrono>
#define A "\033[31m"
#define B "\033[32m"
#define C "\033[33m"
#define D "\033[34m"
#define E "\033[35m"
#define F "\033[36m"
#define RESET "\033[0m"

std::atomic<bool> reset_requested(false);

void watch_for_enter()
{
    std::string input;
    while (true)
    {
        std::getline(std::cin, input);
        reset_requested = true;
        std::cout << std::endl;
    }
}

int main()
{
    int seconds = 0;
    int minutes = 0;

    std::thread input_thread(watch_for_enter);

    while (true)
    {
        if (minutes < 50)
        {
            std::cout << '\r' << minutes << " : " << seconds << std::flush;
        }
        else
        {
            std::cout << std::endl << A << "PRESS ENTER ";
            std::cout << B << "PRESS ENTER ";
            std::cout << C << "PRESS ENTER ";
            std::cout << D << "PRESS ENTER ";
            std::cout << E << "PRESS ENTER ";
            std::cout << F << "PRESS ENTER " << RESET;
        }
        std::this_thread::sleep_for(std::chrono::seconds(1));
        seconds++;
        if (seconds == 60)
        {
            seconds = 0;
            minutes++;
        }
        if (reset_requested)
        {
            seconds = 0;
            minutes = 0;
            reset_requested = false;
        }
    }
    return 0;
}
