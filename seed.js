const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addUsers() {
    await prisma.user.createMany({
        data: [
            {
                userName: "Admin",
                password: "$2b$10$fMjGRL.LanA2WAQHVtgRke3rhMqTRWpEj2pSiefjU9EhTCy0Vhs6.",
                isAdmin: true,
            },
            {
                userName: "User",
                password: "$2b$10$mAA7m7848QWAfh6OK/ghRuC7BBijhqlrwM4vBmdMK.6nJKbUaCnma",
                isAdmin: false,
            }
        ]
    });
}

addUsers()
    .then(() => {
        console.log('Seed data successfully added.');
    })
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
        process.exit(1);
    });;