#include "dbm.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>


static size_t db_type_size(DBType type) {
	switch(type) {
		case DB_FLOAT:
			return 4;
		case DB_INTEGER:
			return 4;
		case DB_TEXT:
			return 8;
		default: return 0;
	}
}

static const char *db_type_name(DBType type) {
	switch(type) {
		case DB_FLOAT:
			return "FLOAT";
		case DB_INTEGER:
			return "INTEGER";
		case DB_TEXT:
			return "TEXT";
		default: return "UNKNOWN";
	}
}

void db_layout_create(DBLayout *layout) {
	layout->root = NULL;
	layout->total_size = 0;
}

void db_layout_destroy(DBLayout *layout) {
	DBLayoutNode *current_node = layout->root;
	while(current_node != NULL) {
		DBLayoutNode *node = current_node;
		current_node = current_node->next;

		free(node->name);
		free(node);
	}
}

DBError db_layout_push(DBLayout *layout, const char *column_name, DBType type) {
	DBLayoutNode *node = (DBLayoutNode*)malloc( sizeof(DBLayoutNode) );
	node->type = type;
	node->name = (char*)malloc( (strlen(column_name)+1)*sizeof(char) );

	db_layout_remove(layout, column_name);

	if( node->name == NULL ) {
		return DB_BAD_ALLOC;
	}
	strcpy(node->name, column_name);

	node->next = layout->root;
	layout->root = node;
	layout->total_size += db_type_size(type);
	return DB_OK;
}

void db_layout_remove(DBLayout *layout, const char *column_name) {
	DBLayoutNode *current_node = layout->root;
	DBLayoutNode *previous_node = NULL;
	while( current_node != NULL ) {
		if( strcmp(column_name, current_node->name) == 0) {
			// suppression du noeud
			if(previous_node != NULL) {
				previous_node->next = current_node->next;
			} else {
				layout->root = current_node->next;
			}

			DBLayoutNode *node = current_node;
			current_node = current_node->next;
			layout->total_size -= db_type_size(node->type);

			// liberation de la mémoire
			free(node->name);
			free(node);
		} else {
			previous_node = current_node;
			current_node = current_node->next;
		}
	}
}

void db_layout_print(DBLayout *layout) {
	DBLayoutNode *current_node = layout->root;
	printf("|");
	while( current_node != NULL ) {
		printf(" \"%s\": %s |", current_node->name, db_type_name(current_node->type));
		current_node = current_node->next;
	}
	printf("\n");
}

void db_table_create(DBTable *table, DBLayout *layout) {

}

void db_table_destroy(DBTable *table) {

}

DBError db_table_row_from_string(DBTableRow *row, const char *row_str) {
	return DB_OK;
}

DBError db_table_add(DBTable *table, DBTableRow *row) {
	return DB_OK;
}

DBError db_table_query(DBTable *table, DBCondition *condition, DBTable *out_table) {
	return DB_OK;
}

void db_table_print_json(DBTable *table) {

}