const placeholderMembers = [
  {
    memberId: 1,
    name: "Ratul",
    age: 24,
    address: "Dhaka Bangladesh",
    phone: "01815555105",
    membershipPlan: "Basic Plan",
    gender: "MALE",
    startDate: new Date(),
    endDate: new Date(),
    revenue: 1500,
  },
];

const names = [
  "Rahim",
  "Karim",
  "Jahanara",
  "Amina",
  "Nur",
  "Rahima",
  "Abdul",
  "Fatema",
  "Mahmud",
  "Anika",
  "Kamal",
  "Jamal",
  "Nazmul",
  "Salma",
  "Sumon",
  "Shamim",
  "Sakib",
  "Farhana",
  "Sohel",
  "Shahin",
  "Rina",
  "Sufia",
  "Shanto",
  "Sadia",
  "Sabbir",
  "Shahadat",
  "Raisa",
  "Rashed",
  "Mithila",
  "Monir",
  "Afsana",
  "Rubel",
  "Sohana",
  "Nasir",
  "Rina",
  "Sajal",
  "Sakina",
  "Tareq",
  "Sadia",
  "Shanto",
  "Shathi",
  "Samiha",
  "Rakib",
  "Shabnam",
  "Shawon",
  "Sultana",
  "Shahana",
  "Shakil",
  "Nazia",
  "Saifullah",
];

const generateRandomImages = () => {
  const randomIndex = Math.floor(Math.random() * 12) + 1;
  const image = `/photos/${randomIndex}.jpg`;
  return image;
};

const generateRandomName = () => {
  const firstNameIndex = Math.floor(Math.random() * names.length);
  const lastNameIndex = Math.floor(Math.random() * names.length);
  const firstName = names[firstNameIndex];
  const lastName = names[lastNameIndex];
  return `${firstName} ${lastName}`;
};

const generatePhoneNumber = () => {
  const prefix = "018";
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
  return prefix + randomNumber;
};

const generateRandomDate = () => {
  const startDate = new Date();
  const randomOffset = Math.floor(Math.random() * 101) - 50; // Random number between -50 and 50
  startDate.setDate(startDate.getDate() + randomOffset);
  return startDate;
};

const generateRandomCreatedAt = () => {
  const currentDate = new Date();
  const randomOffset = Math.floor(Math.random() * 61) - 30; // Random number between -30 and 30
  currentDate.setDate(currentDate.getDate() + randomOffset);
  return currentDate;
};

const generateEndDate = (startDate, membershipPlan) => {
  const endDate = new Date(startDate);
  switch (membershipPlan) {
    case "Basic Plan":
      endDate.setMonth(startDate.getMonth() + 1);
      break;
    case "Standard Plan":
      endDate.setMonth(startDate.getMonth() + 6);
      break;
    case "Premium Plan":
      endDate.setFullYear(startDate.getFullYear() + 1);
      break;
    default:
      endDate.setMonth(startDate.getMonth() + 1);
  }
  return endDate;
};

const generateRevenue = (membershipPlan) => {
  switch (membershipPlan) {
    case "Basic Plan":
      return 1500;
    case "Standard Plan":
      return 5500;
    case "Premium Plan":
      return 10500;
    default:
      return 1500;
  }
};

for (let i = 2; i <= 151; i++) {
  const newMember = {
    memberId: i,
    name: generateRandomName(),
    age: Math.floor(Math.random() * 50) + 18,
    address: "Dhaka Bangladesh",
    phone: generatePhoneNumber(),
    membershipPlan: ["Basic Plan", "Standard Plan", "Premium Plan"][
      Math.floor(Math.random() * 3)
    ],
    image: generateRandomImages(),
    gender: ["MALE", "FEMALE"][Math.floor(Math.random() * 2)],
    startDate: generateRandomDate(),
    createdAt: generateRandomCreatedAt(),
    revenue: 0,
  };
  newMember.endDate = generateEndDate(
    newMember.startDate,
    newMember.membershipPlan,
  );
  newMember.revenue = generateRevenue(newMember.membershipPlan);
  placeholderMembers.push(newMember);
}

module.exports = {
  placeholderMembers,
};
