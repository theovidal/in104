#include "dbm.h"
#include <stdio.h>

int main(int argc, char **argv) {
	DBLayout layout;
	db_layout_create(&layout);

	DBError err = db_layout_push(&layout, "id", DB_INTEGER);
	err |= db_layout_push(&layout, "id", DB_INTEGER);
	err |= db_layout_push(&layout, "name", DB_TEXT);
	err |= db_layout_push(&layout, "height", DB_FLOAT);

	printf("%d\n", layout.total_size);

	if( err != DB_OK ) {
		return -1;
	}

	db_layout_print(&layout);

	db_layout_remove(&layout, "id");
	db_layout_remove(&layout, "id");

	printf("%d\n", layout.total_size);
	db_layout_print(&layout);

	db_layout_destroy(&layout);
	return 0;
}