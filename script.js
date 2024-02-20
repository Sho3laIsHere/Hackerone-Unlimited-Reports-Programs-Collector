const query = JSON.stringify({
    operationName: "PolicySearchStructuredScopesQuery",
    variables: {
        "query": {},
        "sort": [{
            "field": "launched_at",
            "direction": "DESC"
        }],
        "product_area": "opportunity_discovery",
        "filter": {
            "bool": {
                "filter": [{
                    "bool": {
                        "must_not": {
                            "term": {
                                "team_type": "Engagements::Assessment"
                            }
                        }
                    }
                }]
            }
        },
        "product_feature": "search",
        "size": 100,
        "from4": 300,
        "from": 0,
        "from2": 100,
        "from3": 200
    },
    query: `
query DiscoveryQuery($query: OpportunitiesQuery!, $filter: QueryInput!, $from: Int, $from2: Int, $from3: Int, $from4: Int, $size: Int, $sort: [SortInput!], $post_filters: OpportunitiesFilterInput) {
    me {
        id
        ...OpportunityListMe
        __typename
    }
    first: opportunities_search(query: $query
    filter: $filter
    from: $from
    size: $size
    sort: $sort
    post_filters: $post_filters) {
        nodes {
            ... on OpportunityDocument {
                id
                handle
                __typename
            }
            ...OpportunityList
            __typename
        }
        total_count
        __typename
    }
    second: opportunities_search(query: $query
    filter: $filter
    from: $from2
    size: $size
    sort: $sort
    post_filters: $post_filters) {
        nodes {
            ... on OpportunityDocument {
                id
                handle
                __typename
            }
            ...OpportunityList
            __typename
        }
        total_count
        __typename
    }
    third: opportunities_search(query: $query
    filter: $filter
    from: $from3
    size: $size
    sort: $sort
    post_filters: $post_filters) {
        nodes {
            ... on OpportunityDocument {
                id
                handle
                __typename
            }
            ...OpportunityList
            __typename
        }
        total_count
        __typename
    }
    fourth: opportunities_search(query: $query
    filter: $filter
    from: $from4
    size: $size
    sort: $sort
    post_filters: $post_filters) {
        nodes {
            ... on OpportunityDocument {
                id
                handle
                __typename
            }
            ...OpportunityList
            __typename
        }
        total_count
        __typename
    }
}

fragment OpportunityListMe on User {
    id
    ...OpportunityCardMe
    __typename
}

fragment OpportunityCardMe on User {
    id
    ...BookmarkMe
    __typename
}

fragment BookmarkMe on User {
    id
    __typename
}

fragment OpportunityList on OpportunityDocument {
    id
    ...OpportunityCard
    __typename
}

fragment OpportunityCard on OpportunityDocument {
    id
    team_id
    name
    handle
}
    `,
})

let csrf_token = document.querySelector('meta[name="csrf-token"]').content

let array = []

let check = false


    setInterval(function(){
    if(check){
        const content = array.map(program => `${program}`).join('<br>');

        window.open().document.write(`<html>
<head><title>Hackerone Unlimited Reports Programs Collector | Made With Love By Sho3la ❤</title></head>
<body><bold>${content}</bold></body>
<style>:root {
    color-scheme: dark;
} a { color: #9da2ff; } a:link { 
  text-decoration: none; 
} 
body {
  font-family: Arial, sans-serif;
}
</style>
</html>`);
        check = false
    }
},1000)

fetch('https://hackerone.com/graphql', {
method: 'POST',
headers: {
    'Content-Type': 'application/json',
    'X-Csrf-Token': `${csrf_token}`
},
body: query
}).then(response => response.json()).then(data => {
async function fetchProgramData(program) {
    const query = `
        query ReportSubmissionPage($handle: String!) {
            me {
                remaining_reports(team_handle: $handle)
            }
            team(handle: $handle) {
                type
            }
        }`;

    const variables = {
        "handle": program.handle,
        "product_area": "other",
        "product_feature": "other"
    };

    const response = await fetch('https://hackerone.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Csrf-Token': `${csrf_token}`
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    const data = await response.json();
    if (data.data.me.remaining_reports == null) {
        if (data.data.team.type.includes("Bounty")) {
            data.data.team.type = "BBP 💸";
        } else {
            data.data.team.type = "VDP 🌟";
        }
        return `<a href="https://hackerone.com/${program.handle}?type=team">${program.handle}</a> | ${data.data.team.type}`;
    } else {
        return null;
    }
}

const fetchPromises = data.data.first.nodes.map(fetchProgramData)
    .concat(data.data.second.nodes.map(fetchProgramData))
    .concat(data.data.third.nodes.map(fetchProgramData))
    .concat(data.data.fourth.nodes.map(fetchProgramData));
Promise.all(fetchPromises)
    .then(results => {
        const validResults = results.filter(result => result !== null);
        array.push(...validResults);
check = true
        
    });



    })
