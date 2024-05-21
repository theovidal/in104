#include "table.hpp"
#include <cassert>
#include <iostream>
#include <cstring>
#include <sstream>

namespace adb
{

bool comp_le(const RowValue &left, const RowValue &right)
{
	switch(left.type)
	{
		case DT::FLOAT:
			return left.fval <= right.fval;
		case DT::INT:
			return left.ival <= right.ival;
		case DT::TEXT:
			return strcmp(left.sval, right.sval) <= 0;
		default:
			throw std::runtime_error("Opérateur (<=) non défini sur le type" + to_string(left.type));
			break;
	}
}

bool comp_l(const RowValue &left, const RowValue &right)
{
	switch(left.type)
	{
		case DT::FLOAT:
			return left.fval < right.fval;
		case DT::INT:
			return left.ival < right.ival;
		case DT::TEXT:
			return strcmp(left.sval, right.sval) == -1;
		default:
			throw std::runtime_error("Opérateur (<=) non défini sur le type" + to_string(left.type));
			break;
	}
}

bool comp_eq(const RowValue &left, const RowValue &right)
{
	switch(left.type)
	{
		case DT::FLOAT:
			return left.fval == right.fval;
		case DT::INT:
			return left.ival == right.ival;
		case DT::TEXT:
			return strcmp(left.sval, right.sval) == 0;
		case DT::NIL:
			// par définition, left et right doivent avoir le même type
			return true;
		case DT::BOOL:
			return left.bval == right.bval;
		default:
			throw std::runtime_error("Opérateur (<=) non défini sur le type" + to_string(left.type));
			break;
	}
}

bool Table::apply_condition(const Row &row, const Condition &cond)
{
	switch(cond->type)
	{
	case ConditionType::AND:
		return (apply_condition(row, cond->binary_op.arg1)) && (apply_condition(row, cond->binary_op.arg2));
		break;
	case ConditionType::OR:
		return (apply_condition(row, cond->binary_op.arg1)) || (apply_condition(row, cond->binary_op.arg2));
		break;
	case ConditionType::NOT:
		return !(apply_condition(row, cond->binary_op.arg1));
		break;
	case ConditionType::LE:
	case ConditionType::GE:
	case ConditionType::G:
	case ConditionType::EQ:
	case ConditionType::L:
		{
			// get the field name on which the condition applies
			const auto &name = cond->value_op.field_name;

			// get the informations about this field from the layout
			auto maybe_field = get_field(name);
			assert( (((bool)maybe_field) != false) );
			auto &[field, index] = maybe_field.value();

			// get the value of the field in "row"
			RowValue row_value = row.m_values[index];

			if (cond->value_op.arg->type != ConditionType::DATA)
			{
				throw std::runtime_error("Condition mal construite: l'enfant d'une condition binaire de type (<=, >=, ..) doit être une valeur de même type que celle nommé par field_name");
			}

			switch(cond->type)
			{
				case ConditionType::LE:
					return comp_le(row_value, cond->value_op.arg->value);
				case ConditionType::GE:
					return !comp_l(row_value, cond->value_op.arg->value);
				case ConditionType::G:
					return !comp_le(row_value, cond->value_op.arg->value);
				case ConditionType::EQ:
					return comp_eq(row_value, cond->value_op.arg->value);
				case ConditionType::L:
					return comp_l(row_value, cond->value_op.arg->value);
				default:
					throw std::runtime_error("WTF??");
			}
		}
		break;
	case ConditionType::DATA:
		throw std::runtime_error("invalid condition: data may only be the child of another condition");
	default:
		throw std::runtime_error("enumération invalide");
		break;
	}
}

bool Table::check_row_layout(const Row &row)
{
	if( row.m_values.size() != m_layout.size() )
		return false;

	for(size_t i = 0; i < m_layout.size(); ++i)
	{
		if( row.m_values[i].type !=	m_layout[i].type)
			return false;
	}

	return true;
}

std::optional<std::pair<Field, size_t>> Table::get_field(const std::string &field_name)
{

	for(size_t i = 0; i < m_layout.size(); ++i)
	{
		const Field &field = m_layout[i];
		if( field.field_name == field_name )
			return std::make_pair(field, i);
	}

	return {};
}

Table::Table( const std::string &name, const std::vector<Field> &layout ):
	m_name(name), m_layout(layout)
{
}

void Table::insert( const Row &row )
{
	if( !check_row_layout(row) )
	{
		std::cout << "Impossible d'insérer une donnée dans la table " << m_name << ", layout incompatible\n";
		return;
	}

	m_rows.push_back(row);
}

void Table::remove( const Condition &cond )
{

}

void Table::update( const Condition &cond, const Row &new_row )
{

}

Table Table::get( const Condition &cond )
{
	Table query_table {m_name+"_result", m_layout};

	for(const auto &row: m_rows)
	{
		if( apply_condition(row, cond) )
		{
			query_table.insert(row);
		}
	}

	return query_table;
}

void Table::row_to_json(std::stringstream &ss, const std::vector<Field>& layout, const Row &row, bool nice_format)
{

	ss << "{";

	if(nice_format)
	{
		ss << "\n";
	}

	auto it = row.m_values.begin();
	for(size_t i = 0; i < layout.size(); ++i)
	{
		ss << "  \"" << layout[i].field_name << "\": ";
		switch(it->type)
		{
			case DT::BOOL:
				ss << it->bval ? "true": "false";
				break;
			case DT::FLOAT:
				ss << it->fval;
				break;
			case DT::INT:
				ss << it->ival;
				break;
			case DT::NIL:
				ss << "null";
				break;
			case DT::TEXT:
				ss << "\"" << it->sval << "\"";
				break;
			default:
				assert(false);
				break;
		}

		if(i != layout.size() - 1)
		{
			ss << ",";
		}

		if(nice_format)
		{
			ss << "\n";
		}

		++it;
	}
	ss << "}";
}

std::string Table::to_json(bool nice_format)
{
	std::stringstream json_str;

	json_str << "[";

	for(auto it = m_rows.begin(); it != m_rows.end(); ++it)
	{
		row_to_json(json_str, m_layout, *it, nice_format);

		auto it_cpy = it;
		if( (++it_cpy) != m_rows.end())
		{
			json_str << ",";
		}
	}

	json_str << "]";

	return json_str.str();
}

}