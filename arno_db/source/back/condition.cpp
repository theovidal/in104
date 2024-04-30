#include "condition.hpp"

namespace adb
{

ConditionData::~ConditionData()
{
	switch( value_type )
	{
	case DT::INT:
		delete (int*)value;
		break;
	case DT::TEXT:
		delete (std::string*)value;
		break;
	default:
		break;
	}
}

Condition CondAND(Condition left, Condition right)
{
	Condition cond( new ConditionData() );
	cond->arg1 = left;
	cond->arg2 = right;
	cond->type = ConditionType::AND;
	return cond;
}


Condition CondOR(Condition left, Condition right)
{
	Condition cond( new ConditionData() );
	cond->arg1 = left;
	cond->arg2 = right;
	cond->type = ConditionType::OR;
	return cond;
}

Condition CondNOT(Condition arg)
{
	Condition cond( new ConditionData() );
	cond->arg1 = arg;
	cond->type = ConditionType::NOT;
	return cond;
}

Condition CondEQ(const std::string &field, Condition value)
{
	Condition cond( new ConditionData() );
	cond->type = ConditionType::EQ;
	cond->field = field;
	cond->arg1 = value;
	return cond;
}

Condition CondG(const std::string &field, Condition value)
{
	Condition cond( new ConditionData() );
	cond->type = ConditionType::G;
	cond->field = field;
	cond->arg1 = value;
	return cond;
}

Condition CondGE(const std::string &field, Condition value)
{
	Condition cond( new ConditionData() );
	cond->type = ConditionType::GE;
	cond->field = field;
	cond->arg1 = value;
	return cond;
}

Condition CondL(const std::string &field, Condition value)
{
	Condition cond( new ConditionData() );
	cond->type = ConditionType::L;
	cond->field = field;
	cond->arg1 = value;
	return cond;
}

Condition CondLE(const std::string &field, Condition value)
{
	Condition cond( new ConditionData() );
	cond->type = ConditionType::LE;
	cond->field = field;
	cond->arg1 = value;
	return cond;
}

Condition CondINT( int val )
{
	Condition cond( new ConditionData() );
	cond->type = ConditionType::DATA;
	cond->value_type = DT::INT;
	cond->value = new int(val);
	return cond;
}

Condition CondTEXT( const std::string &str )
{
	Condition cond( new ConditionData() );
	cond->type = ConditionType::DATA;
	cond->value_type = DT::TEXT;
	cond->value = new std::string(str);
	return cond;
}

}