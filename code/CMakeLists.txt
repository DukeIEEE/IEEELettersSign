cmake_minimum_required(VERSION 3.7)
project(LEDSign)

set(CMAKE_CXX_STANDARD 11)

set(SOURCE_FILES led_strip.cpp led_strip.h Arduino.h)
add_library(LEDSign ${SOURCE_FILES})