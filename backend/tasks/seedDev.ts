import prisma from './../src/prisma'; // Adjust this import based on your project structure
import { program } from 'commander';
import { faker } from '@faker-js/faker';
import { Prisma } from '../src/generated/prisma-client-js';

program
  .requiredOption('-c, --count <count>', 'Number of activities to create')
  .parse(process.argv);

const options = program.opts();

async function seedData() {
  const activities: Prisma.ActivityCreateManyInput[] = [];

  const score = Math.random() < 0.5 ? 0.5 : 1.0;

  for (let i = 0; i < +options.count; i++) {
    activities.push({
      title: faker.commerce.product(),
      description: faker.lorem.sentence(),
      images: [faker.image.url()],
      score: score
    });
  }

  try {
    await prisma.activity.createMany({
      data: activities
    });
    console.log('Seed data success');
  } catch (error) {
    console.error('Error creating activities:', error);
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client disconnects after execution
  }
}

seedData();
