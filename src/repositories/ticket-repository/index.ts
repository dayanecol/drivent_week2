import { prisma } from "@/config"; 

async function findManyTicketTypes() {
    return prisma.ticketType.findMany();
}

async function findOneUserTicketByEnrrolmentId(enrollmentId:number){
    return prisma.ticket.findFirst({
        where:{
            enrollmentId:enrollmentId,
        },
        include:{
            TicketType:true,
        }
    })
}

const ticketRepository = {
    findManyTicketTypes,
    findOneUserTicketByEnrrolmentId,
};

export default ticketRepository;
