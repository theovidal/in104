#include "condition.hpp"
#include <cstring>

namespace adb
{

ConditionData::ConditionData()
{

}

ConditionData::~ConditionData()
{
	switch( type )
	{
	
	}
}

Condition CondAND(Condition left, Condition right)
{
	Condition cond( new ConditionData() );
	cond->binary_op.arg1 = left;
	cond->binary_op.arg2 = right;
	cond->type = ConditionType::AND;
	return cond;
}


Condition CondOR(Condition left, Condition right)
{
	Condition cond( new ConditionData() );
	cond->binary_op.arg1 = left;
	cond->binary_op.arg2 = right;
	cond->type = ConditionType::OR;
	return cond;
}

Condition CondNOT(Condition arg)
{
	Condition cond( new ConditionData() );
	cond->binary_op.arg1 = arg;
	cond->type = ConditionType::NOT;
	return cond;
}

Condition CondEQ(const std::string &field, Condition value)
{
	Condition cond( new ConditionData() );
	cond->type = ConditionType::EQ;
	cond->value_op.field_name = new char[1+field.size()];
	strcpy(cond->value_op.field_name, field.c_str());
	cond->value_op.arg = value;
	return cond;
}

Condition CondG(const std::string &field, Condition value)
{
	Condition cond( new ConditionData() );
	cond->type = ConditionType::G;
	cond->value_op.field_name = new char[1+field.size()];
	strcpy(cond->value_op.field_name, field.c_str());
	cond->value_op.arg = value;
	return cond;
}

Condition CondGE(const std::string &field, Condition value)
{
	Condition cond( new ConditionData() );
	cond->type = ConditionType::GE;
	cond->value_op.field_name = new char[1+field.size()];
	strcpy(cond->value_op.field_name, field.c_str());
	cond->value_op.arg = value;
	return cond;
}

Condition CondL(const std::string &field, Condition value)
{
	Condition cond( new ConditionData() );
	cond->type = ConditionType::L;
	cond->value_op.field_name = new char[1+field.size()];
	strcpy(cond->value_op.field_name, field.c_str());
	cond->value_op.arg = value;
	return cond;
}

Condition CondLE(const std::string &field, Condition value)
{
	Condition cond( new ConditionData() );
	cond->type = ConditionType::LE;
	cond->value_op.field_name = new char[1+field.size()];
	strcpy(cond->value_op.field_name, field.c_str());
	cond->value_op.arg = value;
	return cond;
}

Condition CondINT( int val )
{
	Condition cond( new ConditionData() );
	cond->type = ConditionType::DATA;
	cond->value = ValInt(val);
	return cond;
}

Condition CondTEXT( const std::string &str )
{
	Condition cond( new ConditionData() );
	cond->type = ConditionType::DATA;
	cond->value = ValText(str);
	return cond;
}

}