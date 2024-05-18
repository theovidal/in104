#pragma once

#include <string>
#include <cstdint>

namespace adb
{

/**
 * @brief Défintition les types de bases supporté par la BDD
 * 
 */
enum class DT
{
	NIL,
	INT,
	TEXT,
	FLOAT,
	BOOL
};

/**
 * @brief Renvoie les noms des types de base
 * 
 * @param type 
 * @return std::string le type sous forme de std::string
 */
inline std::string to_string( DT type )
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