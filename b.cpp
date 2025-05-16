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
    bool break_message_displayed = false;

    std::thread input_thread(watch_for_enter);
    input_thread.detach();  // On détache le thread pour qu’il continue indépendamment

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

        if (minutes >= 45 && !break_message_displayed)
        {
            std::cout << "\n\n⏰ 45 minutes écoulées ! Appuie sur Entrée pour recommencer." << std::endl;
            break_message_displayed = true;
        }

        if (reset_requested)
        {
            secondes = 0;
            minutes = 0;
            reset_requested = false;
            break_message_displayed = false; // On remet à false pour le prochain cycle
        }
    }

    return 0;
}
