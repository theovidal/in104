#include "row.hpp"

#include <cstring>

namespace adb
{

RowValue ValInt(int ival)
{
	RowValue row_value;
	row_value.type = DT::INT;
	row_value.ival = ival;
	return std::move(row_value);
}

RowValue ValFlaot(float fval)
{
	RowValue row_value;
	row_value.type = DT::FLOAT;
	row_value.ival = fval;
	return std::move(row_value);
}

RowValue ValText( const std::string &str )
{
	RowValue row_value;
	row_value.type = DT::TEXT;
	row_value.sval = new char[1+str.size()];
	strcpy(row_value.sval, str.c_str());
	return std::move(row_value);
}

RowValue ValBool( bool bval )
{
	RowValue row_value;
	row_value.type = DT::BOOL;
	row_value.ival = bval;
	return std::move(row_value);
}

RowValue ValNil()
{
	RowValue row_value;
	row_value.type = DT::NIL;
	return std::move(row_value);
}

Row::Row() {}

Row::Row(const std::vector<RowValue> &values)
{
	set_values(values);
}

Row::~Row()
{
	destroy_current_values();
}

void Row::set_values( const std::vector<RowValue> &values )
{
	if(values.size() != 0)
	{
		destroy_current_values();
	}

	m_values = values;
}

void Row::destroy_current_values()
{
	for(const RowValue &val: m_values)
	{
		if(val.type == DT::TEXT) {
			delete[] val.sval;
		}
	}

	m_values.clear();
}


}