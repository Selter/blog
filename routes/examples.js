/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * examples for projects
 */

var projects = {
    bootstrap_table: {
        data: function(req, res) {
            var offset = +req.query.offset || 0,
                limit = +req.query.limit || 20,
                search = req.query.search,
                sort = req.query.sort,
                order = req.query.order || 'asc',

                i,
                max = offset + limit,
                rows = [],
                result = {
                    total: 800,
                    rows: []
                };

            for (i = 0; i < result.total; i++) {
                rows.push({
                    id: i,
                    name: 'test' + i,
                    price: '$' + i
                });
            }
            if (search) {
                rows = rows.filter(function(item) {
                    return item.name.indexOf(search) !== -1;
                });
            }
            if (['id', 'name', 'price'].indexOf(sort) !== -1) {
                rows = rows.sort(function(a, b) {
                    var c = a[name],
                        d = b[name];

                    if (sort === 'price') {
                        c = +c.substring(1);
                        d = +d.substring(1);
                    }
                    if (c < d) {
                        return order === 'asc' ? -1 : 1;
                    }
                    if (c > d) {
                        return order === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }

            if (max > rows.length) {
                max = rows.length;
            }

            result.total = rows.length;
            for (i = offset; i < max; i++) {
                result.rows.push(rows[i]);
            }
            res.json(result);
        }
    }
};

module.exports = function(req, res) {
    projects[req.params.project][req.params.func](req, res);
};
