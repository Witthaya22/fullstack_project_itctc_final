import prisma from './../src/prisma';
import { program } from 'commander'
import { hash } from 'bcrypt';

program
  .requiredOption('-u, --username <username>')
  .requiredOption('-p, --password <password>')
  .parse()

const option = program.opts()


async function addAdmin() {
  await prisma.$connect()
  await prisma.admin.create({
    data: {
      username: option.username,
      password: await hash(option.password, 10)
    }
  })
  console.log(`Add admin success \n username: ${option.username}\n  and password ${option.password}`)
}

addAdmin()
