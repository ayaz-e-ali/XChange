const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addData() {
    await prisma.user.deleteMany();
    await prisma.currency.deleteMany();

    //users
    const users = await prisma.user.createMany({
        data: [
            {
                userName: "Admin",
                password: "$2b$10$O/tjEgoSF3Tr9NSOeCjqsearxtv7GMWeROTmgYbLsHTCzoQyFXsEC",
                isAdmin: true,
            }
        ]
    });

    //currencies
    const currencies = await prisma.currency.createMany({
        data: [
            {
                name: "Syrian Pound",
                code: "L.S"
            },
            {
                name: "US Dollar",
                code: "USD"
            },
            {
                name: "Euro",
                code: "EUR"
            }
        ]
    });

    // App 
    const app = await prisma.app.create({
        data: {
            marketName: "شركة صرافة",
            version: "1.0.0 Beta"
        }
    })
}

addData()
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