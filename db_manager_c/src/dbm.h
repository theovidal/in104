#pragma once

#include <stdint.h>

typedef enum DBQueryContrainType {
	DB_AND,
	DB_OR,
	DB_NOT,
	DB_EQ,
	DB_LT,
	DB_GT,
	DB_LTE,
	DB_GTE
} DBQueryContrainType;

typedef enum DBTypes {
	DB_INTEGER,
	DB_FLOAT,
	DB_TEXT
} DBTypes;

typedef enum DBQUeryResultType {
	DB_TABLE_COPY,
	DB_TABLE_INTERVAL,
	DB_LAZY
} DBQUeryResultType;

typedef struct DBQueryConstrain {
	DBQueryContrainType type;
	union {
		struct { 
			DBQueryConstrain *first;
			DBQueryConstrain *second;
		} binary;

		struct {
			const char *column_name;
			union {
				float real_number;
				int integer;
				char *text;
			} comp_data;
		} op;
	} data;
} DBQueryConstrain;

typedef struct DBColumnLayout {
	uint32_t data_count;
	DBTypes *types;
	const char **names;
} DBColumnLayout;

typedef struct DBColumn {
	const char *column_name;
	DBColumnLayout layout;
	void *column_data;
	uint64_t column_data_size;
} DBColumn;

typedef struct DBTable {
	const char *table_name;
	DBColumn *columns;
	uint32_t column_count;
} DBTable;

typedef struct DBQueryResult {
	DBQueryContrainType type;
	// ...
} DBQueryResult;

int db_table_load(const char *filepath, DBTable *table);
void db_table_free(DBTable *table);
int db_query(DBQueryConstrain *constrains, DBTable *table, DBTable *out_result);
int db_insert(DBTable *table, void *raw_data, uint32_t data_size );
int db_save(DBTable *table, const char *filepath);