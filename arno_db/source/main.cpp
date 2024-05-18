#include <iostream>
#include <string>
#include <vector>
#include "adb.hpp"

void print_row_value( const adb::RowValue &value)
{
	switch(value.type)
	{
		case adb::DT::BOOL:
			std::cout << value.bval ? "true": "false";
			break;
		case adb::DT::INT:
			std::cout << value.ival;
			break;
		case adb::DT::FLOAT:
			std::cout << value.fval;
			break;
		case adb::DT::TEXT:
			std::cout << value.sval;
			break;
		case adb::DT::NIL:
			std::cout << "null";
			break;
		default:
			throw std::runtime_error("erreure: type DT inconnu");
	}
}

void print_condition( const adb::Condition &cond )
{
	switch( cond->type )
	{
	case adb::ConditionType::AND:
		std::cout << "(";
		print_condition(cond->binary_op.arg1);
		std::cout << ") AND (";
		print_condition(cond->binary_op.arg2);
		std::cout << ")";
		break;
	case adb::ConditionType::OR:
		std::cout << "(";
		print_condition(cond->binary_op.arg1);
		std::cout << ") OR (";
		print_condition(cond->binary_op.arg2);
		std::cout << ")";
		break;
	case adb::ConditionType::NOT:
		std::cout << "NOT(";
		print_condition(cond->binary_op.arg1);
		std::cout << ")";
		break;
	case adb::ConditionType::EQ:
		std::cout << "\"" << cond->value_op.field_name << "\" = ";
		print_condition(cond->value_op.arg);
		break;
	case adb::ConditionType::LE:
		std::cout << "\"" << cond->value_op.field_name << "\" <= ";
		print_condition(cond->value_op.arg);
		break;
	case adb::ConditionType::L:
		std::cout << "\"" << cond->value_op.field_name << "\" < ";
		print_condition(cond->value_op.arg);
		break;
	case adb::ConditionType::GE:
		std::cout << "\"" << cond->value_op.field_name << "\" >= ";
		print_condition(cond->value_op.arg);
		break;
	case adb::ConditionType::G:
		std::cout << "\"" << cond->value_op.field_name << "\" > ";
		print_condition(cond->value_op.arg);
		break;
	case adb::ConditionType::DATA:
		print_row_value(cond->value);
		break;
	default: break;
	}
}

int main()
{
	adb::Condition cond = adb::CondOR(
		adb::CondAND(
			adb::CondGE("id", adb::CondINT(4)),
			adb::CondL("id", adb::CondINT(7))
		),
		adb::CondEQ("username", adb::CondTEXT("arnaud"))
	);

	print_condition(cond);

	std::vector<std::string> names {
		"arnaud", "louis", "théo", "léonce", "imrane", "maël", "pierre", "paul", "jacques"
	};

	// adb::DB db;
	// db.addTable("users", {
	// 	adb::Field("id", adb::DT::INT),
	// 	adb::Field("username", adb::DT::TEXT),
	// 	adb::Field("passwordHAsh", adb::DT::TEXT)}
	// );

	adb::Table table {"name", {
		adb::Field("id", adb::DT::INT),
		adb::Field("username", adb::DT::TEXT),
		adb::Field("passwordHAsh", adb::DT::TEXT)}
	};

	int current_id = 0;
	for(const auto &name: names)
	{
		adb::Row row_values ({adb::ValInt(current_id++), adb::ValText(name), adb::ValText("ajfeuoize")});
		//db["users"].insert(row_values);
		table.insert(row_values);
	}

	std::cout << table.get(cond).to_json(true) << "\n";

	return 0;
}