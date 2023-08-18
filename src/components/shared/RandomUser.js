import * as faker from '@faker-js/faker';
import { get_random_status, getAge } from '../../modules/helper';

const createUser = () => {
  return {
    address: faker.faker.location.streetAddress() + faker.faker.phone.number(),
    age: getAge(faker.faker.date.birthdate()),
    createdAt: faker.faker.date.past(),
    email: faker.faker.internet.email(),
    firstName: faker.faker.person.firstName(),
    gender: faker.faker.person.sexType(),
    id: faker.faker.string.uuid(),
    lastName: faker.faker.person.lastName(),
    note: faker.faker.person.bio(),
    status: get_random_status(['active', 'inactive']),
    updatedAt: new Date().toJSON()
  };
};

const generateUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(createUser());
  }
  return users;
};

export const RandomUser = (count) => {
  return generateUsers(count);
};
