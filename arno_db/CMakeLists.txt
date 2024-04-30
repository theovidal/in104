cmake_minimum_required(VERSION 3.22)

project( arno_db )

file( GLOB_RECURSE SOURCE_FILES RELATIVE ${CMAKE_SOURCE_DIR} "source/*.cpp")

add_executable( arno_db ${SOURCE_FILES})