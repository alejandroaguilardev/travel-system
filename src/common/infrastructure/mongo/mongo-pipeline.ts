
export class MongoPipeline {

    static queryCountTotal(sortQuery: Record<string, 1 | -1>, start: number, size: number) {

        const sort = [];
        if (Object.keys(sortQuery).length > 0) {
            sort.push({ $sort: sortQuery });
        }

        return [{
            $facet: {
                count: [{ $count: "count" }],
                rows: [
                    ...sort,
                    { $skip: start },
                    { $limit: size },
                ],
            },
        },
        {
            $unwind: "$count",
        },
        {
            $project: {
                totalCount: "$count.count",
                rows: "$rows",
            },
        },]
    }

}
