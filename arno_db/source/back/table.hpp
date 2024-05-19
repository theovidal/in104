#pragma once

#include "back/row.hpp"
#include "defines.hpp"
#include "back/condition.hpp"

#include <string>
#include <vector>
#include <list>
#include <optional>
#include <utility>

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

	void insert( const Row &row );
	void remove( const Condition &cond );
	void update( const Condition &cond, const Row &new_row );
	Table get( const Condition &cond );

	std::string to_json();

	private:
	
	/**
	 * @brief Get the field object with a given name, as well as its index as a pair
	 * 
	 * @param field_name the name of the field
	 * @return std::optional<std::pair<Field, size_t>> 
	 */
	std::optional<std::pair<Field, size_t>> get_field(const std::string &field_name);

	bool apply_condition(const Row &row, const Condition &cond);
	
	bool check_row_layout(const Row &row);

	std::vector<Field> m_layout;
	std::list<Row> m_rows;
	std::string m_name;
};

}