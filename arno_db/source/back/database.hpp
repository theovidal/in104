#pragma once

#include "table.hpp"
#include <map>

namespace adb
{

class DB
{
public:
	DB();

	void addTable( const std::string &name, const std::vector<Field> &layout );
	void dropTable( const std::string &name );

	Table &operator[](const std::string &name);
	
private:
	std::map< std::string, Table > m_tables;
};

}