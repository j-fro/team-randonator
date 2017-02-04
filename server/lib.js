function assigner(names, size, iterations) {
    let people = names.map(name => {
        return {name: name, paired: [], unPaired: names.slice()};
    });
    let result = iterate([], people, size, iterations);
    // return result.map(iteration => {
    //     return iteration.map(group => {
    //         return group.map(person => {
    //             // console.log('Person:', person.name);
    //             return person.name;
    //         });
    //     });
    // });
    return result;
}

function iterate(result, people, size, iterations) {
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
            // console.log('Candidate:', candidate);
            // console.log('Week:', iterationGroups);
            // console.log('unAssigned:', unAssigned);
            let previouslyPaired = false;
            // console.log('Group:', group);
            group.forEach(member => {
                // console.log('Member:', member);
                if (
                    member.unPaired.indexOf(candidate.name) < 0 &&
                        candidate.unPaired.indexOf(member.name) < 0
                ) {
                    previouslyPaired = true;
                }
            });
            // console.log('Candidate, group:', candidate, group);
            if (!previouslyPaired) {
                group = addPerson(candidate, group);
                unAssigned.splice(unAssigned.indexOf(candidate), 1);
            }
        }
        iterationGroups.push(group);
        // console.log('Week:', iterationGroups);
    }
    if (unAssigned.length > 0) {
        // console.log('People left:', unAssigned);
        unAssigned.forEach(person => {
            // console.log('Trying to assign', person.name);
            for (let i = 0; i < numberOfGroups; i++) {
                if (iterationGroups[i].length < size) {
                    iterationGroups[i] = addPerson(person, iterationGroups[i]);
                    break;
                }
            }
        });
    }
    result.push(iterationGroups);
    if (iterations > 1) {
        return iterate(result, people, size, iterations - 1);
    } else {
        return result;
    }
}

function addPerson(person, group) {
    // console.log('Hitting add person', person, group);
    group.forEach(member => {
        console.log(
            'Removing',
            person.name,
            'from',
            member.name,
            'who still has',
            member.unPaired
        );
        console.log(
            'Removing',
            member.name,
            'from',
            person.name,
            'who still has',
            person.unPaired
        );
        member.unPaired.splice(member.unPaired.indexOf(person.name), 1);
        person.unPaired.splice(person.unPaired.indexOf(member.name), 1);
        if (person.paired.indexOf(member.name) < 0) {
            person.paired.push(member.name);
        }
        if (member.paired.indexOf(person.name) < 0) {
            member.paired.push(person.name);
        }
    });
    group.push(person);
    return group;
}

function randIndex(max) {
    return Math.floor(Math.random() * max);
}

// // console.log(
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
