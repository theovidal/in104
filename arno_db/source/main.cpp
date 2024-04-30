#include <iostream>
#include <string>
#include <vector>
#include "adb.hpp"

void print_condition( adb::Condition cond )
{
	switch( cond->type )
	{
	case adb::ConditionType::AND:
		std::cout << "(";
		print_condition(cond->arg1);
		std::cout << ") AND (";
		print_condition(cond->arg2);
		std::cout << ")";
		break;
	case adb::ConditionType::OR:
		std::cout << "(";
		print_condition(cond->arg1);
		std::cout << ") OR (";
		print_condition(cond->arg2);
		std::cout << ")";
		break;
	case adb::ConditionType::NOT:
		std::cout << "NOT(";
		print_condition(cond->arg1);
		std::cout << ")";
		break;
	case adb::ConditionType::EQ:
		std::cout << "\"" << cond->adb::field << "\" = ";
		print_condition(cond->arg1);
		break;
	case adb::ConditionType::LE:
		std::cout << "\"" << cond->field << "\" <= ";
		print_condition(cond->arg1);
		break;
	case adb::ConditionType::L:
		std::cout << "\"" << cond->field << "\" < ";
		print_condition(cond->arg1);
		break;
	case adb::ConditionType::GE:
		std::cout << "\"" << cond->field << "\" >= ";
		print_condition(cond->arg1);
		break;
	case adb::ConditionType::G:
		std::cout << "\"" << cond->field << "\" > ";
		print_condition(cond->arg1);
		break;
	case adb::ConditionType::DATA:
		switch(cond->value_type)
		{
		case( adb::DT::INT):
			std::cout << *(int*)cond->value;
			break;
		case( adb::DT::TEXT ):
			std::cout << "\"" << *(std::string*)cond->value << "\"";
			break;
		case( adb::DT::NIL ):
			std::cout << "NIL";
			break;
		default: break;
		}
		break;
	default: break;
	}
}

int main()
{
	adb::Condition cond = adb::CondOR(
		adb::CondGE("id", adb::CondINT(4)),
		adb::CondEQ("username", adb::CondTEXT("arnaud"))
	);

	std::vector<std::string> names {
		"arnaud", "louis", "théo", "léonce", "imrane", "maël", "pierre", "paul", "jacques"
	};

	adb::DB db;
	db.addTable("users", {
		adb::Field("id", adb::DT::INT),
		adb::Field("username", adb::DT::TEXT),
		adb::Field("passwordHAsh", adb::DT::TEXT)}
	);

	int current_id = 0;
	for(const auto &name: names)
	{
		adb::ByteStream user_data;
		user_data << current_id++ << name << "abdc1234";
		db["user"].insert(user_data);
	}

	std::cout << db["users"].get(cond).JSON();

	return 0;
}