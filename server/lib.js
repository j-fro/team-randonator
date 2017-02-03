function assigner(names, size, iterations) {
    let people = names.map(name => {
        return {name: name, paired: []};
    });
    let result = iterate([], people, size, iterations);
    return result.map(iteration => {
        return iteration.map(group => {
            return group.map(person => {
                console.log('Person:', person.name);
                return person.name;
            });
        });
    });
}

function iterate(result, people, size, iterations) {
    console.log('Iterations:', iterations);
    console.log('Number of weeks made:', result.length);
    console.log('Groups:', result);
    let numberOfGroups = people.length / size;
    let iterationGroups = [];
    let unAssigned = people.slice();
    for (let i = 0; i < numberOfGroups; i++) {
        let group = [];
        for (let j = 0; j < size; j++) {
            if (unAssigned.length < 1) {
                break;
            }
            let candidate = unAssigned[randIndex(unAssigned.length)];
            console.log('Candidate:', candidate);
            console.log('Week:', iterationGroups);
            console.log('unAssigned:', unAssigned);
            let previouslyPaired = false;
            console.log('Group:', group);
            group.forEach(member => {
                console.log('Member:', member);
                if (
                    member.paired.indexOf(candidate.name) > 0 ||
                        candidate.paired.indexOf(member.name) > 0
                ) {
                    previouslyPaired = true;
                }
            });
            console.log('Candidate, group:', candidate, group);
            if (!previouslyPaired) {
                group.forEach(member => {
                    member.paired.push(candidate.name);
                    candidate.paired.push(member.name);
                });
                group.push(candidate);
                unAssigned.splice(unAssigned.indexOf(candidate), 1);
            }
        }
        iterationGroups.push(group);
        console.log('Week:', iterationGroups);
    }
    result.push(iterationGroups);
    console.log('People after the week:', people);
    if (iterations > 1) {
        return iterate(result, people, size, iterations - 1);
    } else {
        return result;
    }
}

function randIndex(max) {
    return Math.floor(Math.random() * max);
}

// console.log(
//     assigner(
//         [
//             'Sherrie',
//             'Karla',
//             'John',
//             'Callie',
//             'Elliot',
//             'Deforis',
//             'Joey',
//             'Jimmy',
//             'Amanda',
//             'Alex',
//             'Tony',
//             'Andy',
//             'Jacob',
//             'Jaynie'
//         ],
//         4,
//         6
//     )
// );
module.exports = assigner;
