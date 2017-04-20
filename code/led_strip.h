/*
 * Dhruv K Patel
 */

#ifndef LEDSIGN_LED_STRIP_H
#define LEDSIGN_LED_STRIP_H

#include <iostream>
#include "Arduino.h"
#include "Adafruit_NeoPixel-master/Adafruit_NeoPixel.h"


using namespace std;

class led_strip {

public:

    led_strip(int serial_pin);

    void add_row(int row, int *indices);

    void set_row_brightness(int row, int state);

    void set_row_color(int row, int r, int g, int b);

    void refresh_pixels();

    void IEEEdemo(int endrow, int rowsAlwaysOn, float time){
        time = time/(2 * endrow);
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
    };

    void increase(int row, float time){
        int value = 0;
        float increment = time*10;
        while(value <= 100){
            set_row_brightness(row, value);
            value+=10;
            delay(increment);
        }
    };

    void decrease(int row, float time){
        int value = 100;
        float increment = time*10;
        while(value >= 0){
            set_row_brightness(row, value);
            value-=10;
            delay(increment);
        }
    };

private:

    void update_row(int rowIndex, int rgb[3], int brightness);




};

#endif //LEDSIGN_LED_STRIP_H
