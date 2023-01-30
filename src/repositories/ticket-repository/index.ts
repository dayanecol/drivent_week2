import { prisma } from "@/config"; 

async function findManyTicketTypes() {
    return prisma.ticketType.findMany();
}

const ticketRepository = {
    findManyTicketTypes
};

export default ticketRepository;
