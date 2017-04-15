/*
 * Dhruv K Patel
 */

#ifndef LEDSIGN_LED_STRIP_H
#define LEDSIGN_LED_STRIP_H

#include <iostream>

using namespace std;

class led_strip {

public:

    led_strip(int serial_pin);

    void add_row(int row, int *indicies);

    void set_row_state(int row, int state);

    void set_row_color(int row, int r, int g, int b);

};

#endif //LEDSIGN_LED_STRIP_H
