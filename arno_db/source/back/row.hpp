#pragma once

#include <string>
#include <vector>
#include "defines.hpp"

namespace adb
{

struct RowValue
{
	DT type;

	union
	{
		int ival;
		float fval;
		bool bval;
		char *sval;
	};
};

RowValue ValInt(int ival);

RowValue ValFlaot(float fval);

RowValue ValText( const std::string &str );

RowValue ValBool( bool bval );

RowValue ValNil();

class Row
{
public:
	friend class Table;
	Row();
	Row( const std::vector<RowValue> &values );
	~Row();

	void set_values(const std::vector<RowValue> &values);

private:
	void destroy_current_values();
	std::vector<RowValue> m_values;
};

}