#pragma once

#include <stdint.h>

typedef enum DBError {
	DB_OK, // aucune erreure
	DB_FILE_NOT_FOUND, // fichier non trouvé
	DB_PARSE_ERROR, // la base de donnée n'est pas sous le bon format
	DB_BAD_ALLOC, // allocation foireuse
} DBError;

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

typedef enum DBType {
	DB_INTEGER,
	DB_FLOAT,
	DB_TEXT
} DBType;

typedef struct DBCondition {
	DBQueryContrainType type;
	union {
		struct { 
			struct DBCondition *first;
			struct DBCondition *second;
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
} DBCondition;

typedef struct DBLayoutNode {
	struct DBLayoutNode *next;
	char *name;
	DBType type;
} DBLayoutNode;

typedef struct DBLayout {
	uint32_t total_size;
	DBLayoutNode *root;
} DBLayout;

typedef struct DBTableRow {
	char *data;
	struct DBTableRow *next;
} DBTableRow;

typedef struct DBTable {
	char *table_name;
	DBLayout layout;
	DBTableRow *root;
} DBTable;

void db_layout_create(DBLayout *layout);

void db_layout_destroy(DBLayout *layout);

DBError db_layout_push(DBLayout *layout, const char *column_name, DBType type);

void db_layout_remove(DBLayout *layout, const char *column_name);

void db_layout_print(DBLayout *layout);

void db_table_create(DBTable *table, DBLayout *layout);

void db_table_destroy(DBTable *table);

DBError db_table_row_from_string(DBTableRow *row, const char *row_str);

DBError db_table_add(DBTable *table, DBTableRow *row);

DBError db_table_query(DBTable *table, DBCondition *condition, DBTable *out_table);

void db_table_print_json(DBTable *table);