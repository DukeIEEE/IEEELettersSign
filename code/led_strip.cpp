//
// Created by Dhruv K. Patel on 4/14/17.
//

#include "led_strip.h"
#include <Arduino.h>

#include <iostream>
#include <vector>
#include "Adafruit_NeoPixel-master/Adafruit_NeoPixel.h"

using namespace std;

    Adafruit_NeoPixel strip;

    vector<vector<int>> rows;
    vector<int[3]> colors;
    vector<int> brightnesses;


    led_strip::led_strip(int serial_pin){

        strip = Adafruit_NeoPixel(60, serial_pin, NEO_GRB + NEO_KHZ800);
        strip.begin();
        strip.show(); // Initialize all pixels to 'off'

        rows = vector();
        colors = vector();

    };

    void led_strip::add_row(int rowIndex, int *indices) {

       vector<int> row = vector(indices, indices + sizeof(indices) / sizeof(indices[0]));

       rows[rowIndex] = row;
    };

    void led_strip::set_row_brightness(int rowIndex, int state) {

        brightnesses[rowIndex] = state;
        update_row(rowIndex, colors[rowIndex], state);

    };

    void led_strip::set_row_color(int row, int r, int g, int b) {

        colors[row] = {r, g, b};
        update_row(row, colors[row], brightnesses[row]);

    }

    void led_strip::update_row(int rowIndex, int rgb[3], int brightness) {

        for(int i = 0; i < rows[rowIndex].size(); i++){
            int pixel = rows[rowIndex][i];
            int brightnessFactor = ((double)brightness)/100;
            strip.setPixelColor(pixel, brightnessFactor * rgb[0], brightnessFactor * rgb[1], brightnessFactor * rgb[2]);
        }
    }

    void led_strip::refresh_pixels() {
        strip.show();
    }


