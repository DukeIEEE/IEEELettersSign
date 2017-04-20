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
    vector<vector<int[3]>> colors;


    led_strip::led_strip(int serial_pin){

        strip = Adafruit_NeoPixel(60, serial_pin, NEO_GRB + NEO_KHZ800);

        rows = vector();
        colors = vector();

    };

    void led_strip::add_row(int rowIndex, int *indices) {

       vector<int> row = vector(indices, indices + sizeof(indices) / sizeof(indices[0]));

       rows[rowIndex] = row;
    };

    void led_strip::set_row_brightness(int rowIndex, int state) {

        vector<int> row = rows[rowIndex];

    };

    void led_strip::update_row(int rowIndex, int *rgb, int brightness) {

        for(int i = 0; i < rows[rowIndex].size(); i++){
            int pixel = rows[rowIndex][i];
            int brightnessFactor = ((double)brightness)/100;
            strip.setPixelColor(pixel, brightnessFactor * rgb[0], brightnessFactor * rgb[1], brightnessFactor * rgb[2]);
        }
    }


