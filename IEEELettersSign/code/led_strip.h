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

    void add_row(int row, int *indices);

    void set_row_state(int row, int state);

    void set_row_color(int row, int r, int g, int b);

    void IEEEdemo(int endRow, int rowsAlwaysOn, float time){
        time = time/2(*endrow);
        for(int i = 1; i<=rowsAlwaysOn; i++){
            increase(i, time);
        }
        for(int i = rowsAlwaysOn+1; i<=endrow; i++){
            increase(i, time);
            decrease(i-rowsAlwaysOn, time);
        }
        for(int i = endrow-rowsAlwaysOn+1; i<=endrow; i++){
            decrease(i, time);
        }
    }

    void increase(int row, int time){
        int value = 0;
        int increment = time*10;
        while(value <= 100){
            set_row_state(row, value);
            value+=10;
            delay(increment);
        }
    }

    void decrease(int row, int time){
        int value = 100;
        int increment = time*10;
        while(value >= 0){
            set_row_state(row, value0;
            value-=10;
            delay(increment);
        }
    }
    ;

};

#endif //LEDSIGN_LED_STRIP_H
