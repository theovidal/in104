#pragma once

#include "back/byte_stream.hpp"
#include "defines.hpp"
#include <string>
#include <vector>
#include <list>

namespace adb
{

struct Field
{
	Field(const std::string &name, DT type):
		field_name(name), type(type) {}

	std::string field_name;
	DT type;
};

class Table
{
public:
	Table( const std::string &name, const std::vector<Field> &layout );

	void insert( ByteStream &row );
	void remove();
	void update();
	void get();

private:
	std::list<ByteStream> m_rows;
};

}