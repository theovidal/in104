#pragma once

#include "defines.hpp"
#include "row.hpp"

#include <memory>
#include <string>

namespace adb 
{

enum class ConditionType
{
	AND, OR, NOT, EQ, GE, G, L, LE, DATA
};

struct ConditionData
{
	ConditionData();
	~ConditionData();

	// Condition récursives
	ConditionType type;

	union
	{
		struct {
			std::shared_ptr<ConditionData> arg1;
			std::shared_ptr<ConditionData> arg2;
		} binary_op;

		struct {
			char *field_name;
			std::shared_ptr<ConditionData> arg;
		} value_op;

		RowValue value;
	};
};

using Condition = std::shared_ptr<ConditionData>;

Condition CondOR(Condition left, Condition right);

Condition CondAND(Condition left, Condition right);

Condition CondNOT(Condition arg);

Condition CondEQ(const std::string &field, Condition arg);

Condition CondG(const std::string &field, Condition arg);

Condition CondGE(const std::string &field, Condition arg);

Condition CondL(const std::string &field, Condition arg);

Condition CondLE(const std::string &field, Condition arg);

Condition CondINT( int val );

Condition CondTEXT( const std::string &str );

}
