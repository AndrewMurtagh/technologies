cmake_minimum_required(VERSION 3.10)

project(protobuf)

find_package(Protobuf REQUIRED)

set(SOURCE_DIR ${CMAKE_CURRENT_SOURCE_DIR}/src)

protobuf_generate_cpp(PROTO_SRCS PROTO_HDRS ${SOURCE_DIR}/addressbook.proto)

add_executable(main ${SOURCE_DIR}/main.cpp ${PROTO_SRCS} ${PROTO_HDRS})
target_include_directories(main PRIVATE ${CMAKE_CURRENT_BINARY_DIR})
target_link_libraries(main PRIVATE protobuf::libprotobuf)

add_executable(reader ${SOURCE_DIR}/read.cpp ${PROTO_SRCS} ${PROTO_HDRS})
target_include_directories(reader PRIVATE ${CMAKE_CURRENT_BINARY_DIR})
target_link_libraries(reader PRIVATE protobuf::libprotobuf)