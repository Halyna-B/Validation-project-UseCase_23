import { faker } from '@faker-js/faker';

const creditRole = ['Director', 'Producer', 'Screenwriter', 'Actor',
    'Actress', 'Cinematographer', 'Film Editor', 'Production Designer',
    'Costume Designer', 'Music Composer' ];

const age_certification = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'U', 'U/A',
    'A', 'S', 'AL', '6', '9', '12', '12A', '15', '18', '18R', 'R18', 'R21',
    'M', 'MA15+', 'R16', 'R18+', 'X18', 'T', 'E', 'E10+', 'EC', 'C', 'CA',
    'GP', 'M/PG', 'TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA'];

const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery',
    'Romance', 'Sci-Fi', 'Thriller', 'Animation', 'Family', 'Documentary'];

const generateNumberID = (() => {
    let id = 1;
    return () => id++;
})();

const generateMovieName = () => {
    const prefix = faker.lorem.word();
    const suffix = faker.lorem.word();

    return `${prefix} ${suffix} Story`;
};

const UNIQUE_TITLE_ID_STORE = new Set();

const generateTITLE_ID = () => {
    let titleId;

    do {
        titleId = faker.number.int({max: 3577});
    } while (UNIQUE_TITLE_ID_STORE.has(titleId));

    UNIQUE_TITLE_ID_STORE.add(titleId);

    return titleId;
};

const createTestTitle = ()  => {
    return {
        id: generateTITLE_ID(),
        title: generateMovieName(),
        description: faker.lorem.sentences(),
        release_year: faker.date.past().getFullYear(),
        age_certification: faker.helpers.arrayElement(age_certification),
        runtime: faker.number.int({ min: 60, max: 180 }),
        genres: faker.helpers.arrayElement(genres),
        production_country: faker.location.countryCode(),
        seasons: faker.datatype.boolean() ? faker.number.int({ min: 1, max: 10 }) : null,
    };
};

export const createTitlesTestDataList = () => {
    return faker.helpers.multiple(createTestTitle, {
        count: 150,
    });
};

export const createCreditsTestDataList = (testTitleListData) => {
    const testCreditsListData = [];

    testTitleListData.forEach(title => {
        Array.from({ length: 1 }).forEach(() => {
            testCreditsListData.push({
                id: generateNumberID(),
                title_id: title.id,
                real_name: faker.person.firstName(),
                character_name: faker.person.middleName(),
                role: faker.helpers.arrayElement(creditRole)
            });
        });
    });

    return testCreditsListData;
};


