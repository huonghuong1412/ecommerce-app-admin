// import faker from 'faker';
// import { sample } from 'lodash';
// utils
// import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [
  {
    id: 1,
    name: "User 1",
    avatarUrl: "",
    company: "",
    isVerified: true,
    status: "active",
    role: "Leader"
  },
  {
    id: 2,
    name: "User 1",
    avatarUrl: "",
    company: "",
    isVerified: true,
    status: "active",
    role: "Leader"
  },
  {
    id: 3,
    name: "User 1",
    avatarUrl: "",
    company: "",
    isVerified: true,
    status: "active",
    role: "Leader"
  },
]

// const users = [...Array(24)].map((_, index) => ({
//   id: faker.datatype.uuid(),
//   avatarUrl: mockImgAvatar(index + 1),
//   name: faker.name.findName(),
//   company: faker.company.companyName(),
//   isVerified: faker.datatype.boolean(),
//   status: sample(['active', 'banned']),
//   role: sample([
//     'Leader',
//     'Hr Manager',
//     'UI Designer',
//     'UX Designer',
//     'UI/UX Designer',
//     'Project Manager',
//     'Backend Developer',
//     'Full Stack Designer',
//     'Front End Developer',
//     'Full Stack Developer'
//   ])
// }));

export default users;
