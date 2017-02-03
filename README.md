#Team Randonator
A single route web server to assign team members to random groups with a focus on making sure people aren't paired together frequently.

##API
TR has one route: POST '/'
###Data Params:
```
{
    names: [
        [string]
    ], // The names of people to assign
    size: [integer], // The max size of each group
    iterations: [integer] // The number of times to assign groups (ex. number of weeks if groups change weekly)
}
```
###Success Response:
```
[ // An array of e.g. weeks
    [ // An array of groups
        [ // An array of names in the group
            [string] // Name of each person
        ]
    ]
]
