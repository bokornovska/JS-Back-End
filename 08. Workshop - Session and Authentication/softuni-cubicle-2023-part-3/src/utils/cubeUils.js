exports. generateDifficultyLevels = function(currentLevel) {

    const difficultyLevels = [
        {key:1, label: 'Very Easy', selected: false},
        {key:1, label: 'Easy', selected: false},
        {key:1, label: 'Medium(Standart 3x3', selected: false},
        {key:1, label: 'Intermediate', selected: false},
        {key:1, label: 'Expert', selected: false},
        {key:1, label: 'Hardcore', selected: false}

    ];

    const result = difficultyLevels.map(x => x.key === currentLevel ? {...x, selected:true } : x);

    return result;
}