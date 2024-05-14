#pragma once

#include <cstdint>

namespace adb
{

enum class DT
{
	NIL,
	INT,
	TEXT,
	FLOAT,
	BOOL
};

std::string to_string( DT type )
{
	switch( type )
	{
		case DT::NIL:
			return "null";
		case DT::FLOAT:
			return "real";
		case DT::INT:
			return "integer";
		case DT::TEXT:
			return "text";
		case DT::BOOL:
			return "bool";
		default:
			return "unknown";
	}
}

}