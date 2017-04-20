cmake_minimum_required(VERSION 3.7)
project(IEEELettersSign)

set(CMAKE_CXX_STANDARD 11)

set(SOURCE_FILES
        code/Arduino.h
        code/led_strip.cpp
        code/led_strip.h
        IEEELettersSign/code/Arduino.h
        IEEELettersSign/code/led_strip.cpp
        IEEELettersSign/code/led_strip.h)

add_executable(IEEELettersSign ${SOURCE_FILES})