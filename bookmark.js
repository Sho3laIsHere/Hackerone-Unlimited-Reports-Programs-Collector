javascript:(function() {
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
    });

    let csrf_token = document.querySelector('meta[name="csrf-token"]').content;

    let array = [];

    let check = false;

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
            check = false;
        }
    }, 1000);

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
                        most_recent_sla_snapshot {
        id
        first_response_time: average_time_to_first_program_response
        triage_time: average_time_to_report_triage
        bounty_time: average_time_to_bounty_awarded
        resolution_time: average_time_to_report_resolved
        __typename
    }
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
                } else if(data.data.team.type.includes("Disclosure")) {
                    data.data.team.type = "VDP 🌟";
                } else {
                    data.data.team.type = "Private Program 💸🌟"
                };
let response_time = Math.round(data.data.team.most_recent_sla_snapshot.first_response_time);
let response_duration = "Hours";
let triage_time = Math.round(data.data.team.most_recent_sla_snapshot.triage_time);
let triage_duration = "Hours";
let bounty_time = Math.round(data.data.team.most_recent_sla_snapshot.bounty_time);
let bounty_duration= "Hours";
let resolution_time = Math.round(data.data.team.most_recent_sla_snapshot.resolution_time);
let resolution_duration = "Hours";
if(data.data.team.most_recent_sla_snapshot.first_response_time >= 24){
    response_time = Math.round(data.data.team.most_recent_sla_snapshot.first_response_time / 24);
    if(response_time == 1){
    response_duration = "Day";
} else {
    response_duration = "Days";
    }
} 
if(data.data.team.most_recent_sla_snapshot.triage_time >= 24){
    triage_time = Math.round(data.data.team.most_recent_sla_snapshot.triage_time / 24);
    if(triage_time == 1){
    triage_duration = "Day";
} else {
    triage_duration = "Days";
    }
} 
if(data.data.team.most_recent_sla_snapshot.bounty_time >= 24){
    bounty_time = Math.round(data.data.team.most_recent_sla_snapshot.bounty_time / 24);
    if(bounty_time == 1){
    bounty_duration = "Day";
} else {
    bounty_duration = "Days";
    }
} 
if(data.data.team.most_recent_sla_snapshot.resolution_time >= 24){
    resolution_time = Math.round(data.data.team.most_recent_sla_snapshot.resolution_time / 24);
    if(resolution_time == 1){
    resolution_duration = "Day";
} else {
    resolution_duration = "Days";
    }
} 
if(data.data.team.most_recent_sla_snapshot.first_response_time >= 720 ){
    response_time = Math.round(response_time / 30);
    if(response_time == 1){
    response_duration = "Month";
} else {
    response_duration = "Months";
    }
} 
if(data.data.team.most_recent_sla_snapshot.triage_time >= 720){
    triage_time = Math.round(triage_time / 30);
    if(triage_time == 1){
    triage_duration = "Month";
} else {
    triage_duration = "Months";
    }
} 
if(data.data.team.most_recent_sla_snapshot.bounty_time >= 720 ){
    bounty_time = Math.round(bounty_time / 30);
    if(bounty_time == 1){
    bounty_duration = "Month";
} else {
    bounty_duration = "Months";
    }
} 
if(data.data.team.most_recent_sla_snapshot.resolution_time >= 720 ){
    resolution_time = Math.round(resolution_time / 30);
    if(resolution_time == 1){
    resolution_duration = "Month";
} else {
    resolution_duration = "Months";
    }
} 
                return `<a href="https://hackerone.com/${program.handle}?type=team" target="_blank">${program.handle}</a> | ${data.data.team.type} | ${response_time ?? "null"} ${response_duration} To First Response | ${triage_time ?? "null"} ${triage_duration} To Triage Time | ${bounty_time ?? "null"} ${bounty_duration} To Bounty Time | ${resolution_time ?? "null"} ${resolution_duration} To Resolution Time`;
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
                check = true;        
            });
    });
})();
