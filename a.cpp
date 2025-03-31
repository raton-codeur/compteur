#include <iostream>
#include <thread>
#include <atomic>
#include <condition_variable>
#include <chrono>

std::atomic<bool> reset_requested(false);

void watch_for_enter()
{
    std::string input;
    while (true)
    {
        std::getline(std::cin, input);
        reset_requested = true;
    }
}

int main()
{
    int secondes = 0;
    int minutes = 0;

    std::thread input_thread(watch_for_enter);

    while (true)
    {
        std::cout << '\r' << minutes << " : " << secondes << std::flush;
        std::this_thread::sleep_for(std::chrono::seconds(1));
        secondes++;
        if (secondes == 60)
        {
            secondes = 0;
            minutes++;
        }
        if (reset_requested)
        {
            secondes = 0;
            minutes = 0;
            reset_requested = false;
        }
    }
}
