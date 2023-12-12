export function get(obj, path, def) {
	var current = obj;

	for (var i = 0; i < path.length; i++) {
		if (!current[path[i]]) return def;

		current = current[path[i]];
	}

	return current;
}

export function set(data, path_list, value) {
    let current_data = data;

    // iterate through the path_list and set the value when at the end, creating new objects if needed, if any of the path_lists objects are another value set it to an object before continuing
    for (let i = 0; i < path_list.length; i++) {
        if (i == path_list.length - 1) {
            current_data[path_list[i]] = value;
        } else {
            if (typeof current_data[path_list[i]] == "undefined") {
                current_data[path_list[i]] = {};
            } else if (typeof current_data[path_list[i]] != "object") {
                current_data[path_list[i]] = {};
            }

            current_data = current_data[path_list[i]];
        }
    }
}